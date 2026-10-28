import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const voteAggregations = await prisma.voteTransaction.groupBy({
      by: ["nomineeCode"],
      _sum: { votesAwarded: true },
    });

    const nominees = await prisma.voting.findMany({
      select: {
        code: true,
        fullName: true,
        category: true,
        title: true,
        votes: true,
        photoUrl: true,
      },
    });

    const mergedNominees = nominees.map((nom) => {
      const agg = voteAggregations.find((v) => v.nomineeCode === nom.code);
      return {
        ...nom,
        votes: agg?._sum?.votesAwarded || nom.votes || 0,
      };
    });

    const finalData = mergedNominees.length > 0 
        ? mergedNominees 
        : voteAggregations.map((a) => ({ code: a.nomineeCode, votes: a._sum.votesAwarded || 0 }));

    return NextResponse.json(
      { success: true, nominees: finalData },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}