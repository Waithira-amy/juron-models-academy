import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { ticketCode, phone, recipientName, inviteCode } = await req.json();

    if (!ticketCode || !phone || !recipientName || !inviteCode) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Ticket code, recipient name, phone number, and invite code are required.",
        },
        { status: 400 }
      );
    }

    const validCode = (
      process.env.OMNI_INVITE_CODE || "JMA-OMNI-2026"
    ).trim();

    if (String(inviteCode).trim() !== validCode) {
      return NextResponse.json(
        { success: false, error: "Invalid partner invite code." },
        { status: 401 }
      );
    }

    let formattedPhone = String(phone).replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }

    const cleanTicketCode = String(ticketCode).trim().toUpperCase();
    const cleanRecipientName = String(recipientName).trim();

    await prisma.ticketOrder.create({
      data: {
        checkoutRequestId: cleanTicketCode,
        phoneNumber: formattedPhone,
        amount: 0,
        ticketType: `Omni Ticket (${cleanRecipientName})`,
        quantity: 1,
        status: "PAID",
        source: "COMPLIMENTARY",
        affiliateCode: null,
      },
    });

    return NextResponse.json({
      success: true,
      ticketCode: cleanTicketCode,
      recipientName: cleanRecipientName,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to generate ticket.";
    console.error("Omni Ticket Error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}