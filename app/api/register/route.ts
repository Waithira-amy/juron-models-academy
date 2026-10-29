import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('photo') as File | null;
    const name = formData.get('name') as string;
    const age = formData.get('age') as string;
    const location = formData.get('location') as string;
    const contact = formData.get('contact') as string;

    let photoUrl = "https://placehold.co/400x400?text=No+Photo";

    // Only upload to Vercel Blob if a file was attached
    if (file && file.size > 0) {
      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const blob = await put(filename, file, {
        access: 'public',
      });
      photoUrl = blob.url;
    }

    const registration = await prisma.registration.create({
      data: {
        fullName: name,
        age: parseInt(age) || 18,
        phone: contact,
        location: location || "Unspecified",
        photoUrl: photoUrl, 
      }
    });

    return NextResponse.json({ success: true, registration });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'Server error during registration.' }, { status: 500 });
  }
}