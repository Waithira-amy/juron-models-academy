import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const nomineeCode = req.nextUrl.searchParams.get("nomineeId"); 
    const body = await req.json();
    const callbackData = body?.Body?.stkCallback;

    if (!callbackData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (callbackData.ResultCode === 0 && nomineeCode) {
      const metadata = callbackData.CallbackMetadata?.Item || [];
      const getMeta = (name: string) => metadata.find((i: any) => i.Name === name)?.Value;
      
      const receipt = getMeta("MpesaReceiptNumber") || "UNKNOWN";
      const voterPhone = getMeta("PhoneNumber")?.toString() || "UNKNOWN";
      const paidAmount = Number(getMeta("Amount")) || 0;

      // SECURE CALCULATION: 10 KES = 1 Vote based strictly on money received
      const VOTE_PRICE = 10;
      const actualVotes = Math.floor(paidAmount / VOTE_PRICE);

      if (nomineeCode.toString().startsWith("TKT-")) {
        // --- TICKET PURCHASE ---
        await (prisma as any).eventTicket.create({
          data: {
            ticketCode: nomineeCode as string,
            ticketType: nomineeCode.toString().includes("CRN") ? "Crown Ticket" : "Royal Ticket",
            phone: voterPhone,
            receipt: receipt,
            status: "PAID"
          }
        });
        
        await (prisma as any).voteTransaction.create({
          data: { amount: paidAmount, votesAwarded: 0, phone: voterPhone, receiptNumber: receipt, nomineeCode: "EVENT_TICKET" }
        });
        
        console.log(`🎟️ Ticket Generated: ${nomineeCode} for ${voterPhone}`);
        
      } else {
        // --- VOTE PURCHASE ---
        if (actualVotes > 0) {
          await (prisma as any).voteTransaction.create({
            data: { amount: paidAmount, votesAwarded: actualVotes, phone: voterPhone, receiptNumber: receipt, nomineeCode: nomineeCode as string }
          });
          
          await (prisma as any).voting.upsert({
            where: { code: nomineeCode as string },
            update: { votes: { increment: actualVotes } },
            create: {
              code: nomineeCode as string,
              fullName: nomineeCode as string,
              category: "General",
              title: "Nominee",
              votes: actualVotes
            }
          });
          
          console.log(`✅ Payment ${receipt}: ${actualVotes} votes to ${nomineeCode} from ${voterPhone} (Paid: ${paidAmount} KES)`);
        } else {
          console.log(`⚠️ Payment ${receipt}: Amount ${paidAmount} KES was too low to award any votes.`);
        }
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (error: any) {
    console.error("Webhook Error:", error.message || error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted with internal errors" });
  }
}