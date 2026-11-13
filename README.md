# Portfolio

Personal site of K S Phanindra, full-stack developer (CSE, BMS College of Engineering, Bengaluru, 2023–2027).

**Live:** https://phanindra-ks.vercel.app

## What's on it

- **Projects as scroll stories:** Stride, MediVault and RoadSense. The device stays pinned while the steps scroll, and its screen follows the step. Recordings come from the live demos at [stride-ks.vercel.app/demo](https://stride-ks.vercel.app/demo) and [medivault-ks.vercel.app/demo](https://medivault-ks.vercel.app/demo). RoadSense has no live site, so it's shown with drawings of its detection rules.
- **Case studies** at `/projects/stride`, `/projects/medivault` and `/projects/roadsense`: the problem, what was built, an architecture diagram, the stack and why, the hardest parts, the security approach, results and what's next.
- **Bugs I've killed:** four real bugs with symptom, root cause, fix and the code.
- **How I tested it:** numbers from the projects' own audits.
- **Resume** at `/resume` (HTML, printable) and `/resume.pdf`.
- Ctrl+K command menu, smooth scrolling on desktop, `prefers-reduced-motion` respected throughout.

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lenis, Geist and Inter via `next/font`, brand icons from simple-icons. Every page is prerendered as static HTML.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` pages: home, `resume/`, `projects/[slug]/`, `opengraph-image.tsx`, `icon.svg`
- `components/` sections (Hero, Projects, ProjectStory, Bugs, Verified, About, Experience, Contact), the command palette and the shared nav and footer
- `lib/` content: `data.ts` (projects, skills, experience), `stories.ts` (scroll steps), `cases.ts` (case studies), `bugs.ts`, `verified.ts`, `resume.ts`
- `public/media/` screen recordings (WebM + MP4 + WebP poster), `public/shots/` screenshots
