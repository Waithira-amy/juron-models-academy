import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const nominees = await prisma.voting.findMany({
      select: {
        code: true,
        fullName: true,
        category: true,
        title: true,
        votes: true,
        photoUrl: true, 
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