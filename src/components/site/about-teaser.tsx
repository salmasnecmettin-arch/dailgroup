"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ShieldCheck, Users } from "lucide-react";
import { CoverMedia } from "./cover-media";

const points = [
  { icon: ShieldCheck, label: "Kaliteli Hizmet" },
  { icon: BadgeCheck, label: "Güvenilir Marka" },
  { icon: Users, label: "Müşteri Memnuniyeti" },
];

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.25em]">
            <span className="text-dail-red-500">DAİL</span>{" "}
            <span className="text-dail-navy-500">GRUP</span>
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-dail-navy-900 sm:text-4xl lg:text-5xl">
            Yılların Tecrübesi,
            <br />
            Güvenin Adresi
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dail-navy-900/60">
            Sektördeki tecrübemiz, güçlü iş ortaklıklarımız ve kaliteli hizmet
            anlayışımız ile müşterilerimize en iyi çözümleri sunuyoruz.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {points.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-dail-red-500" />
                <span className="text-sm font-medium text-dail-navy-900">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/hakkimizda"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-dail-navy-900 px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Hakkımızda
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-4"
        >
          <CoverMedia
            src="/images/et-urunleri/et-urunleri-sucuk-ahsap-tabak-01.jpg"
            alt="Gıda ürünleri"
            className="col-span-2 h-56 rounded-3xl sm:h-64"
            imageClassName="transition-transform duration-700 hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <CoverMedia
            src="/images/tavuk/tavuk-pilic-doner-01.jpg"
            alt="Tavuk ürünleri"
            className="h-44 rounded-3xl sm:h-56"
            imageClassName="transition-transform duration-700 hover:scale-105"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
          <CoverMedia
            src=""
            alt="İnşaat hizmetleri"
            className="h-44 rounded-3xl sm:h-56"
            imageClassName="transition-transform duration-700 hover:scale-105"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
