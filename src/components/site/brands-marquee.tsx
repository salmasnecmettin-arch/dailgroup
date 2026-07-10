import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/types";

export function BrandsMarquee({ brands }: { brands: Brand[] }) {
  const active = brands.filter((b) => b.active && b.category !== "insaat");
  const loop = [...active, ...active];

  return (
    <section className="relative -mt-16 z-20 lg:-mt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-dail-navy-900/5 bg-white/95 py-8 shadow-[0_20px_60px_-15px_rgba(10,11,36,0.25)] backdrop-blur">
          <div className="group flex w-max animate-[marquee_32s_linear_infinite] gap-12 px-8 hover:[animation-play-state:paused]">
            {loop.map((brand, i) =>
              brand.logo ? (
                <Link
                  key={`${brand.slug}-${i}`}
                  href={`/hizmetler/${brand.slug}`}
                  className="relative flex h-10 w-28 shrink-0 items-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-12 sm:w-32"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="140px"
                  />
                </Link>
              ) : (
                <Link
                  key={`${brand.slug}-${i}`}
                  href={`/hizmetler/${brand.slug}`}
                  className="flex shrink-0 items-center"
                >
                  <span
                    className="font-display text-xl font-bold tracking-tight opacity-70 transition-opacity hover:opacity-100 sm:text-2xl"
                    style={{ color: brand.color }}
                  >
                    {brand.shortName}
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
