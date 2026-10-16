export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Safely initialize Prisma with the Neon PG adapter
const getPrisma = () => {
  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
  if (!globalForPrisma.prisma) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
};

export async function GET() {
  const prisma = getPrisma();

  try {
    const orders = await prisma.ticketOrder.findMany({
      where: { status: "SUCCESS" },
      include: { affiliate: true },
      orderBy: { createdAt: "desc" },
    });

    const affiliates = await prisma.affiliate.findMany({
      orderBy: { commissionKES: "desc" },
    });

    const totalTicketsSold = orders.reduce((sum: number, order: any) => sum + order.quantity, 0);
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.amount, 0);
    const totalCommissionsOwed = affiliates.reduce((sum: number, aff: any) => sum + aff.commissionKES, 0);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalTicketsSold,
          totalRevenue,
          totalCommissionsOwed,
          netRevenue: totalRevenue - totalCommissionsOwed,
        },
        orders,
        affiliates,
      },
    });
  } catch (error) {
    console.error("Dashboard Tickets API Error:", error);
    return NextResponse.json({ error: "Failed to fetch ticket analytics" }, { status: 500 });
  }
}