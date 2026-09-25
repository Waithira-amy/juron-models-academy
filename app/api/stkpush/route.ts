import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { phone, amount, nomineeId, nomineeName, votes } = await req.json();

    // 1. Format Phone Number
    let formattedPhone = phone.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }

    // 2. Generate Safaricom Access Token (Bypass Next.js caching)
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
    
    const tokenResponse = await fetch(process.env.MPESA_OAUTH_URL!, {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store", 
    });
    
    const tokenData = await tokenResponse.json();
    
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
    
    // CRITICAL FIX FOR BUY GOODS TILLS: 
    // The password is generated using the STORE NUMBER, not the Till Number.
    const storeNumber = process.env.MPESA_STORE_NUMBER || process.env.MPESA_SHORTCODE!;
    const tillNumber = process.env.MPESA_TILL_NUMBER!;
    
    const password = Buffer.from(`${storeNumber}${passkey}${timestamp}`).toString("base64");

    // 4. Construct Callback URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const callbackUrl = `${baseUrl}/api/callback?nomineeId=${nomineeId}&votes=${votes}`;

    // 5. Send STK Push Request
    const stkPayload = {
      BusinessShortCode: storeNumber, // Must be the Store Number
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline", // Mandatory for Till Numbers
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone,
      PartyB: tillNumber, // Must be the Till Number
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "Juron Models",
      TransactionDesc: `Voting for ${nomineeName}`,
    };

    const stkResponse = await fetch(process.env.MPESA_STKPUSH_URL!, {
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