import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

// Bump when the content changes.
const lastModified = new Date("2026-11-22");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/resume`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
