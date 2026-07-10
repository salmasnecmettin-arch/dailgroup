import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { InquiryForm } from "@/components/site/inquiry-form";
import { getBrands } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fiyat Bilgi Formu | DAIL GROUP",
  description: "Ürün ve hizmetlerimiz hakkında fiyat bilgisi almak için formu doldurun.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ hizmet?: string }>;
}) {
  const [{ hizmet }, brands] = await Promise.all([searchParams, getBrands()]);

  return (
    <>
      <PageHeader
        eyebrow="FİYAT BİLGİ FORMU"
        title="Teklif Alın"
        description="Ürünlerimiz hakkında fiyat bilgisi almak için formu doldurun, size dönüş yapalım."
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Fiyat Bilgi Formu" }]}
      />

      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_-25px_rgba(10,11,36,0.25)] ring-1 ring-dail-navy-900/5 sm:p-10">
          <InquiryForm type="teklif" brands={brands} defaultServiceSlug={hizmet} />
        </div>
      </section>
    </>
  );
}
