export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const { phone, amount, ticketType, quantity, affiliateCode } = await req.json();

    let formattedPhone = phone.trim();
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.slice(1);
    }

    const authString = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${authString}` },
    });
    
    const tokenData = await tokenRes.json();
    
    if (!tokenData.access_token) {
      // Returns the exact Daraja auth error to the frontend
      return NextResponse.json({ success: false, error: `Daraja Auth Failed: ${JSON.stringify(tokenData)}` }, { status: 500 });
    }
    
    const accessToken = tokenData.access_token;
    const shortCode = process.env.MPESA_PASSKEY ? process.env.MPESA_SHORTCODE : "174379"; 
    const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

    const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
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
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/tickets/callback`,
        AccountReference: ticketType,
        TransactionDesc: `Payment for ${quantity} ${ticketType} ticket(s)`,
      }),
    });

    const mpesaResponse = await stkRes.json();

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
      // Returns the exact STK push failure reason to the frontend
      return NextResponse.json({ success: false, error: `STK Failed: ${JSON.stringify(mpesaResponse)}` }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Ticket STK Push Error:", error);
    // Returns the exact crash details (like a database error or missing environment variable) to the frontend
    return NextResponse.json({ success: false, error: `Crash Details: ${error.message || String(error)}` }, { status: 500 });
  }
}