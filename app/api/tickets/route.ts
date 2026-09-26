import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const dynamic = "force-dynamic";

// 1. Check ticket status (Used by frontend to show the QR code after payment)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  
  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const ticket = await (prisma as any).eventTicket.findUnique({ where: { ticketCode: code } });
    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ success: false });
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

// 2. Scan and invalidate ticket (Used by the Bouncer at the gate)
export async function POST(req: Request) {
  const body = await req.json();
  const { ticketCode } = body;

  const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const ticket = await (prisma as any).eventTicket.findUnique({ where: { ticketCode } });

    if (!ticket) {
      return NextResponse.json({ success: false, message: "❌ Invalid Ticket: Not found in system" });
    }

    if (ticket.status === "SCANNED") {
      return NextResponse.json({ success: false, message: "⚠️ TICKET ALREADY SCANNED!" });
    }

    // Mark as scanned
    await (prisma as any).eventTicket.update({
      where: { ticketCode },
      data: { status: "SCANNED" }
    });

    return NextResponse.json({ 
      success: true, 
      message: `✅ VALID TICKET! (${ticket.ticketType}) - Access Granted` 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "System error" });
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}