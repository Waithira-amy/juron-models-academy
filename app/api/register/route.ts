import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Initialize the Prisma Client with the pg adapter
const connectionString = `${process.env.POSTGRES_PRISMA_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    // 1. Receive the form data from the frontend
    const formData = await request.formData();
    const file = formData.get('photo') as File;
    const name = formData.get('name') as string;
    const age = formData.get('age') as string;
    const location = formData.get('location') as string;
    const contact = formData.get('contact') as string;

    if (!file) {
      return NextResponse.json({ error: 'Photo is required.' }, { status: 400 });
    }

    // 2. Upload the photo securely to Vercel Blob
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const blob = await put(filename, file, {
      access: 'public',
    });

    // 3. Save the applicant's text details + their new photo URL to Neon Database
    const registration = await prisma.registration.create({
      data: {
        fullName: name,
        age: parseInt(age),
        phone: contact,
        location: location,
        photoUrl: blob.url, 
      }
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'Server error during registration.' }, { status: 500 });
  }
}