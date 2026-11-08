import { site } from "@/lib/data";

// Three messages per address every ten minutes. Kept in memory, so the limit is per server instance:
// enough to stop a script hammering the form, without a database.
const WINDOW = 10 * 60_000;
const LIMIT = 3;
const hits = new Map<string, number[]>();

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return json({ error: "not_configured" }, 503);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }

  // Bots fill the hidden field, or post faster than a person can type; pretend it worked so they don't retry.
  const started = Number(body.t);
  if (body.company || (Number.isFinite(started) && Date.now() - started < 3000)) return json({ ok: true });

  const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || name.length > 100 || !EMAIL.test(email) || email.length > 200 || message.length < 2 || message.length > 5000) {
    return json({ error: "invalid" }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return json({ error: "rate_limited" }, 429);
  hits.set(ip, [...recent, now]);
  if (hits.size > 5000) hits.clear();

  // Resend's shared onboarding sender can only deliver to the account's own address, which is site.email.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n${name} <${email}>`,
    }),
  });
  if (!res.ok) return json({ error: "send_failed" }, 502);
  return json({ ok: true });
}
