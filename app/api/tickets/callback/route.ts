export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const stkCallback = data?.Body?.stkCallback;

    if (!stkCallback) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;

    // Handle canceled or failed M-Pesa prompts
    if (resultCode !== 0) {
      await prisma.ticketOrder.updateMany({
        where: { checkoutRequestId },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ message: "Transaction failed or canceled" });
    }

    // Extract M-Pesa Receipt Number for successful transactions
    const callbackItems = stkCallback.CallbackMetadata?.Item || [];
    const mpesaReceiptObj = callbackItems.find((item: any) => item.Name === "MpesaReceiptNumber");
    const mpesaReceiptNumber = mpesaReceiptObj?.Value as string;

    // 1. Find the pending ticket order
    const pendingOrder = await prisma.ticketOrder.findUnique({
      where: { checkoutRequestId },
    });

    if (pendingOrder) {
      // 2. Wrap database updates in a transaction
      await prisma.$transaction(async (tx) => {
        // A. Mark ticket order as SUCCESS
        await tx.ticketOrder.update({
          where: { checkoutRequestId },
          data: {
            transactionCode: mpesaReceiptNumber,
            status: "SUCCESS",
          },
        });

        // B. If an affiliate referred this sale, give them 20%
        if (pendingOrder.affiliateCode) {
          const commission = pendingOrder.amount * 0.20;
          await tx.affiliate.update({
            where: { code: pendingOrder.affiliateCode },
            data: { commissionKES: { increment: commission } },
          });
        }
      });
    }

    return NextResponse.json({ success: true, message: "Ticket Webhook processed" });
  } catch (error) {
    console.error("Ticket Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}