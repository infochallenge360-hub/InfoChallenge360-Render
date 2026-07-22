import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/app-icons";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 6000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
}

// Missing slug -> Simple Icons CDN slug.
const SIMPLE_ICONS = {
  tiktok: "tiktok",
  "candy-crush": "candycrushsaga",
  duolingo: "duolingo",
  tripadvisor: "tripadvisor",
  notion: "notion",
  slack: "slack",
  capcut: "capcut",
  headspace: "headspace",
  myfitnesspal: "myfitnesspal",
  strava: "strava",
  venmo: "venmo",
  robinhood: "robinhood",
  coinbase: "coinbase",
  letterboxd: "letterboxd",
  evernote: "evernote",
  todoist: "todoist",
  onepassword: "1password",
  asana: "asana",
  basecamp: "basecamp",
  goodreads: "goodreads",
  overcast: "overcast",
  "toggl-track": "toggl",
};

const report = [];
for (const [slug, si] of Object.entries(SIMPLE_ICONS)) {
  const dest = `${DEST}/${slug}.png`;
  console.log(slug);
  const url = `https://wsrv.nl/?url=cdn.simpleicons.org/${si}&output=png&w=1024`;
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) {
    console.log("  download failed");
    report.push({ slug, si, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 500));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 200) {
    console.log("  file too small, skip");
    report.push({ slug, si, url, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via simple-icons+wsrv`);
  report.push({ slug, si, url, source: "simple-icons+wsrv", status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 500));
}

writeFileSync("out/e41-appicons-fallback-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
