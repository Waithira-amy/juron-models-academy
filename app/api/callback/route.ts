import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    const url = new URL(req.url);
    const nomineeCode = url.searchParams.get("nomineeId"); 
    const votes = Number(url.searchParams.get("votes"));

    const body = await req.json();
    const callbackData = body?.Body?.stkCallback;

    if (!callbackData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (callbackData.ResultCode === 0 && nomineeCode && votes) {
      const metadata = callbackData.CallbackMetadata?.Item || [];
      const getMeta = (name: string) => metadata.find((i: any) => i.Name === name)?.Value;
      
      const receipt = getMeta("MpesaReceiptNumber") || "UNKNOWN";
      const voterPhone = getMeta("PhoneNumber")?.toString() || "UNKNOWN";
      const paidAmount = Number(getMeta("Amount")) || 0;

      // 1. Record transaction in ledger
      await (prisma as any).voteTransaction.create({
        data: {
          amount: paidAmount,
          votesAwarded: votes,
          phone: voterPhone,
          receiptNumber: receipt,
          nomineeCode: nomineeCode as string,
        }
      });
      
      // 2. Safely increment or insert using UPSERT (prevents RecordNotFound crashes)
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

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted with internal errors" });
  }
}