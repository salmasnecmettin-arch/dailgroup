import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { getAboutContent } from "@/lib/data";
import { AboutForm } from "@/components/admin/about-form";

export default async function AdminAboutPage() {
  const about = await getAboutContent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hakkımızda</h1>
        <p className="text-sm text-muted-foreground">
          Hakkımızda sayfasındaki metinleri buradan güncelleyin.
        </p>
      </div>

      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      <div className="max-w-2xl rounded-2xl border bg-card p-6">
        <AboutForm about={about} disabled={!isSupabaseConfigured} />
      </div>
    </div>
  );
}
