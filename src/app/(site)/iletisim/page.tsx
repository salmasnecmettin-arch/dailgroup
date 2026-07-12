import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { InquiryForm } from "@/components/site/inquiry-form";
import { getBrands, getContactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "İletişim | DAİL GRUP",
  description: "DAİL GRUP ile iletişime geçin — adres, telefon, WhatsApp ve iletişim formu.",
};

export default async function ContactPage() {
  const [contactInfo, brands] = await Promise.all([getContactInfo(), getBrands()]);

  const infoItems = [
    { icon: MapPin, label: "Adres", value: contactInfo.address },
    { icon: Phone, label: "Telefon", value: contactInfo.phone },
    { icon: Mail, label: "E-posta", value: contactInfo.email },
    { icon: Clock, label: "Çalışma Saatleri", value: contactInfo.workingHours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="BİZİMLE İLETİŞİME GEÇİN"
        title="İletişim"
        description="Sorularınız ve talepleriniz için bize ulaşın, en kısa sürede dönüş yapalım."
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }]}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 rounded-2xl bg-dail-navy-50 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dail-red-500/10 text-dail-red-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-dail-navy-900/40">
                      {label}
                    </p>
                    <p className="mt-0.5 font-medium text-dail-navy-900">{value}</p>
                  </div>
                </div>
              ))}

              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                WhatsApp ile Yazın
              </a>
            </div>

            <div className="mt-8 h-72 overflow-hidden rounded-2xl">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DAİL GRUP konum"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_-25px_rgba(10,11,36,0.25)] ring-1 ring-dail-navy-900/5 lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-dail-navy-900">
              İletişim Formu
            </h2>
            <p className="mt-2 text-sm text-dail-navy-900/60">
              Formu doldurun, ekibimiz en kısa sürede size dönüş yapsın.
            </p>
            <div className="mt-8">
              <InquiryForm type="iletisim" brands={brands} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
