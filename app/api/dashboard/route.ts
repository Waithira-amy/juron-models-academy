import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    const nominees = await (prisma as any).voting.findMany({
      orderBy: { votes: 'desc' }
    });

    return NextResponse.json({ success: true, nominees });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch votes" }, { status: 500 });
  }
}