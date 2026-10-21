import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // FIX: Using req.nextUrl safely parses the URL on Netlify without crashing
    const nomineeCode = req.nextUrl.searchParams.get("nomineeId"); 
    const votes = Number(req.nextUrl.searchParams.get("votes")) || 1;

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
        await (prisma as any).voteTransaction.create({
          data: { amount: paidAmount, votesAwarded: votes, phone: voterPhone, receiptNumber: receipt, nomineeCode: nomineeCode as string }
        });
        
        await (prisma as any).voting.upsert({
          where: { code: nomineeCode as string },
          update: { votes: { increment: votes } },
          create: {
            code: nomineeCode as string,
            fullName: nomineeCode as string,
            category: "General",
            title: "Nominee",
            votes: votes
          }
        });
        
        console.log(`✅ Payment ${receipt}: ${votes} votes to ${nomineeCode} from ${voterPhone}`);
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (error: any) {
    // This will print the exact reason if it ever fails again
    console.error("Webhook Error:", error.message || error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted with internal errors" });
  }
}