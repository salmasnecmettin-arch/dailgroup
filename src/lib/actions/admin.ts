"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/status";

type ActionResult = { ok: true } | { ok: false; error: string };

const NOT_CONFIGURED: ActionResult = {
  ok: false,
  error:
    "Supabase bağlı değil. Önce .env.local dosyasını ve supabase/schema.sql'i kurun.",
};

export async function updateHeroContent(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();

  const { error } = await supabase
    .from("hero_content")
    .update({
      eyebrow: String(formData.get("eyebrow") ?? ""),
      title: String(formData.get("title") ?? ""),
      highlight: String(formData.get("highlight") ?? ""),
      description: String(formData.get("description") ?? ""),
      background_image: String(formData.get("background_image") ?? ""),
      primary_cta_label: String(formData.get("primary_cta_label") ?? ""),
      primary_cta_href: String(formData.get("primary_cta_href") ?? ""),
      secondary_cta_label: String(formData.get("secondary_cta_label") ?? ""),
      secondary_cta_href: String(formData.get("secondary_cta_href") ?? ""),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/anasayfa");
  return { ok: true };
}

export async function updateAboutContent(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();

  const { error } = await supabase
    .from("about_content")
    .update({
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      mission: String(formData.get("mission") ?? ""),
      vision: String(formData.get("vision") ?? ""),
      management_message: String(formData.get("management_message") ?? ""),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/hakkimizda");
  revalidatePath("/admin/hakkimizda");
  return { ok: true };
}

export async function updateContactInfo(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_info")
    .update({
      address: String(formData.get("address") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      email: String(formData.get("email") ?? ""),
      map_embed_url: String(formData.get("map_embed_url") ?? ""),
      working_hours: String(formData.get("working_hours") ?? ""),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/iletisim");
  return { ok: true };
}

export async function upsertBrand(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();

  const originalSlug = String(formData.get("original_slug") ?? "");

  let gallery: string[] = [];
  try {
    const parsed = JSON.parse(String(formData.get("gallery") ?? "[]"));
    if (Array.isArray(parsed)) gallery = parsed.filter((v) => typeof v === "string");
  } catch {
    gallery = [];
  }

  const payload = {
    slug: String(formData.get("slug") ?? ""),
    name: String(formData.get("name") ?? ""),
    short_name: String(formData.get("short_name") ?? ""),
    category: String(formData.get("category") ?? "gida"),
    tagline: String(formData.get("tagline") ?? ""),
    description: String(formData.get("description") ?? ""),
    about: String(formData.get("about") ?? ""),
    color: String(formData.get("color") ?? "#2b2e83"),
    logo_url: String(formData.get("logo_url") ?? ""),
    cover_url: String(formData.get("cover_url") ?? ""),
    gallery,
    order_index: Number(formData.get("order_index") ?? 0),
    active: formData.get("active") === "on",
    updated_at: new Date().toISOString(),
  };

  const { error } = originalSlug
    ? await supabase.from("brands").update(payload).eq("slug", originalSlug)
    : await supabase.from("brands").insert(payload);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/hizmetlerimiz");
  revalidatePath("/hizmetler/[slug]", "page");
  revalidatePath("/admin/markalar");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteBrand(slug: string): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();
  const { error } = await supabase.from("brands").delete().eq("slug", slug);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/hizmetlerimiz");
  revalidatePath("/admin/markalar");
  revalidatePath("/");
  return { ok: true };
}

export async function updateSubmissionStatus(
  id: string,
  status: "yeni" | "okundu" | "iletisime_gecildi" | "arsivlendi",
): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();
  const { error } = await supabase
    .from("form_submissions")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/formlar");
  return { ok: true };
}

export async function deleteSubmission(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const supabase = await createClient();
  const { error } = await supabase.from("form_submissions").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/formlar");
  return { ok: true };
}
