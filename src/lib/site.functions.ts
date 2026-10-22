import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type MediaRow = Database["public"]["Tables"]["media_items"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];

export const getPublicSite = createServerFn({ method: "GET" })
  .inputValidator((d: { preview?: boolean }) => ({ preview: !!d?.preview }))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const [s, m, t] = await Promise.all([
      sb.from("site_settings").select("data, draft").eq("id", 1).maybeSingle(),
      sb.from("media_items").select("*").eq("active", true).order("sort_order"),
      sb.from("testimonials").select("*").eq("active", true).order("sort_order"),
    ]);
    const content = (data.preview ? s.data?.draft : s.data?.data) ?? {};
    return {
      contentJson: JSON.stringify(content),
      media: (m.data ?? []) as MediaRow[],
      testimonials: (t.data ?? []) as TestimonialRow[],
    };
  });
