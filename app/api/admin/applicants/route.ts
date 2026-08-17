import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();

    // THIS IS YOUR SECRET ADMIN PASSWORD. You can change this to anything!
    if (pin !== "JMA2026") {
      return NextResponse.json({ success: false, message: "Invalid PIN code." }, { status: 401 });
    }

    // Fetch all applicants safely from the database
    const applicants = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, applicants });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ success: false, message: "Server error fetching applicants." }, { status: 500 });
  }
}