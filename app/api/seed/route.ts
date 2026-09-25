import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prisma = new PrismaClient();

    // 1. Fetch all existing registrations
    const registrations = await (prisma as any).registration.findMany();

    if (registrations.length === 0) {
      return NextResponse.json({ message: "No registrations found to copy." });
    }

    let count = 0;
    
    // 2. Loop through and copy them to the official Voting table
    for (const reg of registrations) {
      
      // Safety check to prevent duplicates if you run this twice
      const exists = await (prisma as any).voting.findFirst({
        where: { fullName: reg.fullName }
      });

      if (!exists) {
        await (prisma as any).voting.create({
          data: {
            fullName: reg.fullName,
            // Automatically generates a unique voting code (e.g., JM1, JM2)
            code: `JM${reg.id}`, 
            // Maps their registered location to the category
            category: reg.location || "Machakos- Mavoko", 
            // Defaults everyone to Miss (you can quickly flip the guys to Mr in Prisma Studio)
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
    
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ success: false, error: "Failed to migrate data" }, { status: 500 });
  }
}