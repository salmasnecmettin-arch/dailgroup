"use client";

import { motion } from "framer-motion";

/**
 * Original vector illustration (not a stock photo) representing the scale of
 * a multi-sector distribution business: a city skyline + delivery truck on
 * the road. Sector-neutral by design — no food/beverage/construction imagery
 * — and fully self-contained (no external image asset, no licensing risk).
 */
export function HeroIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* giant watermark monogram */}
      <motion.span
        aria-hidden
        className="font-display absolute -right-[8vw] -top-[12vh] select-none text-[60vw] font-extrabold leading-none text-white/[0.035] sm:text-[42vw]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        D
      </motion.span>

      {/* ambient color blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-dail-red-500/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-0 h-[32rem] w-[32rem] rounded-full bg-dail-navy-500/30 blur-3xl"
      />

      {/* city skyline + road + truck, anchored to the bottom */}
      <svg
        viewBox="0 0 1600 520"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[46%] w-full opacity-90 sm:h-[50%]"
        aria-hidden
      >
        {/* far skyline */}
        <g className="fill-dail-navy-800/70">
          <rect x="0" y="220" width="90" height="300" />
          <rect x="110" y="160" width="70" height="360" />
          <rect x="200" y="240" width="110" height="280" />
          <rect x="330" y="120" width="60" height="400" />
          <rect x="410" y="200" width="90" height="320" />
          <rect x="520" y="150" width="70" height="370" />
          <rect x="610" y="250" width="130" height="270" />
          <rect x="760" y="180" width="80" height="340" />
          <rect x="860" y="230" width="100" height="290" />
          <rect x="980" y="140" width="65" height="380" />
          <rect x="1060" y="210" width="95" height="310" />
          <rect x="1170" y="170" width="75" height="350" />
          <rect x="1260" y="240" width="120" height="280" />
          <rect x="1400" y="190" width="85" height="330" />
          <rect x="1500" y="230" width="100" height="290" />
        </g>
        {/* near skyline, slightly brighter */}
        <g className="fill-dail-navy-700/80">
          <rect x="40" y="320" width="120" height="200" />
          <rect x="190" y="360" width="80" height="160" />
          <rect x="300" y="300" width="140" height="220" />
          <rect x="470" y="350" width="90" height="170" />
          <rect x="590" y="310" width="160" height="210" />
          <rect x="780" y="360" width="100" height="160" />
          <rect x="910" y="330" width="130" height="190" />
          <rect x="1070" y="370" width="90" height="150" />
          <rect x="1190" y="320" width="150" height="200" />
          <rect x="1370" y="360" width="110" height="160" />
          <rect x="1510" y="330" width="90" height="190" />
        </g>
        {/* road */}
        <rect x="0" y="470" width="1600" height="50" className="fill-dail-navy-950" />
        <g className="fill-white/25">
          <rect x="0" y="493" width="70" height="6" />
          <rect x="140" y="493" width="70" height="6" />
          <rect x="280" y="493" width="70" height="6" />
          <rect x="420" y="493" width="70" height="6" />
          <rect x="560" y="493" width="70" height="6" />
          <rect x="700" y="493" width="70" height="6" />
          <rect x="840" y="493" width="70" height="6" />
          <rect x="980" y="493" width="70" height="6" />
          <rect x="1120" y="493" width="70" height="6" />
          <rect x="1260" y="493" width="70" height="6" />
          <rect x="1400" y="493" width="70" height="6" />
          <rect x="1540" y="493" width="70" height="6" />
        </g>
      </svg>

      {/* delivery truck, drives slowly across the road */}
      <motion.svg
        viewBox="0 0 220 100"
        className="absolute h-[9%] w-auto sm:h-[10%]"
        style={{ bottom: "3.5%" }}
        initial={{ x: "-15vw" }}
        animate={{ x: "115vw" }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <g>
          <rect x="0" y="35" width="130" height="40" rx="4" className="fill-white" />
          <rect x="130" y="15" width="60" height="60" rx="4" className="fill-dail-red-500" />
          <rect x="142" y="28" width="24" height="20" rx="2" className="fill-dail-navy-950/60" />
          <circle cx="40" cy="82" r="14" className="fill-dail-navy-950" />
          <circle cx="40" cy="82" r="5" className="fill-white/70" />
          <circle cx="165" cy="82" r="14" className="fill-dail-navy-950" />
          <circle cx="165" cy="82" r="5" className="fill-white/70" />
        </g>
      </motion.svg>
    </div>
  );
}
