import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function parseSafaricomResponse(res: Response, step: string) {
  const rawText = await res.text();
  if (!rawText) {
    throw new Error(
      `Safaricom ${step} returned an empty response (HTTP ${res.status})`
    );
  }
  try {
    return JSON.parse(rawText);
  } catch {
    throw new Error(
      `Safaricom ${step} returned non-JSON (HTTP ${res.status}): ${rawText.slice(0, 200)}`
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

    const consumerKey = process.env.MPESA_CONSUMER_KEY?.trim();
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET?.trim();
    const passkey = process.env.MPESA_PASSKEY?.trim();
    const storeNumber = (
      process.env.MPESA_STORE_NUMBER || process.env.MPESA_SHORTCODE
    )?.trim();
    const tillNumber = (
      process.env.MPESA_TILL_NUMBER || process.env.MPESA_SHORTCODE
    )?.trim();

    if (!consumerKey || !consumerSecret || !passkey || !storeNumber || !tillNumber) {
      console.error("Missing M-Pesa environment variables on Vercel");
      return NextResponse.json(
        { success: false, error: "Server M-Pesa configuration is incomplete." },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const oauthUrl =
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const tokenResponse = await fetch(oauthUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    const tokenData = await parseSafaricomResponse(tokenResponse, "OAuth");

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Safaricom Auth Error:", tokenData);
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

    // Must match your Primary non-redirecting domain in Vercel
    const baseUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://juronmodels.co.ke"
    ).replace(/\/$/, "");
    const callbackUrl = `${baseUrl}/api/callback?nomineeId=${encodeURIComponent(
      nomineeId
    )}&votes=${encodeURIComponent(String(votes ?? 1))}`;

    const stkPayload = {
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
    };

    const stkUrl =
      process.env.MPESA_STKPUSH_URL?.trim() ||
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const stkResponse = await fetch(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
      body: JSON.stringify(stkPayload),
    });

    const stkData = await parseSafaricomResponse(stkResponse, "STK Push");

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
  } catch (error: any) {
    console.error("STK Push Exception:", error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}