import { requireEnv } from "@/lib/server/env";

type SupabaseRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  prefer?: string;
};

export async function supabaseRequest<T>(
  path: string,
  options: SupabaseRequestOptions = {}
): Promise<T> {
  const url = `${requireEnv("SUPABASE_URL").replace(/\/$/, "")}/rest/v1/${path}`;
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${text}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function eq(value: string) {
  return `eq.${encodeURIComponent(value)}`;
}
