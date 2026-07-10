"use client";

import { motion } from "framer-motion";
import { Award, Star, Users, Headphones, type LucideIcon } from "lucide-react";
import type { StatItem } from "@/lib/types";

const icons: Record<string, LucideIcon> = { Award, Star, Users, Headphones };

export function StatsBar({ stats }: { stats: StatItem[] }) {
  return (
    <section className="bg-dail-navy-950 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => {
          const Icon = icons[stat.icon] ?? Award;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-center lg:gap-4 lg:text-left"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-dail-red-500">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
