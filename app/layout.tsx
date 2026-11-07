import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { site } from "@/lib/data";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url;

const description =
  "Full-stack developer in Bengaluru building AI-integrated web apps with Next.js, Supabase and Gemini. Projects: Stride, MediVault and RoadSense.";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: "K S Phanindra · Full-stack developer",
    template: "%s · K S Phanindra",
  },
  description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    title: "K S Phanindra · Full-stack developer",
    description,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "K S Phanindra · Full-stack developer", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
