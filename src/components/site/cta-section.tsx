"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="relative overflow-hidden bg-dail-navy-900 py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-dail-red-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-dail-navy-500/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8"
      >
        <div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Bizimle Çalışmak İster misiniz?
          </h2>
          <p className="mt-3 max-w-lg text-white/60">
            Detaylı bilgi almak için bizimle iletişime geçin.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-2 rounded-full bg-dail-red-500 px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-dail-red-600"
          >
            İletişime Geçin
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
