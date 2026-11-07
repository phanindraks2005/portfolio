// Every number here is from the projects' audit and progress notes; the note each one comes from is in `source`.
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  how: string;
  link: { href: string; text: string };
  color: string;
  source: string;
};

export const stats: Stat[] = [
  {
    prefix: "52 → ",
    value: 95,
    suffix: "+",
    label: "MediVault dashboard, mobile Lighthouse performance",
    how: "Layout shift went from 0.306 to 0 once the grid stopped jumping when data arrived. Re-runs scored 95–99.",
    link: { href: "/projects/medivault#results", text: "MediVault case study" },
    color: "#2dd4bf",
    source: "medivault/notes/AUDIT.md M12, c22ca77",
  },
  {
    value: 3491,
    label: "clicks in MediVault’s click-through audit, over 299 page loads",
    how: "A Playwright crawler clicked every control on every page. With Stride’s 1,100+ clicks it found 21 issues; all 21 were fixed and re-tested on the live sites.",
    link: { href: "/projects/medivault#results", text: "How it was tested" },
    color: "#2dd4bf",
    source: "medivault/notes/AUDIT-CLICKTHROUGH.md, stride/notes/AUDIT-CLICKTHROUGH.md",
  },
  {
    value: 7,
    suffix: " / 7",
    label: "MediVault API routes that answer 401 without a login token",
    how: "Checked on a fresh Supabase project. The cross-account file read I found in my audit now returns 404.",
    link: { href: "/#bug-file-access", text: "The file-access bug" },
    color: "#2dd4bf",
    source: "medivault/notes/PROGRESS.md 2026-11-02, AUDIT.md H1",
  },
  {
    value: 15,
    label: "database tables, every one with row-level security",
    how: "Stride’s 9 and MediVault’s 6, each limited to auth.uid() = user_id. MediVault’s were tested with a second account and the anon key.",
    link: { href: "/projects/stride#security", text: "Security approach" },
    color: "#c6f432",
    source: "stride and medivault schema.sql table lists, medivault PROGRESS security checks",
  },
  {
    value: 0,
    label: "real secrets in the full git history of my 6 repos",
    how: "gitleaks over every branch plus a regex scan of every diff. Its one hit was the public hash of a demo token.",
    link: { href: "/projects/medivault#security", text: "How keys are kept" },
    color: "#4f7cff",
    source: "_private/GITHUB-AUDIT.md",
  },
  {
    value: 5,
    label: "tool calls Libra can run in one message, every one of them",
    how: "“Log 300 ml water and 20 g protein” now logs both, confirmed in the database; a call that fails is named, never claimed.",
    link: { href: "/#bug-libra-tools", text: "The Libra bug" },
    color: "#c6f432",
    source: "stride/notes/PROGRESS.md 6ba60b2",
  },
];
