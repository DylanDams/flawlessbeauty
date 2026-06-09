import { requireEnv } from "@/lib/server/env";

export function assertAdminRequest(request: Request) {
  const expected = requireEnv("ADMIN_GIFTCARD_SECRET");
  const provided = request.headers.get("x-admin-secret");

  if (!provided || provided !== expected) {
    throw new Response("Unauthorized", { status: 401 });
  }
}
