import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// 1. Check ticket status (Used by frontend to show the QR code after payment)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  
  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  try {
    const ticket = await prisma.eventTicket.findUnique({ where: { ticketCode: code } });
    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

// 2. Scan and invalidate ticket (Used by the Bouncer at the gate)
export async function POST(req: Request) {
  const body = await req.json();
  const { ticketCode } = body;

  try {
    const ticket = await prisma.eventTicket.findUnique({ where: { ticketCode } });

    if (!ticket) {
      return NextResponse.json({ success: false, message: "❌ Invalid Ticket: Not found in system" });
    }

    if (ticket.status === "SCANNED") {
      return NextResponse.json({ success: false, message: "⚠️ TICKET ALREADY SCANNED!" });
    }

    // Mark as scanned
    await prisma.eventTicket.update({
      where: { ticketCode },
      data: { status: "SCANNED" }
    });

    return NextResponse.json({ 
      success: true, 
      message: `✅ VALID TICKET! (${ticket.ticketType}) - Access Granted` 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "System error" });
  }
}