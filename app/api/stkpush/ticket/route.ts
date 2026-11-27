import { NextResponse } from "next/server";
import https from "https";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function cleanEnv(value?: string): string {
  if (!value) return "";
  let cleaned = value.trim();
  if (/^MPESA_[A-Z_]+=/.test(cleaned)) {
    cleaned = cleaned.replace(/^MPESA_[A-Z_]+=/, "");
  }
  return cleaned.replace(/^["']|["']$/g, "").trim();
}

function safaricomRequest(
  urlString: string,
  options: {
    method: "GET" | "POST";
    headers: Record<string, string>;
    body?: string;
  }
): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const req = https.request(
      {
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        method: options.method,
        headers: options.headers,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode || 500, text: data });
        });
      }
    );

    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

function parseSafaricomJson(
  res: { status: number; text: string },
  step: string
) {
  if (!res.text) {
    throw new Error(
      `Safaricom ${step} returned an empty response (HTTP ${res.status})`
    );
  }
  try {
    return JSON.parse(res.text);
  } catch {
    throw new Error(
      `Safaricom ${step} returned non-JSON (HTTP ${res.status}): ${res.text.slice(0, 200)}`
    );
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    if (!rawBody) {
      return NextResponse.json(
        { success: false, error: "The frontend sent an empty request." },
        { status: 400 }
      );
    }

    const { phone, amount, ticketType, quantity, affiliateCode } =
      JSON.parse(rawBody);

    if (!phone || !amount || !ticketType) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number, amount, and ticket type are required.",
        },
        { status: 400 }
      );
    }

    let formattedPhone = String(phone).replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }

    const consumerKey = cleanEnv(process.env.MPESA_CONSUMER_KEY);
    const consumerSecret = cleanEnv(process.env.MPESA_CONSUMER_SECRET);
    const passkey = cleanEnv(process.env.MPESA_PASSKEY);
    const storeNumber = cleanEnv(
      process.env.MPESA_STORE_NUMBER || process.env.MPESA_SHORTCODE
    );
    const tillNumber = cleanEnv(
      process.env.MPESA_TILL_NUMBER || process.env.MPESA_SHORTCODE
    );

    if (
      !consumerKey ||
      !consumerSecret ||
      !passkey ||
      !storeNumber ||
      !tillNumber
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing M-Pesa environment variables in Vercel settings.",
        },
        { status: 500 }
      );
    }

    const authString = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");
    const oauthUrl =
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const tokenRes = await safaricomRequest(oauthUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
        Accept: "application/json",
      },
    });

    const tokenData = parseSafaricomJson(tokenRes, "OAuth");

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, error: "Daraja Auth Failed." },
        { status: 401 }
      );
    }

    const accessToken = tokenData.access_token;
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);
    const password = Buffer.from(
      `${storeNumber}${passkey}${timestamp}`
    ).toString("base64");

    // Must use the primary www domain directly so Safaricom does not hit a 307/308 redirect
    const callbackUrl = "https://www.juronmodels.co.ke/api/tickets/callback";
    const roundedAmount = Math.round(Number(amount));
    const safeQuantity = Math.max(1, Number(quantity) || 1);

    const stkPayload = JSON.stringify({
      BusinessShortCode: storeNumber,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: roundedAmount,
      PartyA: formattedPhone,
      PartyB: tillNumber,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: String(ticketType).slice(0, 12),
      TransactionDesc: "Juron Ticket",
    });

    const stkUrl =
      cleanEnv(process.env.MPESA_STKPUSH_URL) ||
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const stkRes = await safaricomRequest(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Content-Length": Buffer.byteLength(stkPayload).toString(),
      },
      body: stkPayload,
    });

    const mpesaResponse = parseSafaricomJson(stkRes, "STK Push");

    if (mpesaResponse.ResponseCode === "0") {
      await prisma.ticketOrder.create({
        data: {
          checkoutRequestId: mpesaResponse.CheckoutRequestID,
          phoneNumber: formattedPhone,
          amount: roundedAmount,
          ticketType: String(ticketType),
          quantity: safeQuantity,
          status: "PENDING",
          source: affiliateCode ? "REFERRAL" : "WEBSITE",
          affiliateCode: affiliateCode || null,
        },
      });

      return NextResponse.json({
        success: true,
        message: "STK Push Initiated",
      });
    } else {
      console.error("Ticket STK Push Failed:", mpesaResponse);
      return NextResponse.json(
        {
          success: false,
          error:
            mpesaResponse.errorMessage ||
            mpesaResponse.CustomerMessage ||
            "STK Push rejected by Safaricom.",
        },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("Ticket STK Push Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}