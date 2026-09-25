import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { phone, amount, nomineeId, nomineeName, votes } = await req.json();

    // 1. Format Phone Number (e.g., 0712345678 -> 254712345678)
    let formattedPhone = phone.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }

    // 2. Generate Safaricom Access Token (Bypass Vercel env bugs with hardcoded URL)
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
    
    // HARDCODED URL guarantees Safaricom sees the grant_type perfectly
    const oauthUrl = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    
    const tokenResponse = await fetch(oauthUrl, {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store", 
    });
    
    const tokenData = await tokenResponse.json();
    
    // Safety check: log exact reason if Safaricom rejects the login
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Safaricom Auth Error:", tokenData);
      return NextResponse.json({ 
        success: false, 
        error: "Safaricom Auth Failed. Check Vercel Logs." 
      }, { status: 401 });
    }
    
    const accessToken = tokenData.access_token;

    // 3. Generate Password and Timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const passkey = process.env.MPESA_PASSKEY!;
    
    // CRITICAL FOR BUY GOODS TILLS:
    // Password generation uses the STORE NUMBER, while PartyB uses the TILL NUMBER.
    const storeNumber = process.env.MPESA_STORE_NUMBER || process.env.MPESA_SHORTCODE!;
    const tillNumber = process.env.MPESA_TILL_NUMBER || process.env.MPESA_SHORTCODE!;
    
    const password = Buffer.from(`${storeNumber}${passkey}${timestamp}`).toString("base64");

    // 4. Construct Callback URL using your specific Environment Variable
    const rawEnvUrl = process.env.MPESA_CALLBACK_URL || "https://juronmodels.co.ke";
    
    // This safely extracts just the base domain (e.g., https://juron-models-academy.vercel.app)
    const baseDomain = new URL(rawEnvUrl).origin;
    
    // This builds the exact correct path to our new file and attaches the nominee tracking
    const callbackUrl = `${baseDomain}/api/callback?nomineeId=${encodeURIComponent(nomineeId)}&votes=${votes}`;

    // 5. Send STK Push Request
    const stkPayload = {
      BusinessShortCode: storeNumber, // Must be the Store Number (Backend)
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline", // Mandatory for Buy Goods Tills
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone, // Customer phone number
      PartyB: tillNumber,     // The public Till Number
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "Juron Models",
      TransactionDesc: `Voting for ${nomineeName}`,
    };

    // Use Live STK push URL
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
      return NextResponse.json({ success: false, error: stkData.errorMessage || stkData.CustomerMessage || "Failed to push to phone" }, { status: 400 });
    }
  } catch (error) {
    console.error("STK Push Exception:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}