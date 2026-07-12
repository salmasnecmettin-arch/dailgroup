"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/lib/types";
import { HeroIllustration } from "./hero-illustration";

export function Hero({ heroContent }: { heroContent: HeroContent }) {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-dail-navy-950">
      {heroContent.backgroundImage ? (
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroContent.backgroundImage}
            alt="DAİL GRUP"
            fill
            priority
            unoptimized={heroContent.backgroundImage.startsWith("http")}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      ) : (
        <HeroIllustration />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-dail-navy-950 via-dail-navy-950/70 to-dail-navy-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-dail-navy-950/80 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-24 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs font-semibold tracking-[0.25em] text-dail-red-400 sm:text-sm"
        >
          {heroContent.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-display mt-4 text-5xl font-extrabold leading-[0.95] text-white sm:text-7xl lg:text-8xl"
        >
          {heroContent.title}
          <span className="text-dail-red-500">{heroContent.highlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {heroContent.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href={heroContent.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-dail-red-500 px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-dail-red-600"
          >
            {heroContent.primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {heroContent.secondaryCta.label}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:flex"
      >
        <span className="text-[11px] tracking-[0.2em]">AŞAĞI KAYDIRIN</span>
        <span className="h-10 w-[1px] animate-pulse bg-white/40" />
      </motion.div>
    </section>
  );
}
