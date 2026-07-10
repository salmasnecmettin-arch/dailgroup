import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CoverMedia } from "./cover-media";

export function PageHeader({
  eyebrow,
  title,
  description,
  cover,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  cover?: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[380px] w-full items-end overflow-hidden bg-dail-navy-950 pb-14 pt-32">
      <CoverMedia
        src={cover ?? ""}
        alt={title}
        className="absolute inset-0"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dail-navy-950 via-dail-navy-950/75 to-dail-navy-950/40" />

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-5 text-xs font-semibold tracking-[0.25em] text-dail-red-400">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-white/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
