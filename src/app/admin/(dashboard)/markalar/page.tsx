import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { getBrands } from "@/lib/data";
import { BrandDialog } from "@/components/admin/brand-dialog";
import { BrandsTable } from "@/components/admin/brands-table";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bayilikler & Hizmetler</h1>
          <p className="text-sm text-muted-foreground">
            Her bayilik otomatik olarak kendi /hizmetler/[slug] sayfasını oluşturur.
          </p>
        </div>
        <BrandDialog disabled={!isSupabaseConfigured} />
      </div>

      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      <div className="rounded-2xl border bg-card">
        <BrandsTable brands={brands} disabled={!isSupabaseConfigured} />
      </div>
    </div>
  );
}
