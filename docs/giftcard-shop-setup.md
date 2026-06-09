# Giftcard Shop Setup

This shop is built to run on a Vercel preview URL first. Do not point
`flawlessbeauty.nl` to Vercel until the full flow is tested and approved.

## Required Services

- Vercel project for the Next.js app
- Supabase project with `supabase/schema.sql` applied
- Mollie account in test mode first
- Resend account with a verified sender/domain

## Environment Variables

Use `.env.example` as the source of truth:

- `NEXT_PUBLIC_SITE_URL`: Vercel preview URL or later production URL
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MOLLIE_API_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SALON_NOTIFICATION_EMAIL`
- `ADMIN_GIFTCARD_SECRET`

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Keep the service role key only in Vercel environment variables.

## Mollie Setup

1. Use a `test_` API key during preview testing.
2. Checkout creation happens at `/api/checkout`.
3. Mollie webhook URL is `${NEXT_PUBLIC_SITE_URL}/api/webhooks/mollie`.
4. Success URL is `/shop/success`.
5. Cancel URL is `/shop/cancel`.

## Resend Setup

1. Verify a sender or domain in Resend.
2. Prefer `cadeaukaart@flawlessbeauty.nl` or a mail subdomain.
3. Add SPF/DKIM/DMARC records as shown by Resend.
4. Set `RESEND_FROM_EMAIL` in Vercel.

## Admin Verification

Admin page:

```text
/admin/giftcards
```

The salon can:

- Search by full code, last 4 code characters, e-mail, or order ID.
- See value, remaining balance, status, buyer, and recipient.
- Redeem part or all of the remaining balance.

## Test Checklist

1. Deploy a Vercel preview without changing `flawlessbeauty.nl`.
2. Add all environment variables to Vercel.
3. Run the Supabase schema.
4. Place a gift card order with Mollie test mode.
5. Confirm the Mollie redirect reaches `/shop/success`.
6. Confirm Mollie webhook creates exactly one gift card.
7. Confirm Resend sends the branded e-mail.
8. Search the code at `/admin/giftcards`.
9. Redeem a partial amount and verify remaining balance changes.
10. Redeem the rest and verify status becomes `redeemed`.
11. Test a cancelled payment and verify no gift card is issued.
12. Test a webhook retry and verify no duplicate gift card is issued.
