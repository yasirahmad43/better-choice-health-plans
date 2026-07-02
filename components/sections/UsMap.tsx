"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { states } from "@/data/states";

const nameToSlug: Record<string, string> = Object.fromEntries(states.map((s) => [s.name, s.slug]));
const nameToAbbr: Record<string, string> = Object.fromEntries(states.map((s) => [s.name, s.abbr]));

const GEO_URL = "/geo/us-states.json";

// Tiny northeastern states are too small for an inset label without overlap.
const SKIP_LABEL = new Set(["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC"]);

/**
 * Custom interactive US map for Better Choice — brand-gradient state fills,
 * a soft glow on hover, and a cursor-following tooltip card. Hover (or focus)
 * a state, then click / Enter to open its coverage page.
 */
export function UsMap() {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative mx-auto max-w-4xl"
    >
      <ComposableMap
        projection="geoAlbersUsa"
        width={900}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="bcState" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e6f1fb" />
            <stop offset="1" stopColor="#ddf3f2" />
          </linearGradient>
          <linearGradient id="bcHot" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f6fb8" />
            <stop offset="0.55" stopColor="#0e7c86" />
            <stop offset="1" stopColor="#2fa85a" />
          </linearGradient>
          <filter id="bcGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#1f5fa8" floodOpacity="0.45" />
          </filter>
        </defs>

        <Geographies geography={GEO_URL}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const name: string = geo.properties.name;
                const slug = nameToSlug[name];
                const isHover = hovered === name;
                const base = {
                  fill: isHover ? "url(#bcHot)" : "url(#bcState)",
                  stroke: "#ffffff",
                  strokeWidth: isHover ? 1.5 : 1,
                  outline: "none",
                  cursor: slug ? "pointer" : "default",
                  filter: isHover ? "url(#bcGlow)" : "none",
                  transition: "fill 0.2s ease, stroke-width 0.2s ease",
                };
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    role="link"
                    aria-label={`${name} — view coverage`}
                    tabIndex={slug ? 0 : -1}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(name)}
                    onBlur={() => setHovered(null)}
                    onClick={() => slug && router.push(`/states/${slug}`)}
                    onKeyDown={(e) => {
                      if (slug && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        router.push(`/states/${slug}`);
                      }
                    }}
                    style={{ default: base, hover: base, pressed: { ...base, fill: "url(#bcHot)" } }}
                  />
                );
              })}
              {geographies.map((geo) => {
                const name: string = geo.properties.name;
                const abbr = nameToAbbr[name];
                if (!abbr || SKIP_LABEL.has(abbr)) return null;
                const centroid = geoCentroid(geo);
                const isHover = hovered === name;
                return (
                  <Marker key={`${geo.rsmKey}-label`} coordinates={centroid}>
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      style={{
                        pointerEvents: "none",
                        fontSize: 11,
                        fontWeight: 700,
                        fill: isHover ? "#ffffff" : "#334155",
                        transition: "fill 0.2s ease",
                      }}
                    >
                      {abbr}
                    </text>
                  </Marker>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>

      {/* cursor-following tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{ left: tip.x, top: tip.y }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+16px)]"
          >
            <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-lift">
              {hovered}
              <span className="inline-flex items-center gap-1 text-green-300">
                view plans <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink-900" />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-center text-sm font-medium text-ink-500">
        {hovered ? "Click to view coverage where you live" : "Hover or tap a state to explore coverage"}
      </p>
    </div>
  );
}
