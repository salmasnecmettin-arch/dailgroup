import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { getSubmissions } from "@/lib/admin-data";
import { SubmissionsTable } from "@/components/admin/submissions-table";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Form Kayıtları</h1>
        <p className="text-sm text-muted-foreground">
          Fiyat Bilgi Formu ve İletişim Formu üzerinden gelen tüm talepler.
        </p>
      </div>

      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      <div className="overflow-x-auto rounded-2xl border bg-card">
        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  );
}
