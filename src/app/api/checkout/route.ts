import { NextResponse } from "next/server";
import type { CheckoutRequest } from "@/lib/shop/types";

/**
 * Placeholder checkout endpoint for future Mollie integration.
 * Wire MOLLIE_API_KEY and Supabase order storage in phase 2.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutRequest;

  if (!body.items?.length || !body.customerEmail) {
    return NextResponse.json(
      { error: "items and customerEmail are required" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      error: "Checkout is not enabled yet. Configure Mollie in phase 2.",
    },
    { status: 501 }
  );
}
