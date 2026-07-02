import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — Private PPO Health Insurance`;

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(120deg, #1a4f8c 0%, #0e7c86 52%, #2fa85a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 92,
              background: "rgba(255,255,255,0.16)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,0.55)",
            }}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12.5 L9.5 18 L20 6.5"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#fff" }}>Better Choice</div>
            <div style={{ fontSize: 18, letterSpacing: 8, color: "rgba(255,255,255,0.85)" }}>
              HEALTH PLANS
            </div>
          </div>
        </div>

        {/* middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 700, color: "#fff", lineHeight: 1.08, maxWidth: 940 }}>
            A better choice for PPO coverage that fits your budget
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.9)", marginTop: 24, maxWidth: 880 }}>
            Broad networks · year-round enrollment · free licensed-advisor review
          </div>
        </div>

        {/* bottom: chips */}
        <div style={{ display: "flex", gap: 16 }}>
          {["All 50 states", "No obligation", "Takes 30 seconds"].map((c) => (
            <div
              key={c}
              style={{
                fontSize: 24,
                color: "#fff",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "10px 22px",
                borderRadius: 999,
                display: "flex",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
