import { Doto, Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

export const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
export const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});
export const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: "400", display: "swap" });
// Only the hero canvas draws with Doto, after first paint, so it isn't preloaded.
export const doto = Doto({ variable: "--font-doto", subsets: ["latin"], weight: "900", display: "swap", preload: false });
