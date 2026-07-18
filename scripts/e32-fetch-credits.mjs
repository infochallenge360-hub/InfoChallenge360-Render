import { writeFileSync, readFileSync } from "node:fs";
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const report = JSON.parse(readFileSync("out/e32-castles-fetch-report.json", "utf8"));

function filenameFromUrl(url) {
  const parts = url.split("/");
  const thumbIdx = parts.indexOf("thumb");
  if (thumbIdx >= 0) return decodeURIComponent(parts[thumbIdx + 3]);
  return decodeURIComponent(parts[parts.length - 1]);
}

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 6000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  return null;
}

const items = report.filter((r) => r.status === "ok" && r.source === "pageimages")
  .map((r) => ({ ...r, filename: filenameFromUrl(r.url) }));

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, "").trim();
const results = {};
const BATCH = 15;
for (let i = 0; i < items.length; i += BATCH) {
  const batch = items.slice(i, i + BATCH);
  const titles = batch.map((b) => "File:" + b.filename).join("|");
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=extmetadata`;
  const r = await fetchWithRetry(api);
  if (r && r.ok) {
    const j = await r.json();
    const pages = Object.values(j.query?.pages || {});
    for (const p of pages) {
      const meta = p.imageinfo?.[0]?.extmetadata;
      const norm = (j.query?.normalized || []).find((n) => n.to === p.title);
      const origFilename = norm ? norm.from.replace(/^File:/, "") : p.title.replace(/^File:/, "");
      const item = batch.find((b) => b.filename === origFilename || b.filename.replace(/_/g, " ") === p.title.replace(/^File:/, ""));
      if (item) {
        results[item.slug] = meta ? {
          license: meta.LicenseShortName?.value || "Unknown",
          artist: stripHtml(meta.Artist?.value) || "Unknown",
        } : { license: "not-found", artist: "" };
      }
    }
  }
  console.log(`batch ${i}-${i+batch.length} done, resolved so far: ${Object.keys(results).length}`);
  await new Promise((r) => setTimeout(r, 1200));
}

const out = items.map((it) => ({ slug: it.slug, title: it.title, filename: it.filename, ...(results[it.slug] || { license: "missing", artist: "" }) }));
writeFileSync("out/e32-castles-credits.json", JSON.stringify(out, null, 2));
console.log("done", out.length);
for (const o of out) console.log(o.slug, "->", o.license, "|", o.artist);
