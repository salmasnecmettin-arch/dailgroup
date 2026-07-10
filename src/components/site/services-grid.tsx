"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CategoryInfo } from "@/lib/types";
import { CoverMedia } from "./cover-media";

export function ServicesGrid({ categories }: { categories: CategoryInfo[] }) {
  return (
    <section className="bg-dail-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-dail-red-500">
              HİZMETLERİMİZ
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-dail-navy-900 sm:text-4xl lg:text-5xl">
              Geniş Ürün Yelpazesi,
              <br />
              Profesyonel Hizmet
            </h2>
          </div>
          <Link
            href="/hizmetlerimiz"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-dail-navy-900/15 px-6 py-3 text-sm font-semibold text-dail-navy-900 transition-colors hover:bg-dail-navy-900 hover:text-white"
          >
            Tüm Hizmetlerimiz
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-96 overflow-hidden rounded-3xl"
            >
              <CoverMedia
                src={cat.cover}
                alt={cat.title}
                className="absolute inset-0"
                imageClassName="transition-transform duration-700 group-hover:scale-110"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dail-navy-950 via-dail-navy-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-2xl font-bold text-white">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {cat.shortDescription}
                </p>
                <Link
                  href={`/hizmetlerimiz#${cat.key}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-dail-red-400 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Detaylı Bilgi <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
