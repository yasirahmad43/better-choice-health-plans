import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { states } from "@/data/states";
import { comparisons } from "@/data/comparisons";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
    { path: "/compare", priority: 0.8, freq: "monthly" as const },
    { path: "/states", priority: 0.8, freq: "monthly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/disclosures", priority: 0.3, freq: "yearly" as const },
  ];

  const compareRoutes = comparisons.map((c) => ({
    path: `/compare/${c.slug}`,
    priority: 0.7,
    freq: "monthly" as const,
  }));

  const stateRoutes = states.map((s) => ({
    path: `/states/${s.slug}`,
    priority: 0.6,
    freq: "monthly" as const,
  }));

  return [...staticRoutes, ...compareRoutes, ...stateRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
