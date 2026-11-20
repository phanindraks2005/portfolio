/** Hairline frames for the recordings: a wide screen and a phone. The screen is whatever is passed in. */

export function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] border border-line bg-surface p-1.5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-ink">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[6px] border border-line bg-surface p-1">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[3px] bg-ink">{children}</div>
    </div>
  );
}
