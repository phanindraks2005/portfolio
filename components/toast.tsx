"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const EVENT = "toast:show";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email);
    toast("Email copied to clipboard");
  } catch {
    window.location.href = `mailto:${site.email}`;
  }
}

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onShow = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setKey((k) => k + 1);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener(EVENT, onShow);
    return () => {
      window.removeEventListener(EVENT, onShow);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {message && (
        <div
          key={key}
          className="toast flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2 py-2.5 pr-5 pl-3.5 text-[14px] text-ink shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)]"
        >
          <span className="grid size-5 place-items-center rounded-full bg-accent text-white">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
          </span>
          {message}
        </div>
      )}
    </div>
  );
}
