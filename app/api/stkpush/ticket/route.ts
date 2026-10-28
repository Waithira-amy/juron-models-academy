import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    if (!rawBody) throw new Error("The frontend sent an empty request.");
    const { phone, amount, ticketType, quantity, affiliateCode } = JSON.parse(rawBody);

    let formattedPhone = phone.trim();
    if (formattedPhone.startsWith("0")) formattedPhone = "254" + formattedPhone.slice(1);
    else if (formattedPhone.startsWith("+")) formattedPhone = formattedPhone.slice(1);

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    
    if (!consumerKey || !consumerSecret) {
      throw new Error("Missing MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET in Vercel settings.");
    }

    const authString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await fetch("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${authString}` },
    });
    
    const tokenText = await tokenRes.text();
    if (!tokenText) throw new Error(`Daraja Auth returned a blank response. Status: ${tokenRes.status}`);
    
    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch(e) {
      throw new Error(`Daraja Auth returned invalid data: ${tokenText.substring(0, 50)}...`);
    }
    
    if (!tokenData.access_token) {
      return NextResponse.json({ success: false, error: `Daraja Auth Failed: ${tokenText}` }, { status: 500 });
    }
    
    const accessToken = tokenData.access_token;
    const shortCode = process.env.MPESA_PASSKEY ? process.env.MPESA_SHORTCODE : "174379"; 
    const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://juronmodels.co.ke";

    const stkRes = await fetch("https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount, 
        PartyA: formattedPhone,
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: `${appUrl}/api/tickets/callback`,
        AccountReference: ticketType,
        TransactionDesc: `Payment for ${quantity} ${ticketType} ticket(s)`,
      }),
    });

    const stkText = await stkRes.text();
    if (!stkText) throw new Error(`Safaricom STK returned a blank response. Status: ${stkRes.status}`);
    
    let mpesaResponse;
    try {
      mpesaResponse = JSON.parse(stkText);
    } catch (e) {
      throw new Error(`Safaricom STK returned invalid data: ${stkText.substring(0, 50)}...`);
    }

    if (mpesaResponse.ResponseCode === "0") {
      await prisma.ticketOrder.create({
        data: {
          checkoutRequestId: mpesaResponse.CheckoutRequestID,
          phoneNumber: formattedPhone,
          amount: amount,
          ticketType: ticketType,
          quantity: quantity,
          status: "PENDING",
          source: affiliateCode ? "REFERRAL" : "WEBSITE",
          affiliateCode: affiliateCode || null,
        },
      });

      return NextResponse.json({ success: true, message: "STK Push Initiated" });
    } else {
      return NextResponse.json({ success: false, error: `STK Failed: ${stkText}` }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Ticket STK Push Error:", error);
    const networkCause = error.cause ? (error.cause.message || String(error.cause)) : "Unknown Network Drop";
    return NextResponse.json({ 
      success: false, 
      error: `Crash Details: ${error.message}. Cause: ${networkCause}` 
    }, { status: 500 });
  }
}