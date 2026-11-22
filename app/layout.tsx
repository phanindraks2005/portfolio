import type { Metadata, Viewport } from "next";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "@/components/toast";
import { site } from "@/lib/data";
import { instrument, jetbrains, schibsted } from "@/lib/fonts";
import "./globals.css";

const base = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url;

const title = "K S Phanindra — Software Engineer (Full-stack) | Portfolio";
const description =
  "K S Phanindra, full-stack software engineer and B.E. CSE student at BMS College of Engineering, Bengaluru (2027). Live demos of Stride, MediVault and RoadSense.";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: title,
    template: "%s · K S Phanindra",
  },
  description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    title,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#e9e7e1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${schibsted.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Nav />
          <div id="main">{children}</div>
          <Footer />
          <CommandPalette />
          <Toaster />
          <SmoothScroll />
        </MotionProvider>
      </body>
    </html>
  );
}
