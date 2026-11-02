import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { reference, nomineeCode, votes } = await request.json();

    if (!reference || !nomineeCode) {
      return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 });
    }

    // 1. Verify the transaction with Paystack's server using your Secret Key
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

    // 3. TODO: Update your Database here!
    // Increment the nominee's vote count in your database where code matches nomineeCode.
    // e.g., await db.nominee.update({ where: { code: nomineeCode }, data: { votes: { increment: votes } } });

    console.log(`Successfully verified payment for reference ${reference}. Added ${votes} votes to nominee ${nomineeCode}.`);

    return NextResponse.json({ success: true, message: "Payment verified and votes recorded successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}