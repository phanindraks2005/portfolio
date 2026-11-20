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
          className="toast mono flex items-center gap-2.5 rounded-full bg-ink py-3 pr-5 pl-4 text-bg"
        >
          <Check size={14} aria-hidden="true" />
          {message}
        </div>
      )}
    </div>
  );
}
