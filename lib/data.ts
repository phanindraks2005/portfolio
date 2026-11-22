export const site = {
  name: "K S Phanindra",
  url: "https://phanindra-ks.vercel.app",
  email: "phanindra.k.s.2005@gmail.com",
  github: "https://github.com/phanindraks2005",
  linkedin: "https://www.linkedin.com/in/ksphanindra",
  resume: "/resume.pdf",
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  pitch: string;
  highlights: string[];
  stack: string[];
  color: string;
  live?: string;
  github: string;
  /** Who built it with me, for team projects. */
  team?: string;
  /** Role and years, shown as a mono meta line ("Solo · 2026"). */
  meta: string;
  /** 4–6 words for the hero's Selected work row. */
  short: string;
  /** Search and link-preview description for the case study. */
  description: string;
  laptop?: { src: string; alt: string };
  phone?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "stride",
    name: "Stride",
    kind: "Habit and fitness tracker",
    meta: "Solo · 2026",
    short: "Habit tracker with an AI coach",
    description:
      "Stride, a habit and fitness tracker built with Next.js, Supabase and the Gemini API. Its AI copilot logs entries and plans workouts; row-level security on all 9 tables; live demo without an account.",
    pitch: "Tracking my habits was messy, with different things in different places. Now all my activities are tracked in one place.",
    highlights: [
      "Libra, a Gemini copilot with function calling: it logs entries, creates trackers and writes meal and workout plans, streaming its replies.",
      "Fixed multi-step requests: “log 300 ml water and 20 g protein” now runs every tool call and reports any that failed instead of claiming them.",
      "Paged past Supabase’s 1,000-row limit, which had been silently dropping older history from heavy users’ streaks and charts.",
      "A read-only /demo runs every page on a sample year of data held in memory, so nothing is sent anywhere.",
    ],
    stack: ["Next.js 16", "React 19", "Supabase", "Gemini API", "Framer Motion", "Recharts"],
    color: "#c6f432",
    live: "https://stride-ks.vercel.app/demo",
    github: "https://github.com/phanindraks2005/stride",
    laptop: {
      src: "/shots/stride-today.webp",
      alt: "Stride's Today page: a 23-day streak with a heatmap, goals hit this week and tracker cards",
    },
    phone: { src: "/shots/stride-today-phone.webp", alt: "Stride's Today page on a phone with the bottom tab bar" },
  },
  {
    slug: "medivault",
    name: "MediVault",
    kind: "Family health records",
    meta: "Solo · 2024–2026",
    short: "Family medical records with AI",
    description:
      "MediVault, a family health records app built with Next.js, TypeScript, Supabase and Gemini. Reads prescriptions, has a QR emergency card and RLS on every table; mobile Lighthouse 52 → 95+.",
    pitch:
      "Keeping track of prescriptions used to annoy me. Now all my medical records are in one place, and I can ask the AI about anything I don’t understand.",
    highlights: [
      "Row-level security on every table, a private per-user storage bucket and token-checked API routes.",
      "Found and fixed a cross-account file read in my own QA audit: the extraction route now refuses any path outside the caller’s folder.",
      "QR emergency card a paramedic can open without logging in: a 256-bit token stored only as a SHA-256 hash, revocable, expiring and rate limited.",
      "Doc, a chat assistant that answers from the family’s own records, plus an interaction checker and visit summaries.",
    ],
    stack: ["Next.js 16", "TypeScript", "Supabase", "Gemini API", "Tailwind CSS"],
    color: "#2dd4bf",
    live: "https://medivault-ks.vercel.app/demo",
    github: "https://github.com/phanindraks2005/medivault",
    laptop: {
      src: "/shots/medivault-dashboard.webp",
      alt: "MediVault's dashboard: a month calendar of vaccinations and prescriptions, and what's coming up for the sample family",
    },
    phone: {
      src: "/shots/medivault-public-card.webp",
      alt: "MediVault's public emergency card on a phone: allergies in red, blood group, conditions and Call 112 / Call 108",
    },
  },
  {
    slug: "roadsense",
    name: "RoadSense",
    kind: "Speed-bump detection, Android",
    meta: "Team lead · 2026",
    short: "Speed-bump warnings for drivers",
    description:
      "RoadSense, an Android app in Flutter that detects speed bumps from GPS speed and warns drivers at 400 m and 60 m. FastAPI backend with a scikit-learn Random Forest on 7 features.",
    pitch: "An Android app that detects speed bumps from GPS speed data and warns drivers before they reach one.",
    highlights: [
      "Finds candidate events in the speed trace: a drop of 20% or more that recovers within 5 seconds.",
      "A scikit-learn Random Forest scores each event on 7 features (speed before, minimum speed, drop, drop %, deceleration, recovery time, jerk); only those above 0.70 confidence are kept.",
      "Crowd validation: a bump is confirmed once it has been detected twice within 20 m.",
      "A “Speed Bump Ahead” banner and voice alert at 400 m and again at 60 m, on an OpenStreetMap map.",
    ],
    stack: ["Flutter", "Dart", "FastAPI", "scikit-learn", "SQLite", "Render"],
    color: "#f5a524",
    github: "https://github.com/phanindraks2005/roadsense-app",
    team: "Final-year team project, guided by Dr. Naresh E. I led it end to end: research, the detection approach, the Flutter app, the FastAPI backend and model, and deployment. Teammates P Ashrita and Sandesh helped with field data collection.",
  },
];

export type Skill = { name: string; used: string[]; note?: string };

// `used` lists the project slugs whose code uses the skill (checked against each repo's package.json,
// pubspec.yaml and requirements.txt): Stride is plain JavaScript, MediVault TypeScript + Tailwind,
// RoadSense Flutter with a Python/FastAPI backend. Both web apps run a GitHub Actions keep-alive.
// The same skills are on the resume (lib/resume.ts and the PDF).
const S = "stride";
const M = "medivault";
const R = "roadsense";
const DSA = "DSA and coursework";

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", used: [M] },
      { name: "JavaScript", used: [S] },
      { name: "Python", used: [R] },
      { name: "Dart", used: [R] },
      { name: "SQL", used: [S, M] },
      { name: "HTML & CSS", used: [S, M] },
      { name: "C", used: [], note: DSA },
      { name: "C++", used: [], note: DSA },
      { name: "Java", used: [], note: DSA },
    ],
  },
  {
    group: "Frontend & mobile",
    items: [
      { name: "Next.js", used: [S, M] },
      { name: "React", used: [S, M] },
      { name: "Flutter", used: [R] },
      { name: "Tailwind CSS", used: [M] },
      { name: "Framer Motion", used: [S, M] },
      { name: "Recharts", used: [S] },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", used: [S, M] },
      { name: "FastAPI", used: [R] },
      { name: "REST APIs", used: [S, M, R] },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "PostgreSQL", used: [S, M] },
      { name: "Supabase", used: [S, M] },
      { name: "SQLite", used: [R] },
    ],
  },
  {
    group: "AI & data",
    items: [
      { name: "Gemini API", used: [S, M] },
      { name: "scikit-learn", used: [R] },
      { name: "pandas", used: [R] },
      { name: "NumPy", used: [R] },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", used: [S, M, R] },
      { name: "GitHub", used: [S, M, R] },
      { name: "GitHub Actions", used: [S, M] },
      { name: "Vercel", used: [S, M] },
      { name: "Render", used: [R] },
    ],
  },
];

export const experience = [
  {
    title: "Junior Coordinator, Volunteering Committee",
    org: "Utsav, BMSCE’s cultural fest",
    year: "2025",
    text: "Led a team of 12 volunteers across every event area: task allocation, schedules and on-ground logistics.",
  },
  {
    title: "Volunteer",
    org: "PhaseShift, BMSCE’s technical fest",
    year: "2025",
    text: "Supported fest operations and event management.",
  },
  {
    title: "Technical Team Member",
    org: "Deathscapes, BMSCE",
    year: "2025",
    text: "Handled technical setup and coordination in the execution team.",
  },
];

export const education = [
  {
    school: "BMS College of Engineering",
    detail: "B.E., Computer Science and Engineering",
    years: "2023–2027",
    coursework: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "Soft Computing"],
  },
  {
    school: "Deeksha Center for Learning",
    detail: "Pre-University (11th & 12th)",
    years: "2021–2023",
  },
  {
    school: "GEM International Residential School",
    detail: "School football team and athletics",
  },
];

export const chess = "3rd place in a state-level chess competition";
