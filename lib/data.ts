export const site = {
  name: "K S Phanindra",
  role: "Full-stack developer · AI-integrated web apps",
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
  laptop?: { src: string; alt: string };
  phone?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "stride",
    name: "Stride",
    kind: "Habit and fitness tracker",
    pitch: "A habit and fitness tracker with an AI copilot that acts on your data, not just talks about it.",
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
    pitch:
      "Upload a prescription and Gemini pulls out the doctor, date and medicines, so a whole family’s history is searchable in one place.",
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
    pitch: "An Android app that detects speed bumps from GPS speed data and warns drivers before they reach one.",
    highlights: [
      "Finds candidate events in the speed trace: a drop of 20% or more that recovers within 5 seconds.",
      "A scikit-learn Random Forest scores each event on drop, deceleration, recovery time and jerk; only those above 0.70 confidence are kept.",
      "Crowd validation: a bump is confirmed once it has been detected twice within 20 m.",
      "A “Speed Bump Ahead” banner and voice alert at 400 m and again at 60 m, on an OpenStreetMap map.",
    ],
    stack: ["Flutter", "Dart", "FastAPI", "scikit-learn", "SQLite", "Render"],
    color: "#f5a524",
    github: "https://github.com/phanindraks2005/roadsense-app",
    team: "Final-year team project, guided by Dr. Naresh E. I led it end to end: research, the detection approach, the Flutter app, the FastAPI backend and model, and deployment. Teammates P Ashrita and Sandesh helped with field data collection.",
  },
];

export type Skill = { name: string; used: string[] };

// `used` lists the project slugs whose stack has the skill, from each repo's README and CLAUDE.md:
// Stride is plain JavaScript (Tailwind installed but unused), MediVault is TypeScript + Tailwind,
// RoadSense is Flutter with a Python/FastAPI backend. Both web apps run a GitHub Actions keep-alive.
const S = "stride";
const M = "medivault";
const R = "roadsense";

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "Next.js", used: [S, M] },
      { name: "React", used: [S, M] },
      { name: "TypeScript", used: [M] },
      { name: "JavaScript", used: [S] },
      { name: "Tailwind CSS", used: [M] },
      { name: "Framer Motion", used: [S] },
      { name: "Recharts", used: [S] },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", used: [S, M] },
      { name: "REST APIs", used: [S, M, R] },
      { name: "FastAPI", used: [R] },
      { name: "Python", used: [R] },
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
    group: "AI",
    items: [
      { name: "Gemini API", used: [S, M] },
      { name: "scikit-learn", used: [R] },
      { name: "pandas", used: [R] },
    ],
  },
  {
    group: "Mobile",
    items: [
      { name: "Flutter", used: [R] },
      { name: "Dart", used: [R] },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", used: [S, M, R] },
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
    detail: "B.Tech, Computer Science and Engineering",
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
