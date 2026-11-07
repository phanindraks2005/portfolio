import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/resume`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
