import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { contestantId, amount, currency = 'usd', preferredCard } = await req.json();

    // Fallback to request origin if NEXT_PUBLIC_BASE_URL is not set
    const origin = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: { name: `Contestant Votes (${contestantId})` },
            unit_amount: amount * 100, // Stripe expects smallest currency unit (cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/voting?success=true`,
      cancel_url: `${origin}/voting?canceled=true`,
      metadata: {
        nomineeId: contestantId,
        amountPaid: amount.toString(),
        currency: currency.toUpperCase(),
        cardType: preferredCard || 'unknown'
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}