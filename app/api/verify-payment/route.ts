import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function POST(request: Request) {
  try {
    const { reference, nomineeCode, votes } = await request.json();

    if (!reference || !nomineeCode) {
      return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 });
    }

    // 1. Verify the transaction with Paystack's server
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const paystackData = await paystackResponse.json();

    // 2. Check if Paystack confirmed the payment was successful
    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 });
    }

    // 3. Update the Database using the correct models: VoteTransaction and Voting
    const votesToAdd = Number(votes) || 1;
    const paidAmount = paystackData.data.amount / 100; // Paystack amount is in cents
    const customerIdentifier = paystackData.data.customer?.email || "CARD_PAYMENT";
    const formattedCode = nomineeCode.toUpperCase();

    // Log the transaction in your VoteTransaction ledger
    await (prisma as any).voteTransaction.create({
      data: { 
        amount: paidAmount, 
        votesAwarded: votesToAdd, 
        phone: customerIdentifier, 
        receiptNumber: reference, 
        nomineeCode: formattedCode 
      }
    });

    // Update the nominee's total votes in the Voting table
    await (prisma as any).voting.upsert({
      where: { code: formattedCode },
      update: { votes: { increment: votesToAdd } },
      create: {
        code: formattedCode,
        fullName: formattedCode,
        category: "Card Voting",
        title: "Nominee",
        votes: votesToAdd
      }
    });

    console.log(`✅ Paystack Payment ${reference}: ${votesToAdd} votes to ${formattedCode} (Paid: ${paidAmount} KES)`);

    return NextResponse.json({ success: true, message: "Votes updated successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}