import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, amount, nomineeId, nomineeName, votes } = await req.json();

    // 1. Format Phone Number (convert 07.. or +254.. to 2547..)
    let formattedPhone = phone.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }

    // 2. Generate Safaricom Access Token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
    const tokenResponse = await fetch(process.env.MPESA_OAUTH_URL!, {
      headers: { Authorization: `Basic ${auth}` },
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 3. Generate Password and Timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const passkey = process.env.MPESA_PASSKEY!;
    const shortcode = process.env.MPESA_SHORTCODE!;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    // 4. Construct Callback URL with query params (Bypasses Windows [ ] folder errors)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const callbackUrl = `${baseUrl}/api/callback?nomineeId=${nomineeId}&votes=${votes}`;

    // 5. Send STK Push Request
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline", 
      Amount: Math.round(Number(amount)),
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_TILL_NUMBER!,
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
      body: JSON.stringify(stkPayload),
    });

    const stkData = await stkResponse.json();

    // ResultCode 0 means the prompt was successfully sent to the user's phone
    if (stkData.ResponseCode === "0") {
      return NextResponse.json({ success: true, message: "STK Push sent to phone" });
    } else {
      return NextResponse.json({ success: false, error: stkData.errorMessage || "Failed to push to phone" }, { status: 400 });
    }
  } catch (error) {
    console.error("STK Push Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}