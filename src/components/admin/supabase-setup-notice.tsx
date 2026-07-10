import { AlertTriangle } from "lucide-react";

export function SupabaseSetupNotice() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-dail-red-500/30 bg-dail-red-500/5 p-6">
      <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-dail-red-500" />
      <div className="text-sm">
        <p className="font-semibold text-dail-navy-900">
          Supabase henüz bağlı değil
        </p>
        <p className="mt-1.5 max-w-2xl leading-relaxed text-dail-navy-900/60">
          Bu panel bir Supabase projesine ihtiyaç duyar. <code>.env.local</code>{" "}
          dosyasına <code>NEXT_PUBLIC_SUPABASE_URL</code> ve{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> değerlerini ekleyin, ardından{" "}
          <code>supabase/schema.sql</code> ve <code>supabase/seed.sql</code>{" "}
          dosyalarını Supabase SQL Editor&apos;de çalıştırın. Site bu ana kadar
          statik içerikle (src/lib/content.ts) çalışmaya devam eder.
        </p>
      </div>
    </div>
  );
}
