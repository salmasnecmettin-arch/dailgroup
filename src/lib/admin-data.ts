import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/status";

export interface Submission {
  id: string;
  type: "teklif" | "iletisim" | "ik";
  name: string;
  company: string | null;
  phone: string;
  email: string | null;
  service_slug: string | null;
  message: string;
  status: "yeni" | "okundu" | "iletisime_gecildi" | "arsivlendi";
  created_at: string;
}

export async function getDashboardStats() {
  if (!isSupabaseConfigured) {
    return { totalSubmissions: 0, newSubmissions: 0, totalBrands: 0, lastUpdated: null as string | null };
  }
  const supabase = await createClient();

  const [{ count: totalSubmissions }, { count: newSubmissions }, { count: totalBrands }] =
    await Promise.all([
      supabase.from("form_submissions").select("*", { count: "exact", head: true }),
      supabase
        .from("form_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "yeni"),
      supabase.from("brands").select("*", { count: "exact", head: true }),
    ]);

  return {
    totalSubmissions: totalSubmissions ?? 0,
    newSubmissions: newSubmissions ?? 0,
    totalBrands: totalBrands ?? 0,
    lastUpdated: new Date().toISOString(),
  };
}

export async function getSubmissions(): Promise<Submission[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return (data as Submission[]) ?? [];
}
