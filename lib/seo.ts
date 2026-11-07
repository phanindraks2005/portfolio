import type { Metadata } from "next";
import { site } from "./data";

const image = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "K S Phanindra, full-stack developer: Stride, MediVault and RoadSense",
};

/**
 * Metadata for a page below the home page. A page's openGraph and twitter objects replace the layout's
 * whole, so the shared fields and the social image are repeated here.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_IN", title: full, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
  };
}
