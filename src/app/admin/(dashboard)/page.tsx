import { Inbox, MailWarning, Tag, Clock } from "lucide-react";
import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { getDashboardStats } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Toplam Form", value: stats.totalSubmissions, icon: Inbox },
    { label: "Yeni Talepler", value: stats.newSubmissions, icon: MailWarning },
    { label: "Toplam Bayilik / Hizmet", value: stats.totalBrands, icon: Tag },
    {
      label: "Son Güncelleme",
      value: stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString("tr-TR") : "—",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">DAİL GRUP yönetim paneline hoş geldiniz.</p>
      </div>

      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="h-4 w-4 text-dail-red-500" />
            </div>
            <p className="mt-3 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
        <p>
          Ziyaretçi analitiği, bildirimler, çoklu dil ve blog modülü gibi ek
          özellikler bu panelin ilerleyen fazlarında eklenecektir. Şu an
          içerik yönetimi (Anasayfa, Bayilikler, Hakkımızda, İletişim) ve form
          kayıtları aktiftir.
        </p>
      </div>
    </div>
  );
}
