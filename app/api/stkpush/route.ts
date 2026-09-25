import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { phone, amount, nomineeId, nomineeName, votes } = await req.json();

    let formattedPhone = phone.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }

    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
    
    // Hardcoded URL guarantees Safaricom sees the grant_type perfectly
    const oauthUrl = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    
    const tokenResponse = await fetch(oauthUrl, {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store", 
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Safaricom Auth Error:", tokenData);
      return NextResponse.json({ success: false, error: "Safaricom Auth Failed." }, { status: 401 });
    }
    
    const accessToken = tokenData.access_token;
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const passkey = process.env.MPESA_PASSKEY!;
    
    const storeNumber = process.env.MPESA_STORE_NUMBER || process.env.MPESA_SHORTCODE!;
    const tillNumber = process.env.MPESA_TILL_NUMBER || process.env.MPESA_SHORTCODE!;
    const password = Buffer.from(`${storeNumber}${passkey}${timestamp}`).toString("base64");

    // Extracts base domain from env and dynamically adds callback params
    const rawEnvUrl = process.env.MPESA_CALLBACK_URL || "https://juronmodels.co.ke";
    const baseDomain = new URL(rawEnvUrl).origin;
    const callbackUrl = `${baseDomain}/api/callback?nomineeId=${encodeURIComponent(nomineeId)}&votes=${votes}`;

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
      TransactionDesc: `Voting for ${nomineeName}`,
    };

    const stkUrl = process.env.MPESA_STKPUSH_URL || "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const stkResponse = await fetch(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(stkPayload),
    });

    const stkData = await stkResponse.json();

    if (stkData.ResponseCode === "0") {
      return NextResponse.json({ success: true, message: "STK Push sent to phone" });
    } else {
      console.error("STK Push Failed:", stkData);
      return NextResponse.json({ success: false, error: stkData.errorMessage || stkData.CustomerMessage }, { status: 400 });
    }
  } catch (error) {
    console.error("STK Push Exception:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}