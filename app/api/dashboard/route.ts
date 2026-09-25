import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    
    // Adding "(prisma as any)" forces Next.js to ignore the cached types 
    // and just pull the data directly from the new Voting table.
    const nominees = await (prisma as any).voting.findMany({
      orderBy: {
        votes: 'desc'
      },
      select: {
        id: true,
        fullName: true,
        code: true,
        category: true, 
        title: true, 
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