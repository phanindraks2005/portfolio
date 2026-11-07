import {
  siDart,
  siFastapi,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siRender,
  siScikitlearn,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  "Framer Motion": siFramer,
  Flutter: siFlutter,
  Dart: siDart,
  "Node.js": siNodedotjs,
  FastAPI: siFastapi,
  Python: siPython,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  SQLite: siSqlite,
  "Gemini API": siGooglegemini,
  "scikit-learn": siScikitlearn,
  pandas: siPandas,
  Git: siGit,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  Render: siRender,
};

// Logos that are black (or near it) get the page's ink colour so they stay visible on dark.
const dark = new Set(["000000", "181717", "150458", "003B57", "02569B"]);

export function BrandIcon({ name, size = 16, mono = false }: { name: string; size?: number; mono?: boolean }) {
  const icon = brands[name];
  if (!icon) return null;
  const fill = mono || dark.has(icon.hex) ? "currentColor" : `#${icon.hex}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} fill={fill} />
    </svg>
  );
}

export function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={siGithub.path} fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  );
}
