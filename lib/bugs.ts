export type Bug = {
  id: string;
  project: "MediVault" | "Stride";
  color: string;
  title: string;
  symptom: string;
  cause: string;
  fix: string;
  file: string;
  code: string;
};

// Real stories from the projects' notes; code is quoted from the repos, trimmed.
export const bugs: Bug[] = [
  {
    project: "MediVault",
    color: "#2dd4bf",
    id: "bug-file-access",
    title: "Another family’s file, read by the AI",
    symptom:
      "In my own QA audit I confirmed one account could get the extraction route to download a file from another account’s folder: a cross-account read of medical records.",
    cause:
      "The route reads the stored file path with the service-role client, which ignores storage policies. The path came from a record row, so whatever path a record pointed to got downloaded.",
    fix: "The route now refuses any path outside the caller’s own folder (and any “..”), and a database check constraint requires every record’s file path to sit in its owner’s folder. The cross-account read returns 404.",
    file: "app/api/extract-record/route.ts",
    code: `// The service-role client ignores storage
// policies, so only read paths inside the
// caller's own folder.
const path: string = record.file_url || ''
if (!path.startsWith(\`\${user.id}/\`) || path.includes('..')) {
  return NextResponse.json({ error: 'Record not found' }, { status: 404 })
}`,
  },
  {
    project: "Stride",
    color: "#c6f432",
    id: "bug-libra-tools",
    title: "Libra said it logged protein. It hadn’t.",
    symptom: "“Log 300 ml water and 20 g protein” got a reply saying both were logged. Only the water was in the database.",
    cause:
      "Gemini answered with two log_entry calls. The route ran only the first and sent back one response, so the model filled in the missing one and claimed an action that never happened.",
    fix: "Every call now runs in order, a tool that throws becomes { success: false } without stopping the rest, and each call gets its own functionResponse. The reply may only report successful actions and names each failure.",
    file: "src/app/api/copilot/chat/route.js",
    code: `// Run them all, in order; one failing doesn't stop the rest.
for (const call of calls) {
  let result
  try {
    result = await executeTool(call.name, call.args, userId)
  } catch (err) {
    result = { success: false, message: 'Something went wrong while doing this.' }
  }
  results.push({ call, result })
}
// Every call needs its own response, or the model guesses at the missing ones.
parts: results.map(({ call, result }) => ({
  functionResponse: { id: call.id, name: call.name, response: result },
}))`,
  },
  {
    project: "Stride",
    color: "#c6f432",
    id: "bug-1000-rows",
    title: "History quietly stopped at 1,000 rows",
    symptom:
      "For heavy users, older history fell out of the current and best streak, the heatmaps and Progress. No error, just missing days.",
    cause:
      "The streak code read every log in one request. Supabase returns at most 1,000 rows per request and doesn’t fail when there are more.",
    fix: "Read the logs in pages with .range(), ordered by id so pages never overlap, until a page comes back short. Checked on an account with 1,424 logs over 400 days.",
    file: "src/lib/streak.js",
    code: `// Supabase returns at most 1,000 rows per request,
// so read the logs in pages.
const PAGE = 1000
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from('logs')
    .select('logged_at, tracker_id, value')
    .eq('user_id', userId)
    .order('id')
    .range(from, from + PAGE - 1)
  if (error) throw error
  logs.push(...data)
  if (data.length < PAGE) break
}`,
  },
  {
    project: "Stride",
    color: "#c6f432",
    id: "bug-grain-fog",
    title: "A fog that only showed at 125%",
    symptom: "On a Windows laptop at 125% scaling every page of Stride looked hazy. Headless screenshots at 1× looked perfectly sharp.",
    cause:
      "At devicePixelRatio 1.5 the 96 px film-grain tile laid over the whole page was upscaled into a soft fog. Testing at 1× hid it; I found it by measuring in a real browser at the real scale.",
    fix: "Removed the full-page grain. The only grain left is a faint 2.5% tile at 48 px inside the landing hero, drawn small enough to stay sharp. No full-page layer sits above content any more.",
    file: "src/app/page.module.css",
    code: `/* Before: a 96 px grain tile on body::after, over every page */

/* After: the only grain left, faint and in the hero,
   drawn at device pixels so it stays sharp */
.hero::after {
  content: ''; position: absolute; inset: 0; z-index: -1;
  background-image: url("/grain.png");
  background-size: 48px 48px;
  opacity: .025;
}`,
  },
];
