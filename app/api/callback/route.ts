import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const queryNomineeCode = req.nextUrl.searchParams.get("nomineeId");
    const body = await req.json();
    const callbackData = body?.Body?.stkCallback;

    if (!callbackData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const checkoutRequestId: string | undefined =
      callbackData.CheckoutRequestID;
    const pendingKey = checkoutRequestId
      ? `PENDING_${checkoutRequestId}`
      : null;

    // Look up the pending record saved when STK Push was initiated
    const pendingTx = pendingKey
      ? await (prisma as any).voteTransaction.findFirst({
          where: { receiptNumber: pendingKey },
        })
      : null;

    const rawNomineeCode = queryNomineeCode || pendingTx?.nomineeCode || null;
    const nomineeCode = rawNomineeCode
      ? String(rawNomineeCode).trim().toUpperCase()
      : null;

    console.log(
      `📩 M-Pesa Callback | ResultCode=${callbackData.ResultCode} | CheckoutRequestID=${checkoutRequestId} | Nominee=${nomineeCode}`
    );

    // Clean up pending row if user cancelled or payment failed
    if (callbackData.ResultCode !== 0) {
      if (pendingKey) {
        await (prisma as any).voteTransaction.deleteMany({
          where: { receiptNumber: pendingKey },
        });
      }
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (callbackData.ResultCode === 0 && nomineeCode) {
      const metadata = callbackData.CallbackMetadata?.Item || [];
      const getMeta = (name: string) =>
        metadata.find((i: { Name: string; Value?: unknown }) => i.Name === name)
          ?.Value;

      const receipt = String(getMeta("MpesaReceiptNumber") || "UNKNOWN");
      const voterPhone = String(getMeta("PhoneNumber") || "UNKNOWN");
      const paidAmount = Number(getMeta("Amount")) || 0;

      // Prevent duplicate vote credits if Safaricom retries the webhook
      if (receipt !== "UNKNOWN") {
        const alreadyProcessed = await (
          prisma as any
        ).voteTransaction.findFirst({
          where: { receiptNumber: receipt },
        });
        if (alreadyProcessed) {
          return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
        }
      }

      const VOTE_PRICE = 10;
      const actualVotes = Math.floor(paidAmount / VOTE_PRICE);

      if (nomineeCode.startsWith("TKT-")) {
        await (prisma as any).eventTicket.create({
          data: {
            ticketCode: nomineeCode,
            ticketType: nomineeCode.includes("CRN")
              ? "Crown Ticket"
              : "Royal Ticket",
            phone: voterPhone,
            receipt,
            status: "PAID",
          },
        });

        if (pendingTx && pendingKey) {
          await (prisma as any).voteTransaction.updateMany({
            where: { receiptNumber: pendingKey },
            data: {
              amount: paidAmount,
              votesAwarded: 0,
              phone: voterPhone,
              receiptNumber: receipt,
              nomineeCode: "EVENT_TICKET",
            },
          });
        } else {
          await (prisma as any).voteTransaction.create({
            data: {
              amount: paidAmount,
              votesAwarded: 0,
              phone: voterPhone,
              receiptNumber: receipt,
              nomineeCode: "EVENT_TICKET",
            },
          });
        }

        console.log(`🎟️ Ticket Generated: ${nomineeCode} for ${voterPhone}`);
      } else if (actualVotes > 0) {
        if (pendingTx && pendingKey) {
          await (prisma as any).voteTransaction.updateMany({
            where: { receiptNumber: pendingKey },
            data: {
              amount: paidAmount,
              votesAwarded: actualVotes,
              phone: voterPhone,
              receiptNumber: receipt,
              nomineeCode,
            },
          });
        } else {
          await (prisma as any).voteTransaction.create({
            data: {
              amount: paidAmount,
              votesAwarded: actualVotes,
              phone: voterPhone,
              receiptNumber: receipt,
              nomineeCode,
            },
          });
        }

        await (prisma as any).voting.upsert({
          where: { code: nomineeCode },
          update: { votes: { increment: actualVotes } },
          create: {
            code: nomineeCode,
            fullName: nomineeCode,
            category: "General",
            title: "Nominee",
            votes: actualVotes,
          },
        });

        console.log(
          `✅ Payment ${receipt}: ${actualVotes} votes to ${nomineeCode} from ${voterPhone} (Paid: ${paidAmount} KES)`
        );
      } else {
        console.log(
          `⚠️ Payment ${receipt}: Amount ${paidAmount} KES was too low to award any votes.`
        );
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Webhook Error:", message);
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Accepted with internal errors",
    });
  }
}