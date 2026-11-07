import Image from "next/image";
import { RoadSenseMap } from "./RoadSenseArt";

/** The three products side by side as phones, each lit in its own colour. Desktop only. */
export function HeroPhones() {
  return (
    <div className="hero-phones relative mx-auto aspect-[1/1.02] w-full max-w-[460px]" aria-hidden="true">
      <Frame className="left-[2%] top-[14%] w-[40%] -rotate-[9deg]" color="#f5a524" delay={2}>
        <RoadSenseMap />
      </Frame>
      <Frame className="right-[2%] top-[14%] w-[40%] rotate-[9deg]" color="#2dd4bf" delay={3}>
        <Image src="/shots/medivault-public-card.webp" alt="" fill sizes="190px" className="object-cover object-top" />
      </Frame>
      <Frame className="left-1/2 top-0 z-10 w-[46%] -translate-x-1/2" color="#c6f432" delay={1}>
        <Image src="/shots/stride-today-phone.webp" alt="" fill sizes="220px" className="object-cover object-top" />
      </Frame>
    </div>
  );
}

function Frame({ className, color, delay, children }: { className: string; color: string; delay: number; children: React.ReactNode }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="phone-float" style={{ ["--d" as string]: delay }}>
        <div
          className="rounded-[26px] border border-white/12 bg-[#16181d] p-[5px]"
          style={{ boxShadow: `0 40px 80px -30px rgb(0 0 0 / 0.9), 0 0 80px -20px ${color}66` }}
        >
          <div className="relative aspect-[390/844] overflow-hidden rounded-[21px] bg-black">
            {children}
            <div className="absolute top-[7px] left-1/2 h-[9px] w-[30%] -translate-x-1/2 rounded-full bg-black/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
