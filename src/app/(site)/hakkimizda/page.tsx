import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { getAboutContent, getStats } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | DAIL GROUP",
  description:
    "DAIL GROUP; gıda, içecek ve inşaat sektörlerinde 15 yılı aşkın tecrübesiyle güvenilir bir iş ortağıdır.",
};

export default async function AboutPage() {
  const [aboutContent, stats] = await Promise.all([
    getAboutContent(),
    getStats(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="DAILGROUP"
        title="Hakkımızda"
        description={aboutContent.title}
        crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Hakkımızda" }]}
      />

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="text-lg leading-relaxed text-dail-navy-900/70">
          {aboutContent.description}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-dail-navy-50 p-8">
            <h2 className="font-display text-xl font-bold text-dail-navy-900">
              Misyonumuz
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-dail-navy-900/70">
              {aboutContent.mission}
            </p>
          </div>
          <div className="rounded-3xl bg-dail-navy-50 p-8">
            <h2 className="font-display text-xl font-bold text-dail-navy-900">
              Vizyonumuz
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-dail-navy-900/70">
              {aboutContent.vision}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-dail-navy-900">
            Değerlerimiz
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {aboutContent.values.map((v) => (
              <div key={v.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-dail-red-500" />
                <div>
                  <h3 className="font-semibold text-dail-navy-900">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm text-dail-navy-900/60">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-dail-navy-900">
            Yolculuğumuz
          </h2>
          <div className="mt-8 space-y-8 border-l border-dail-navy-900/10 pl-8">
            {aboutContent.timeline.map((t) => (
              <div key={t.title} className="relative">
                <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-dail-red-500" />
                <p className="text-xs font-semibold tracking-wide text-dail-red-500">
                  {t.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-dail-navy-900">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm text-dail-navy-900/60">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-dail-navy-900 p-10 text-white">
          <p className="text-xs font-semibold tracking-[0.25em] text-dail-red-400">
            YÖNETİM MESAJI
          </p>
          <p className="mt-4 text-lg italic leading-relaxed text-white/80">
            &ldquo;{aboutContent.managementMessage}&rdquo;
          </p>
        </div>
      </section>

      <section className="border-t border-dail-navy-900/5 bg-dail-cream py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-dail-red-500">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-dail-navy-900/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
