import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import { getContactInfo } from "@/lib/data";
import { ContactForm } from "@/components/admin/contact-form";

export default async function AdminContactPage() {
  const contact = await getContactInfo();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">İletişim Bilgileri</h1>
        <p className="text-sm text-muted-foreground">
          Adres, telefon, WhatsApp ve harita bilgilerini buradan güncelleyin.
        </p>
      </div>

      {!isSupabaseConfigured && <SupabaseSetupNotice />}

      <div className="max-w-2xl rounded-2xl border bg-card p-6">
        <ContactForm contact={contact} disabled={!isSupabaseConfigured} />
      </div>
    </div>
  );
}
