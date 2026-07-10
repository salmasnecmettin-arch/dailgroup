import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { getHeroContent } from "@/lib/data";
import { HeroForm } from "@/components/admin/hero-form";

export default async function AdminHomePage() {
  const hero = await getHeroContent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Anasayfa Yönetimi</h1>
        <p className="text-sm text-muted-foreground">
          Hero alanı başlık, açıklama, arkaplan görseli ve CTA butonlarını düzenleyin.
        </p>
      </div>

      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      <div className="max-w-2xl rounded-2xl border bg-card p-6">
        <HeroForm hero={hero} disabled={!isSupabaseConfigured} />
      </div>
    </div>
  );
}
