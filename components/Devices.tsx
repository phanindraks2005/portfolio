import Image from "next/image";
import type { ReactNode } from "react";

export function Laptop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div className="rounded-t-[14px] border border-white/10 bg-[#1a1c21] p-[1.6%] pb-[1.2%] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-black">
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-cover object-top-left" />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[10px] rounded-b-[10px] bg-gradient-to-b from-[#2a2d34] to-[#15171b] sm:h-[14px]">
        <div className="absolute top-0 left-1/2 h-[4px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#0d0e11]" />
      </div>
    </div>
  );
}

export function Phone({ src, alt, children }: { src?: string; alt?: string; children?: ReactNode }) {
  return (
    <div className="rounded-[26px] border border-white/12 bg-[#16181d] p-[5px] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.95)]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[21px] bg-black">
        {src ? <Image src={src} alt={alt ?? ""} fill sizes="180px" className="object-cover object-top" /> : children}
        <div className="absolute top-[7px] left-1/2 h-[9px] w-[30%] -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  );
}
