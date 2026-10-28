import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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