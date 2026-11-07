// Case-study content. Facts come from each project's README and its progress and audit notes.

export type ArchNode = { title: string; lines: string[] };
export type Case = {
  slug: string;
  problem: string[];
  arch: { columns: ArchNode[][]; edges: string[]; note: string };
  stack: { name: string; why: string; icon?: string }[];
  hardest: { title: string; text: string; href?: string }[];
  security: string[];
  results: { value: string; label: string }[];
  next: string[];
};

export const cases: Record<string, Case> = {
  stride: {
    slug: "stride",
    problem: [
      "Habit apps make you do the logging. I wanted a tracker you can talk to: tell it what you drank, ate or lifted and it records it, then shows the streak, the week and the year back to you.",
      "That means an AI that changes real data, so it has to be exact: every action it claims must have happened, for the right user, in the right tracker.",
    ],
    arch: {
      columns: [
        [{ title: "Browser", lines: ["Next.js client pages", "Supabase JS with the anon key", "Session in localStorage"] }],
        [
          { title: "Supabase", lines: ["Postgres, 9 tables", "Row-level security on every table", "Email auth"] },
          { title: "/api/copilot/chat", lines: ["Next.js route handler", "Verifies the bearer token", "Builds Libra’s context"] },
        ],
        [{ title: "Gemini", lines: ["Function calling", "log_entry, create_tracker,", "meal and workout plans", "Streams NDJSON back"] }],
      ],
      edges: ["reads and writes own rows / sends message + token", "tool calls run against Supabase"],
      note: "Pages load their own data straight from Supabase; RLS decides what each user can see. Only Libra goes through a server route, which holds the service-role key.",
    },
    stack: [
      {
        name: "Next.js 16, React 19",
        icon: "Next.js",
        why: "App Router with route groups; the landing page is a server component and the app pages load their own data.",
      },
      {
        name: "Supabase",
        icon: "Supabase",
        why: "Postgres with RLS and email auth, so the browser can query directly and the database enforces who sees what.",
      },
      {
        name: "Gemini API (@google/genai)",
        icon: "Gemini API",
        why: "Function calling lets Libra pick an action; the route runs it and returns the real result to the model.",
      },
      {
        name: "Framer Motion, Recharts",
        icon: "Framer Motion",
        why: "Motion only in the lazily loaded landing sections; charts load behind next/dynamic to keep first load light.",
      },
      {
        name: "CSS Modules + tokens",
        why: "One small set of global tokens and per-component modules; lime is kept for “done” and the primary action.",
      },
      {
        name: "Vercel",
        icon: "Vercel",
        why: "Deploys main on push; a GitHub Action pings Supabase every 3 days so the free project isn’t paused.",
      },
    ],
    hardest: [
      {
        title: "Libra claimed actions it hadn’t done",
        text: "Two log_entry calls came back, only one ran. Now every call runs, each gets its own response, and failures are named.",
        href: "/#bug-libra-tools",
      },
      {
        title: "History cut off at 1,000 rows",
        text: "Supabase caps a request at 1,000 rows without an error. The streak code now pages with .range() ordered by id.",
        href: "/#bug-1000-rows",
      },
      {
        title: "A fog only at 125% scaling",
        text: "A 96 px grain tile upscaled at devicePixelRatio 1.5 hazed every page. Found by measuring in a real browser at the real scale.",
        href: "/#bug-grain-fog",
      },
      {
        title: "Gemini that hangs or runs out of quota",
        text: "One wrapper tries gemini-3.5-flash, falls back to flash-lite on 503, 429 or timeout, then retries once; 20 s per attempt, 50 s per message, plain messages instead of raw errors.",
      },
    ],
    security: [
      "Row-level security on all 9 tables, each limited to auth.uid() = user_id; the anon role has no grants.",
      "The chat route verifies the Supabase access token with the service-role client before doing anything; the service key never reaches the browser.",
      "Libra only acts through four declared tools that write to the signed-in user’s own rows.",
      "/demo swaps the Supabase client for an in-memory copy: read-only, no network, no Gemini calls.",
    ],
    results: [
      { value: "1,100+", label: "clicks in the click-through audit (3 states × 4 screen sizes); 7 issues found, all fixed and re-tested live" },
      { value: "96", label: "mobile Lighthouse performance on the landing page after the performance pass (was 67–70)" },
      { value: "1,424", label: "logs over 400 days on the account used to verify the 1,000-row fix" },
      { value: "2 / 2", label: "entries logged and confirmed in the database for “log 300 ml water and 20 g protein” after the Libra fix" },
    ],
    next: [
      "A rate limit on Libra’s chat route, and security headers (both still open in my audit; the 2,000-character message limit is done).",
      "Password reset: there is no “Forgot password?” yet.",
      "Signed-in dashboard on mobile measures about 81 in Lighthouse; next is rendering it on the server with its data.",
    ],
  },

  medivault: {
    slug: "medivault",
    problem: [
      "A family’s medical history lives on paper: prescriptions in a drawer, vaccination dates in someone’s memory, allergies nobody can find in an emergency.",
      "MediVault reads those papers with Gemini, keeps every member’s records in one place, and puts the details a paramedic needs on a card that opens without a login.",
    ],
    arch: {
      columns: [
        [{ title: "Browser", lines: ["Next.js 16 + TypeScript", "Supabase JS (publishable key)", "/demo: in-browser sample family"] }],
        [
          { title: "Supabase", lines: ["Postgres, 6 tables, RLS", "Private storage bucket", "Files under <user_id>/"] },
          { title: "7 API routes", lines: ["Bearer token on every call", "30 AI requests a day", "Input and reply shape checks"] },
        ],
        [
          { title: "Gemini", lines: ["gemini-3.5-flash", "falls back to flash-lite", "25 s per attempt"] },
          { title: "/e/[token]", lines: ["Public QR card, no JS", "Token looked up by SHA-256", "30 requests a minute per IP"] },
        ],
      ],
      edges: ["own rows and files / requests with token", "extract, chat, check / emergency fields only"],
      note: "The browser talks to Supabase directly under RLS. Anything that needs the service-role key or Gemini goes through a route that first identifies the user from their token.",
    },
    stack: [
      {
        name: "Next.js 16, TypeScript",
        icon: "TypeScript",
        why: "App Router pages and route handlers in one codebase; the public QR card is a plain route handler that sends HTML with no scripts.",
      },
      {
        name: "Supabase",
        icon: "Supabase",
        why: "Postgres with RLS, auth and a private storage bucket whose policies keep each user’s files in their own folder.",
      },
      {
        name: "Gemini API",
        icon: "Gemini API",
        why: "Reads photos and PDFs into doctor, date and medicines, and powers Doc, the interaction checker and visit summaries.",
      },
      {
        name: "Tailwind CSS 4, shadcn/ui",
        icon: "Tailwind CSS",
        why: "Base UI components retuned to one token set; Inter for text and Archivo for dates.",
      },
      { name: "qrcode + canvas", why: "QR codes, a 300 dpi wallet card and a lock-screen picture drawn in the browser." },
      {
        name: "Vercel",
        icon: "Vercel",
        why: "Deploys main on push, with a CSP, X-Frame-Options, Referrer-Policy and HSTS from next.config.ts.",
      },
    ],
    hardest: [
      {
        title: "Another family’s file, read by the AI",
        text: "The extraction route used the service-role client on a path from a record row. It now refuses any path outside the caller’s folder, and a check constraint backs it up.",
        href: "/#bug-file-access",
      },
      {
        title: "A QR card that is public but not guessable",
        text: "256-bit random tokens, stored only as SHA-256 hashes; one live link per member; revoke, regenerate and expiry; unknown, revoked and expired links all look the same.",
      },
      {
        title: "A dashboard that jumped as data arrived",
        text: "Mobile Lighthouse 52 with layout shift 0.306. Stopping the grid from jumping when data arrives took shift to 0 and the score to 95–99.",
      },
      {
        title: "AI that fails quietly",
        text: "Every AI reply is validated before use; a bad reply becomes “the answer came back incomplete” and a failed extraction can be retried from the record page.",
      },
    ],
    security: [
      "RLS on all 6 tables (auth.uid() = user_id) and a private bucket; tested with a second account: inserts for another user 403, anon reads 0 rows, uploads to another folder refused.",
      "All 7 API routes return 401 without a token; the two that use the service-role key only touch the caller’s rows.",
      "QR links: the database stores only token hashes; the public page returns only emergency fields, is rate limited, noindex and no-store, and logs opens as timestamps only.",
      "Length limits in the forms and as database check constraints; security headers on every response; no keys in the browser bundle or git history.",
    ],
    results: [
      { value: "52 → 95+", label: "dashboard mobile Lighthouse performance (re-runs 95–99, layout shift 0.306 → 0)" },
      { value: "3,491", label: "clicks over 299 page loads in the click-through audit; 14 issues found, all fixed and re-tested live" },
      { value: "7 / 7", label: "API routes that answer 401 without a login token" },
      { value: "99", label: "mobile Lighthouse performance on the public QR card (accessibility and best practices 100)" },
    ],
    next: [
      "Password reset, which needs a real email provider.",
      "The record page measures 77 on mobile Lighthouse; it’s the next performance target.",
      "Scan a production QR card with a real phone; so far the links were tested with decoded images and curl.",
    ],
  },

  roadsense: {
    slug: "roadsense",
    problem: [
      "Unmarked speed bumps are a hazard, especially at night. The app should warn a driver before the bump, using only the phone already in the car.",
      "A sharp drop in speed followed by a quick recovery is the signature of a bump; slowing for traffic or a turn looks different. The challenge is telling them apart from GPS speed alone.",
    ],
    arch: {
      columns: [
        [
          {
            title: "Flutter app",
            lines: ["geolocator: a reading a second", "flutter_map + OpenStreetMap", "Voice alerts with flutter_tts"],
          },
        ],
        [{ title: "FastAPI on Render", lines: ["POST /trip-data", "GET /bumps", "POST /detect-bumps"] }],
        [
          { title: "Detection", lines: ["Drop ≥ 20%, back in ≤ 5 s", "Random Forest ≥ 0.70", "2 hits within 20 m"] },
          { title: "SQLite", lines: ["Readings", "Confirmed bumps"] },
        ],
      ],
      edges: ["readings while tracking / bumps on the map", "trip ends: detect, store, confirm"],
      note: "The app also asks the Overpass API for nearby named places and exports a trip as CSV.",
    },
    stack: [
      {
        name: "Flutter / Dart",
        icon: "Flutter",
        why: "One Android app with flutter_map, geolocator, flutter_tts and share_plus for CSV export.",
      },
      { name: "OpenStreetMap + Overpass", why: "Free map tiles and nearby place names, no API key needed." },
      {
        name: "FastAPI",
        icon: "FastAPI",
        why: "A small Python API that the app streams readings to and that runs detection when a trip ends.",
      },
      {
        name: "scikit-learn, pandas",
        icon: "scikit-learn",
        why: "Features per event (speed before, minimum, drop, drop %, deceleration, recovery time, jerk) into a Random Forest.",
      },
      { name: "SQLite on Render", icon: "SQLite", why: "Simple storage for readings and bumps on the free tier." },
    ],
    hardest: [
      {
        title: "Bump or traffic?",
        text: "A candidate needs a drop of at least 20% that recovers within 5 seconds; the classifier then scores its shape and only events above 0.70 confidence are kept.",
      },
      {
        title: "One driver isn’t proof",
        text: "Crowd validation: a bump is confirmed only once it has been detected at least twice within 20 m.",
      },
      {
        title: "Warn early, then again",
        text: "A “Speed Bump Ahead” banner and voice alert first at 400 m, again at 60 m.",
      },
    ],
    security: [
      "Honest status: the backend has no authentication yet and its CORS is open, so anyone could post readings. It’s the first item below.",
      "The full final-year project and the backend repo are private; only the app is public.",
    ],
    results: [
      { value: "20%", label: "minimum speed drop for a candidate event, recovering within 5 s" },
      { value: "0.70", label: "classifier confidence needed to keep an event" },
      { value: "2 in 20 m", label: "detections needed before a bump is confirmed" },
      { value: "400 m / 60 m", label: "distances of the first and second warning" },
    ],
    next: [
      "Collect real-world driving data; the current model is trained on synthetic sensor data.",
      "Add authentication to the backend and close its CORS.",
      "Move from SQLite to Postgres: Render’s free tier wipes SQLite on every redeploy, so bumps don’t persist.",
    ],
  },
};
