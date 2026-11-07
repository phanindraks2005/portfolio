// Runs before `next build`: reads the public GitHub contribution calendar and saves it as JSON,
// so the site shows real data without calling GitHub at runtime. Keeps the last saved file if GitHub can't be reached.
import { readFile, writeFile } from "node:fs/promises";

const USER = "phanindraks2005";
const OUT = new URL("../lib/contributions.json", import.meta.url);

try {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, { headers: { "User-Agent": "portfolio-build" } });
  if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
  const html = await res.text();

  const tips = new Map();
  for (const m of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g)) tips.set(m[1], m[2]);

  const days = [];
  for (const m of html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})" id="(contribution-day-component-[\d-]+)" data-level="(\d)"/g)) {
    const count = Number((tips.get(m[2]) ?? "").match(/^(\d+) contribution/)?.[1] ?? 0);
    days.push({ date: m[1], level: Number(m[3]), count });
  }
  if (days.length < 300) throw new Error(`only ${days.length} days found; the page format may have changed`);
  days.sort((a, b) => a.date.localeCompare(b.date));

  const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1].replace(/,/g, "") ?? NaN);
  const data = { user: USER, fetchedAt: new Date().toISOString().slice(0, 10), total, days };
  await writeFile(OUT, JSON.stringify(data) + "\n");
  console.log(`contributions: ${total} in the last year, ${days.filter((d) => d.level).length} active days`);
} catch (err) {
  const old = await readFile(OUT, "utf8").catch(() => null);
  if (!old) throw err;
  console.warn(`contributions: kept the saved file (${err.message})`);
}
