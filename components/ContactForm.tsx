"use client";

import { CircleAlert, CircleCheck, Copy, LoaderCircle, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/lib/data";
import { copyEmail } from "./toast";

type Status = "idle" | "sending" | "sent" | "error" | "rate_limited" | "unavailable";

const field =
  "mt-2 w-full rounded-xl border border-line-strong bg-bg px-4 text-[16px] text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

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
      <div role="status" className="grid min-h-[320px] place-items-center rounded-[24px] border border-line bg-surface p-8 text-center">
        <div>
          <CircleCheck size={32} className="mx-auto text-accent" aria-hidden="true" />
          <p className="display mt-4 text-[22px] font-semibold text-ink">Message sent.</p>
          <p className="mt-2 text-[15px] text-ink-2">Thanks for writing. I&rsquo;ll reply to the email you gave.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-[15px] text-ink transition-colors hover:border-white/30"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => (started.current ||= Date.now())}
      className="relative grid gap-5 rounded-[24px] border border-line bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-medium text-ink-2">
          Name
          <input name="name" required maxLength={100} autoComplete="name" className={`${field} h-12`} />
        </label>
        <label className="block text-[14px] font-medium text-ink-2">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            spellCheck={false}
            className={`${field} h-12`}
          />
        </label>
      </div>
      <label className="block text-[14px] font-medium text-ink-2">
        Message
        <textarea name="message" required minLength={2} maxLength={5000} rows={5} className={`${field} resize-y py-3 leading-relaxed`} />
      </label>
      {/* Hidden from people and screen readers; bots that fill every field give themselves away. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="min-h-[22px] text-[14px]">
          {status === "error" && (
            <span className="inline-flex items-start gap-2 text-[#f87171]">
              <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              Couldn&rsquo;t send that. Try again, or email me directly.
            </span>
          )}
          {status === "rate_limited" && (
            <span className="inline-flex items-start gap-2 text-[#fbbf24]">
              <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              That&rsquo;s a few messages in a row. Try again in a few minutes, or email me directly.
            </span>
          )}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent-strong px-6 text-[15px] font-medium text-white transition-[transform,background-color] duration-300 hover:bg-accent-hover active:scale-[0.97] disabled:opacity-70"
        >
          {status === "sending" ? (
            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function EmailDirectly() {
  return (
    <div className="grid min-h-[320px] place-items-center rounded-[24px] border border-line bg-surface p-8 text-center">
      <div>
        <Mail size={28} className="mx-auto text-accent" aria-hidden="true" />
        <p className="display mt-4 text-[22px] font-semibold text-ink">Email me directly</p>
        <p className="mt-2 text-[15px] text-ink-2">The form isn&rsquo;t switched on right now, so email is the way to reach me.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-strong px-5 text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Mail size={16} aria-hidden="true" />
            Write an email
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] text-ink transition-colors hover:border-white/30"
          >
            <Copy size={16} aria-hidden="true" />
            Copy address
          </button>
        </div>
      </div>
    </div>
  );
}
