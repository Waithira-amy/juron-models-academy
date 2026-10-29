import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, age, location, contact, photoUrl } = body;

    if (!name || !contact) {
      return NextResponse.json({ error: 'Name and phone number are required.' }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      data: {
        fullName: name,
        age: parseInt(age) || 18,
        phone: contact,
        location: location || "Unspecified",
        photoUrl: photoUrl && photoUrl.trim() !== "" ? photoUrl : "https://placehold.co/400x400?text=No+Photo", 
      }
    });

    return NextResponse.json({ success: true, registration });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'Server error during registration.' }, { status: 500 });
  }
}