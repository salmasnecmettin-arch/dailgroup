"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured as supabaseConfigured } from "@/lib/supabase/status";
import { inquirySchema, type InquiryInput } from "@/lib/validation/inquiry";

export async function submitInquiry(input: InquiryInput) {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const data = parsed.data;

  if (!supabaseConfigured) {
    // Local preview mode — no Supabase project connected yet.
    console.log("[inquiry:preview-only]", data);
    return { ok: true as const };
  }

  const supabase = await createClient();
  const headerList = await headers();

  const { error } = await supabase.from("form_submissions").insert({
    type: data.type === "teklif" ? "teklif" : "iletisim",
    name: data.name,
    company: data.company || null,
    phone: data.phone,
    email: data.email || null,
    service_slug: data.serviceSlug || null,
    message: data.message,
    kvkk_consent: data.kvkkConsent,
    ip: headerList.get("x-forwarded-for"),
    user_agent: headerList.get("user-agent"),
  });

  if (error) {
    console.error("submitInquiry error", error);
    return { ok: false as const, error: "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin." };
  }

  return { ok: true as const };
}
