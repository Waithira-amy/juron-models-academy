import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const stkCallback = data?.Body?.stkCallback;

    if (!stkCallback) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;

    if (resultCode !== 0) {
      await prisma.ticketOrder.updateMany({
        where: { checkoutRequestId },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ message: "Transaction failed or canceled" });
    }

    const callbackItems = stkCallback.CallbackMetadata?.Item || [];
    const mpesaReceiptObj = callbackItems.find((item: any) => item.Name === "MpesaReceiptNumber");
    const mpesaReceiptNumber = mpesaReceiptObj?.Value as string;

    const pendingOrder = await prisma.ticketOrder.findUnique({
      where: { checkoutRequestId },
    });

    if (pendingOrder) {
      await prisma.$transaction(async (tx) => {
        await tx.ticketOrder.update({
          where: { checkoutRequestId },
          data: {
            transactionCode: mpesaReceiptNumber,
            status: "SUCCESS",
          },
        });

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