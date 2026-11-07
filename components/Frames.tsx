/** Laptop and phone frames drawn in CSS; the screen is whatever is passed in. */

export function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="rounded-t-[14px] border border-white/10 bg-[#1a1c21] p-[1.6%] pb-[1.2%] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-black">{children}</div>
      </div>
      <div className="relative mx-[-6%] h-[10px] rounded-b-[10px] bg-[#1f2228] sm:h-[14px]">
        <div className="absolute top-0 left-1/2 h-[4px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#0d0e11]" />
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] border border-white/12 bg-[#16181d] p-[4px] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.95)]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[18px] bg-black">
        {children}
        <div className="absolute top-[6px] left-1/2 z-10 h-[8px] w-[30%] -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  );
}
