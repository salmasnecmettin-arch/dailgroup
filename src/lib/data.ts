import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured as supabaseConfigured } from "@/lib/supabase/status";
import * as fallback from "@/lib/content";
import type { AboutContent, Brand, CategoryInfo } from "@/lib/types";

/**
 * Data access layer used by every public page.
 *
 * Until a Supabase project is connected (env vars unset), every getter
 * falls back to the static content in `lib/content.ts` so local development
 * and the initial preview work with zero backend setup. Once
 * NEXT_PUBLIC_SUPABASE_URL / ANON_KEY are set and `supabase/schema.sql` +
 * `seed.sql` have been run, the same functions transparently start reading
 * from the database — no component changes required.
 */

export async function getHeroContent() {
  if (!supabaseConfigured) return fallback.heroContent;
  const supabase = await createClient();
  const { data } = await supabase.from("hero_content").select("*").eq("id", 1).single();
  if (!data) return fallback.heroContent;
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    highlight: data.highlight,
    description: data.description,
    backgroundImage: data.background_image,
    primaryCta: { label: data.primary_cta_label, href: data.primary_cta_href },
    secondaryCta: { label: data.secondary_cta_label, href: data.secondary_cta_href },
  };
}

export async function getCategories(): Promise<CategoryInfo[]> {
  if (!supabaseConfigured) return fallback.categories;
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("order_index");
  if (!data || data.length === 0) return fallback.categories;
  return data.map((c) => ({
    key: c.key,
    title: c.title,
    shortDescription: c.short_description,
    cover: c.cover_url,
    icon: c.icon,
  }));
}

function mapBrandRow(b: Record<string, unknown>): Brand {
  return {
    slug: b.slug as string,
    name: b.name as string,
    shortName: b.short_name as string,
    category: b.category as Brand["category"],
    tagline: b.tagline as string,
    description: b.description as string,
    about: (b.about as string) ?? "",
    color: b.color as string,
    website: (b.website as string) ?? undefined,
    logo: (b.logo_url as string) ?? "",
    cover: b.cover_url as string,
    gallery: (b.gallery as string[]) ?? [],
    order: b.order_index as number,
    active: b.active as boolean,
  };
}

export async function getBrands(): Promise<Brand[]> {
  if (!supabaseConfigured) return fallback.brands;
  const supabase = await createClient();
  const { data } = await supabase
    .from("brands")
    .select("*")
    .eq("active", true)
    .order("order_index");
  if (!data || data.length === 0) return fallback.brands;
  return data.map(mapBrandRow);
}

export async function getBrandsByCategory(category: Brand["category"]) {
  const all = await getBrands();
  return all.filter((b) => b.category === category);
}

export async function getBrandBySlug(slug: string) {
  if (!supabaseConfigured) return fallback.getBrandBySlug(slug);
  const supabase = await createClient();
  const { data } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return fallback.getBrandBySlug(slug);
  return mapBrandRow(data);
}

export async function getAboutContent(): Promise<AboutContent> {
  if (!supabaseConfigured) return fallback.aboutContent;
  const supabase = await createClient();
  const { data } = await supabase.from("about_content").select("*").eq("id", 1).single();
  if (!data) return fallback.aboutContent;
  return {
    title: data.title,
    description: data.description,
    mission: data.mission,
    vision: data.vision,
    values: data.values as AboutContent["values"],
    timeline: data.timeline as AboutContent["timeline"],
    managementMessage: data.management_message,
  };
}

export async function getContactInfo() {
  if (!supabaseConfigured) return fallback.contactInfo;
  const supabase = await createClient();
  const { data } = await supabase.from("contact_info").select("*").eq("id", 1).single();
  if (!data) return fallback.contactInfo;
  return {
    address: data.address,
    phone: data.phone,
    whatsapp: data.whatsapp,
    email: data.email,
    mapEmbedUrl: data.map_embed_url,
    workingHours: data.working_hours,
    social: data.social ?? {},
    footerImage: data.footer_image ?? "",
  };
}

export async function getStats() {
  if (!supabaseConfigured) return fallback.stats;
  const supabase = await createClient();
  const { data } = await supabase.from("stats").select("*").order("order_index");
  if (!data || data.length === 0) return fallback.stats;
  return data.map((s) => ({ label: s.label, value: s.value, icon: s.icon }));
}
