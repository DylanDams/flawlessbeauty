import { NextResponse } from "next/server";

import { assertAdminRequest } from "@/lib/server/adminAuth";
import { findGiftCardForAdmin, redeemGiftCard } from "@/lib/shop/orders";

export async function GET(request: Request) {
  try {
    assertAdminRequest(request);
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    const results = await findGiftCardForAdmin(query);

    return NextResponse.json({ results });
  } catch (error) {
    return handleAdminError(error);
  }
}

export async function POST(request: Request) {
  try {
    assertAdminRequest(request);
    const body = (await request.json()) as {
      action?: string;
      giftCardId?: string;
      amountCents?: number;
      staffNote?: string;
    };

    if (body.action !== "redeem") {
      return NextResponse.json({ error: "Onbekende actie." }, { status: 400 });
    }

    if (!body.giftCardId || !body.amountCents || body.amountCents <= 0) {
      return NextResponse.json(
        { error: "Cadeaukaart en bedrag zijn verplicht." },
        { status: 400 }
      );
    }

    const giftCard = await redeemGiftCard({
      giftCardId: body.giftCardId,
      amountCents: body.amountCents,
      staffNote: body.staffNote,
    });

    return NextResponse.json({ giftCard });
  } catch (error) {
    return handleAdminError(error);
  }
}

function handleAdminError(error: unknown) {
  if (error instanceof Response) {
    return error;
  }

  console.error("Admin giftcard API failed", error);
  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "Cadeaukaart beheren is niet gelukt.",
    },
    { status: 500 }
  );
}
