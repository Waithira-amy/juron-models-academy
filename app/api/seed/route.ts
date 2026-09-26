import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = new PrismaClient();

    // 1. Fetch all existing registrations
    const registrations = await (prisma as any).registration.findMany();

    if (!registrations || registrations.length === 0) {
      return NextResponse.json({ message: "No registrations found to copy." });
    }

    let count = 0;
    
    // 2. Loop through and copy them
    for (const reg of registrations) {
      const exists = await (prisma as any).voting.findFirst({
        where: { fullName: reg.fullName }
      });

      if (!exists) {
        await (prisma as any).voting.create({
          data: {
            fullName: reg.fullName,
            code: `JM${reg.id}`, 
            category: reg.location || "Machakos- Mavoko", 
            title: "Miss", 
            photoUrl: reg.photoUrl || "",
            votes: 0,
          }
        });
        count++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully copied ${count} nominees to the live Voting board!` 
    });
    
  } catch (error: any) {
    console.error("Seed Error:", error);
    // CRITICAL: This will now print the EXACT error on your screen
    return NextResponse.json({ 
      success: false, 
      error: "Failed to migrate data",
      detailedReason: error.message || String(error)
    }, { status: 500 });
  }
}