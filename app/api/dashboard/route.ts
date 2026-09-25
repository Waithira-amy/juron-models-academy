import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    
    // Using "(prisma.registration as any)" safely bypasses the local type cache errors,
    // exactly like we did in the M-Pesa webhook!
    const nominees = await (prisma.registration as any).findMany({
      orderBy: {
        votes: 'desc'
      },
      select: {
        id: true,
        fullName: true,
        code: true,
        location: true, 
        category: true, // Pulls the category if you have this field
        votes: true,
        photoUrl: true
      }
    });

    return NextResponse.json({ success: true, nominees });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch votes" }, { status: 500 });
  }
}