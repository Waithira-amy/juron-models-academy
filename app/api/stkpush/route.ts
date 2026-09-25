import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, amount, nomineeId, voteCount } = body;

    // 1. Format Phone Number (convert 07... to 2547...)
    let formattedPhone = phoneNumber.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) formattedPhone = "254" + formattedPhone.substring(1);
    else if (formattedPhone.startsWith("+")) formattedPhone = formattedPhone.substring(1);

    const consumerKey = process.env.MPESA_CONSUMER_KEY!;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
    const passkey = process.env.MPESA_PASSKEY!;
    const shortcode = process.env.MPESA_SHORTCODE!;
    
    const env = process.env.MPESA_ENVIRONMENT || "sandbox"; 
    const baseUrl = env === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";

    // 2. Authenticate with Daraja
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const tokenResponse = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    
    if (!tokenResponse.ok) throw new Error("Failed to authenticate with Daraja");
    const { access_token } = await tokenResponse.json();

    // 3. Setup Payload
    const date = new Date();
    const timestamp = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, "0") + date.getDate().toString().padStart(2, "0") + date.getHours().toString().padStart(2, "0") + date.getMinutes().toString().padStart(2, "0") + date.getSeconds().toString().padStart(2, "0");
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
    
    // THE TRICK: Embed the nomineeId and voteCount directly into the dynamic callback URL!
    // Example: https://juronmodels.co.ke/api/callback/MVK01/10
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/${nomineeId}/${voteCount}`;
    
    // 4. Send Request to Safaricom
    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // Change to "CustomerBuyGoodsOnline" for a Till Number
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: `Vote ${nomineeId}`, 
        TransactionDesc: `${voteCount} Votes for Juron Models`,
      }),
    });

    const stkData = await stkResponse.json();
    
    if (stkData.ResponseCode === "0") {
      return NextResponse.json({ success: true, message: "Push sent" });
    } else {
      return NextResponse.json({ success: false, error: stkData.errorMessage }, { status: 400 });
    }
  } catch (error: any) {
    console.error("STK Push Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}