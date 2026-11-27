import { NextResponse } from "next/server";
import https from "https";

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
    const { phone, amount, nomineeId, votes } = await req.json();

    if (!phone || !amount || !nomineeId) {
      return NextResponse.json(
        { success: false, error: "Missing phone, amount, or nominee ID." },
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
      console.error("Missing M-Pesa environment variables on Vercel");
      return NextResponse.json(
        { success: false, error: "Server M-Pesa configuration is incomplete." },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );
    const oauthUrl =
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const tokenResponse = await safaricomRequest(oauthUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    if (tokenResponse.status !== 200 || !tokenResponse.text) {
      console.error(
        `Safaricom OAuth Failed (HTTP ${tokenResponse.status}) | keyLen=${consumerKey.length} (${consumerKey.slice(0, 2)}...${consumerKey.slice(-2)}) | secretLen=${consumerSecret.length} | body=${tokenResponse.text}`
      );
    }

    const tokenData = parseSafaricomJson(tokenResponse, "OAuth");

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, error: "Safaricom Auth Failed." },
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

    const callbackUrl = `https://juronmodels.co.ke/api/callback?nomineeId=${encodeURIComponent(
      String(nomineeId)
    )}&votes=${encodeURIComponent(String(votes ?? 1))}`;

    const stkPayload = JSON.stringify({
      BusinessShortCode: storeNumber,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone,
      PartyB: tillNumber,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "Juron Models",
      TransactionDesc: "Juron Vote",
    });

    const stkUrl =
      cleanEnv(process.env.MPESA_STKPUSH_URL) ||
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const stkResponse = await safaricomRequest(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Content-Length": Buffer.byteLength(stkPayload).toString(),
      },
      body: stkPayload,
    });

    const stkData = parseSafaricomJson(stkResponse, "STK Push");

    if (stkData.ResponseCode === "0") {
      return NextResponse.json({
        success: true,
        message: "STK Push sent to phone",
      });
    } else {
      console.error("STK Push Failed:", stkData);
      return NextResponse.json(
        {
          success: false,
          error:
            stkData.errorMessage ||
            stkData.CustomerMessage ||
            "STK Push rejected by Safaricom.",
        },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("STK Push Exception:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}