import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const nominees = await (prisma as any).voting.findMany({
      select: {
        code: true,
        fullName: true,
        category: true,
        title: true,
        votes: true,
        photoUrl: true, // <-- Added this line to fetch photos!
      }
    });

    return NextResponse.json({
      success: true,
      nominees
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      }
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}