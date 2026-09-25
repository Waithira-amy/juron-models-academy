import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Grab the tracking info from the URL query parameters
    const url = new URL(req.url);
    const nomineeId = url.searchParams.get("nomineeId"); // e.g. "MVK01"
    const votes = Number(url.searchParams.get("votes"));

    // 2. Read Safaricom's payment receipt
    const body = await req.json();
    const callbackData = body?.Body?.stkCallback;

    if (!callbackData) {
      return NextResponse.json({ error: "Invalid Safaricom payload" }, { status: 400 });
    }

    // 3. Process the payment result (ResultCode 0 = Success)
    if (callbackData.ResultCode === 0 && nomineeId && votes) {
      
      // Award the votes in the Neon Database matching the frontend CODE.
      // Using "(prisma.registration as any)" safely bypasses the local VS Code cache errors.
      await (prisma.registration as any).update({
        where: { code: nomineeId as string },
        data: {
          votes: {
            increment: votes
          }
        }
      });
      
      console.log(`✅ Payment Confirmed: Awarded ${votes} votes to Nominee ${nomineeId}`);
    } else {
      console.log(`❌ Payment Failed/Cancelled: ${callbackData.ResultDesc}`);
    }

    // 4. Safaricom requires a fast HTTP 200 acknowledgment
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (error) {
    console.error("Webhook Error:", error);
    // Even if our DB fails, we must tell Safaricom we received the message to stop retries
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted with internal errors" });
  }
}