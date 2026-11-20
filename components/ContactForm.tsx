"use client";

import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/lib/data";
import { copyEmail } from "./toast";

type Status = "idle" | "sending" | "sent" | "error" | "rate_limited" | "unavailable";

const label = "mono block text-ink";

/** Name, email and message, sent through /api/contact. Without a mail key it offers email instead. */
export function ContactForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<Status>(enabled ? "idle" : "unavailable");
  const started = useRef(0);

  if (status === "unavailable") return <EmailDirectly />;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, t: started.current }),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else if (res.status === 503) setStatus("unavailable");
      else if (res.status === 429) setStatus("rate_limited");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="grid min-h-[320px] place-items-center border-y border-line p-8 text-center">
        <div>
          <p className="mono inline-flex items-center gap-2 text-ink-2">
            <span className="status-dot" aria-hidden="true" />
            Sent
          </p>
          <p className="display mt-4 text-[24px] text-ink">Message sent.</p>
          <p className="mt-2 text-[15px] text-ink-2">Thanks for writing. I&rsquo;ll reply to the email you gave.</p>
          <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-6">
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => (started.current ||= Date.now())} className="relative grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <label className={label}>
          Name
          <input name="name" required maxLength={100} autoComplete="name" className="field h-12" />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" spellCheck={false} className="field h-12" />
        </label>
      </div>
      <label className={label}>
        Message
        <textarea name="message" required minLength={2} maxLength={5000} rows={5} className="field resize-y leading-relaxed" />
      </label>
      {/* Hidden from people and screen readers; bots that fill every field give themselves away. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="min-h-[22px] text-[14px] text-ink">
          {status === "error" && (
            <span className="inline-flex items-baseline gap-3">
              <span className="mono shrink-0">Error</span>
              Couldn&rsquo;t send that. Try again, or email me directly.
            </span>
          )}
          {status === "rate_limited" && (
            <span className="inline-flex items-baseline gap-3">
              <span className="mono shrink-0">Wait</span>
              That&rsquo;s a few messages in a row. Try again in a few minutes, or email me directly.
            </span>
          )}
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary h-12 shrink-0 px-6">
          {status === "sending" && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}

function EmailDirectly() {
  return (
    <div className="grid min-h-[320px] place-items-center border-y border-line p-8 text-center">
      <div>
        <p className="display text-[24px] text-ink">Email me directly</p>
        <p className="mt-2 text-[15px] text-ink-2">The form isn&rsquo;t switched on right now, so email is the way to reach me.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            Write an email
          </a>
          <button type="button" onClick={copyEmail} className="btn btn-secondary">
            Copy address
          </button>
        </div>
      </div>
    </div>
  );
}
