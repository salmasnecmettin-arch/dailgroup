import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { CoverMedia } from "@/components/site/cover-media";
import { getBrands, getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | DAİL GRUP",
  description:
    "DAİL GRUP gıda, içecek ve inşaat hizmetleri kapsamındaki tüm bayilikler ve hizmet detayları.",
};

export default async function ServicesPage() {
  const [categories, brands] = await Promise.all([
    getCategories(),
    getBrands(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="NELER SUNUYORUZ"
        title="Hizmetlerimiz"
        description="Gıda, içecek ve inşaat sektörlerindeki tüm bayiliklerimiz ve hizmet detaylarımız."
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hizmetlerimiz" }]}
      />

      <div id="markalar" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {categories.map((cat) => {
          const catBrands = brands
            .filter((b) => b.category === cat.key)
            .sort((a, b) => a.order - b.order);
          return (
            <section key={cat.key} id={cat.key} className="scroll-mt-28 pb-20 last:pb-0">
              <div className="flex items-end justify-between gap-4 border-b border-dail-navy-900/10 pb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-dail-navy-900 sm:text-3xl">
                    {cat.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-dail-navy-900/60">
                    {cat.shortDescription}
                  </p>
                </div>
              </div>

              {catBrands.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {catBrands.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/hizmetler/${brand.slug}`}
                      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-dail-navy-900/5 transition-shadow hover:shadow-xl"
                    >
                      <CoverMedia
                        src={brand.cover}
                        alt={brand.name}
                        className="h-52 w-full"
                        imageClassName="transition-transform duration-700 group-hover:scale-110"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div className="p-6">
                        <h3 className="font-display text-lg font-bold text-dail-navy-900">
                          {brand.name}
                        </h3>
                        <p className="mt-1 text-sm text-dail-navy-900/60">
                          {brand.tagline}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-dail-red-500">
                          Detaylı Bilgi
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href="/hizmetler/insaat-hizmetleri"
                  className="group mt-8 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-dail-navy-950 p-10 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      İnşaat Hizmetleri
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-white/60">
                      Konut ve ticari projelerde proje yönetiminden uygulamaya
                      uçtan uca inşaat ve taahhüt hizmetleri.
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-dail-red-500 px-6 py-3 text-sm font-semibold text-white transition-transform group-hover:scale-[1.03]">
                    Detaylı Bilgi <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
