import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Fetch all successful ticket orders with affiliate data
    const orders = await prisma.ticketOrder.findMany({
      where: { status: "SUCCESS" },
      include: { affiliate: true }, // Joins the affiliate table to get their names
      orderBy: { createdAt: "desc" },
    });

    // 2. Fetch all affiliates and their total commissions
    const affiliates = await prisma.affiliate.findMany({
      orderBy: { commissionKES: "desc" },
    });

    // 3. Calculate quick summary stats for the dashboard cards
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