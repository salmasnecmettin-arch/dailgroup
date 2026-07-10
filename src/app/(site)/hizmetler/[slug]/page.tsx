import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { CoverMedia } from "@/components/site/cover-media";
import { brands as staticBrands } from "@/lib/content";
import { getBrandBySlug, getCategories, getContactInfo } from "@/lib/data";

export function generateStaticParams() {
  return staticBrands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: `${brand.name} | DAIL GROUP`,
    description: brand.description,
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [brand, categories, contactInfo] = await Promise.all([
    getBrandBySlug(slug),
    getCategories(),
    getContactInfo(),
  ]);
  if (!brand) notFound();

  const categoryInfo = categories.find((c) => c.key === brand.category);

  return (
    <>
      <PageHeader
        eyebrow={categoryInfo?.title ?? ""}
        title={brand.name}
        description={brand.tagline}
        cover={brand.cover}
        crumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
          { label: brand.shortName },
        ]}
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <p className="text-lg leading-relaxed text-dail-navy-900/70">
          {brand.description}
        </p>

        {brand.about && (
          <div className="mt-10 rounded-3xl bg-dail-navy-50 p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-dail-red-500">
              BİLGİLENDİRME
            </p>
            <p className="mt-3 leading-relaxed text-dail-navy-900/70">
              {brand.about}
            </p>
          </div>
        )}

        {brand.gallery.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {brand.gallery.map((img) => (
              <div key={img} className="relative h-48 overflow-hidden rounded-2xl">
                <CoverMedia
                  src={img}
                  alt={brand.name}
                  className="absolute inset-0 h-full w-full"
                  sizes="(min-width: 640px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col items-start gap-6 rounded-3xl bg-dail-navy-950 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {brand.name} hakkında bilgi almak ister misiniz?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Fiyat teklifi ve ürün detayları için bizimle iletişime geçin.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={`/teklif-al?hizmet=${brand.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-dail-red-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Fiyat Bilgi Formu <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
