import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { US_STATE_FLAGS_E42 } from "../src/Quiz/usStateFlagsE42Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/us-flags";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

// DC + 5 territories not covered by flagcdn — use Wikimedia Special:FilePath (stable redirector).
const COMMONS_FILE = {
  DC: "Flag_of_the_District_of_Columbia.svg",
  PR: "Flag_of_Puerto_Rico.svg",
  GU: "Flag_of_Guam.svg",
  AS: "Flag_of_American_Samoa.svg",
  VI: "Flag_of_the_United_States_Virgin_Islands.svg",
  MP: "Flag_of_the_Northern_Mariana_Islands.svg",
};

async function commonsFilePathToRaster(fileTitle, width = 1280) {
  // Special:FilePath redirects to the actual file; ask for a rendered PNG via thumb.php-style width param.
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileTitle)}?width=${width}`;
  return url;
}

const report = [];
for (const item of US_STATE_FLAGS_E42) {
  const dest = `${DEST}/${item.slug}.png`;
  console.log(`${item.slug} (${item.code})`);
  let url, source;
  if (COMMONS_FILE[item.code]) {
    url = await commonsFilePathToRaster(COMMONS_FILE[item.code]);
    source = "commons-filepath";
  } else {
    url = `https://flagcdn.com/w1280/us-${item.code.toLowerCase()}.png`;
    source = "flagcdn";
  }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) {
    console.log(`  download failed (${r?.status})`);
    report.push({ slug: item.slug, code: item.code, url, source, status: "download-fail", httpStatus: r?.status });
    await new Promise((res) => setTimeout(res, 400));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, code: item.code, url, source, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, code: item.code, url, source, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 400));
}

writeFileSync("out/e42-flags-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
