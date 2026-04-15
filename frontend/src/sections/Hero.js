import { useState, useRef, useEffect, useCallback } from 'react';
import goki from '../assets/img/gokismile.png';

import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import { ChevronDown } from "lucide-react";

// ─── Module-level constants (allocated once, never reallocated) ───────────────

const NUM_BLADES   = 500;
const HOVER_RADIUS = 50; // SVG units (~6% of width)
const HOVER_FX     = { filter: "brightness(2) saturate(1.6)" }; // stable whileHover ref

const STATS = [
  { value: "20+",        label: "Years Experience" },
  { value: "7",          label: "Industries" },
  { value: "Full Stack", label: "to C-Suite" },
  { value: "PH",         label: "Based, Global" },
];

// toast is stable — no reason to recreate this closure each render
function notify() {
  toast.success("Thats it! touch grass! 👋 🌱 ", { position: 'bottom-right' });
}

// Closed, tapered blade path — base always anchored at y=200 regardless of lean
function bladePath(x, h, w, lean) {
  const base = 200;
  return (
    `M${(x - w).toFixed(1)},${base} ` +
    `C${(x - w + lean * 0.08).toFixed(1)},${(base - h * 0.38).toFixed(1)} ` +
    `${(x + lean * 0.65).toFixed(1)},${(base - h * 0.68).toFixed(1)} ` +
    `${(x + lean).toFixed(1)},${(base - h).toFixed(1)} ` +
    `C${(x + lean + w * 0.15).toFixed(1)},${(base - h + 2).toFixed(1)} ` +
    `${(x + w + lean * 0.55).toFixed(1)},${(base - h * 0.37).toFixed(1)} ` +
    `${(x + w).toFixed(1)},${base} Z`
  );
}

const bladeData = Array.from({ length: NUM_BLADES }, (_, i) => {
  const x           = (i / NUM_BLADES) * 800 + (Math.random() - 0.5) * 1.8;
  const h           = 55 + Math.random() * 80;
  const w           = 0.4 + Math.random() * 0.7;
  const initialLean = (Math.random() - 0.45) * 10;
  const windAmp     = 6 + Math.random() * 13;
  const speed       = 2.5 + Math.random() * 3.5;
  const delay       = (x / 800) * 1.6 + Math.random() * 0.7;
  const gradId      = Math.random() < 0.35 ? 'gg2' : Math.random() < 0.55 ? 'gg3' : 'gg1';
  return { x, h, w, initialLean, windAmp, speed, delay, gradId };
}).sort((a, b) => a.h - b.h);

// Pre-compute stable animate / transition / fill objects per blade.
// Blades outside the hover radius reuse these every render — zero allocations.
const bladeCache = bladeData.map((blade) => {
  const pathA    = bladePath(blade.x, blade.h, blade.w, blade.initialLean + blade.windAmp);
  const pathB    = bladePath(blade.x, blade.h, blade.w, blade.initialLean - blade.windAmp);
  const pathBase = bladePath(blade.x, blade.h, blade.w, blade.initialLean);
  return {
    pathBase,
    animateObj:    { d: [pathA, pathB, pathA] },
    transitionObj: { duration: blade.speed, delay: blade.delay, repeat: Infinity, ease: "easeInOut" },
    fillStr:       `url(#${blade.gradId})`,
  };
});

// ─── Component ────────────────────────────────────────────────────────────────

function Hero({ CONFIG }) {
  const [hoverInfo, setHoverInfo] = useState({ x: null, lean: 0 });
  const prevSvgX = useRef(null);
  const rafId    = useRef(null);

  // Cancel any pending RAF when the component unmounts to prevent
  // setHoverInfo from firing on a dead component (memory leak)
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect    = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const svgX = ((clientX - rect.left) / rect.width) * 800;
      const dx   = prevSvgX.current !== null ? svgX - prevSvgX.current : 0;
      prevSvgX.current = svgX;
      const lean = Math.max(-18, Math.min(18, dx * 1.8));
      setHoverInfo({ x: svgX, lean });
      rafId.current = null;
    });
  }, []); // stable: only refs + stable setter

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    prevSvgX.current = null;
    setHoverInfo({ x: null, lean: 0 });
  }, []);

  return (
    <div id="hero" className="relative min-h-screen bg-cover bg-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-48 sm:py-52 flex flex-col sm:flex-row sm:items-start items-center gap-8 sm:gap-0">
        <div className="sm:basis-1/3 flex justify-center sm:justify-end px-4 sm:px-10 sm:pt-2">
          <img src={goki} alt="Profile" className="w-44 h-44 sm:w-56 sm:h-56 object-contain rounded-full border-4 border-white shadow-xl" />
        </div>
        <div className="sm:basis-2/3 text-center sm:text-left">
          <h1 className="text-4xl md:text-6xl font-bold">Hi, I'm {CONFIG.name}</h1>
          <p className="mt-4 mb-10 text-lg md:text-2xl max-w-2xl mx-auto sm:mx-0">{CONFIG.headline}</p>
          <a
            href="#contact"
            className="inline-block rounded-md bg-[var(--primary)] px-8 py-5 my-10 text-sm font-semibold text-white hover:bg-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
          >
            Let's Connect
          </a>
          <div className="mt-10 flex flex-wrap gap-6 justify-center sm:justify-start">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center sm:items-start">
                <span className="text-2xl font-bold text-[var(--primary)]">{stat.value}</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
          <ChevronDown className="mt-12 animate-bounce mx-auto sm:mx-0" size={32} />
        </div>
      </div>

      {/* Grass Bed */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 cursor-pointer"
        viewBox="0 0 800 200"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="gg1" x1="0" y1="200" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#052e11" />
            <stop offset="45%"  stopColor="#166534" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="gg2" x1="0" y1="200" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0a4a1f" />
            <stop offset="45%"  stopColor="#15803d" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <linearGradient id="gg3" x1="0" y1="200" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0d4a16" />
            <stop offset="45%"  stopColor="#1a7a30" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>

        <rect x="0" y="194" width="800" height="8" fill="#052e11" />

        {bladeData.map((blade, i) => {
          const cache = bladeCache[i];
          const dist  = hoverInfo.x !== null ? Math.abs(blade.x - hoverInfo.x) : Infinity;

          // Outside hover radius — reuse stable cached objects, no allocations
          if (dist >= HOVER_RADIUS) {
            return (
              <motion.path
                key={i}
                d={cache.pathBase}
                fill={cache.fillStr}
                whileHover={HOVER_FX}
                animate={cache.animateObj}
                transition={cache.transitionObj}
                onClick={notify}
              />
            );
          }

          // Inside hover radius — compute lean-shifted paths for this frame only
          const hoverLean = hoverInfo.lean * Math.pow(1 - dist / HOVER_RADIUS, 1.2);
          const leanA = blade.initialLean + blade.windAmp + hoverLean;
          const leanB = blade.initialLean - blade.windAmp + hoverLean;

          return (
            <motion.path
              key={i}
              d={bladePath(blade.x, blade.h, blade.w, blade.initialLean + hoverLean)}
              fill={cache.fillStr}
              whileHover={HOVER_FX}
              animate={{
                d: [
                  bladePath(blade.x, blade.h, blade.w, leanA),
                  bladePath(blade.x, blade.h, blade.w, leanB),
                  bladePath(blade.x, blade.h, blade.w, leanA),
                ],
              }}
              transition={cache.transitionObj}
              onClick={notify}
            />
          );
        })}
      </svg>

      <ToastContainer />
    </div>
  );
}

export default Hero;
