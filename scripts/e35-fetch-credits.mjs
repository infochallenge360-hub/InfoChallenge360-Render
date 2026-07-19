import { writeFileSync, readFileSync } from "node:fs";
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

const all = JSON.parse(readFileSync("out/e35-all-sources.json", "utf8"));

// These 3 were fixed via manual one-off commands after the tracked fetch scripts got them wrong —
// override the stale report entries with the actual final filenames used.
const OVERRIDES = {
  "agrigento-valley-of-temples": "Concordiatempel_Tempio_della_Temple_of_Concordia_de_la_Concorde_Tal_der_Tempel_Valle_dei_Templi_Agrigento_Sizilien_Foto_Wolfgang_Pehlemann_DSC07490.jpg",
  "byblos": "ByblosObeliskTemple.jpg",
  "loulan-ruins": "楼兰古城_Loulan_city_China_Xinjiang_Urumqi_Welcome_you_to_tour_the_-_panoramio.jpg",
};

function filenameFromUrl(url) {
  const parts = url.split("/");
  const thumbIdx = parts.indexOf("thumb");
  if (thumbIdx >= 0) return decodeURIComponent(parts[thumbIdx + 3]);
  return decodeURIComponent(parts[parts.length - 1]);
}

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  return null;
}

const items = all.map((r) => ({ slug: r.slug, filename: OVERRIDES[r.slug] || filenameFromUrl(r.url) }));

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, "").trim();
const results = {};
const BATCH = 12;
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
  console.log(`batch ${i}-${i + batch.length} done, resolved so far: ${Object.keys(results).length}`);
  await new Promise((r) => setTimeout(r, 1200));
}

const out = items.map((it) => ({ slug: it.slug, filename: it.filename, ...(results[it.slug] || { license: "missing", artist: "" }) }));
writeFileSync("out/e35-ruins-credits.json", JSON.stringify(out, null, 2));
console.log("done", out.length);
for (const o of out) console.log(o.slug, "->", o.license, "|", o.artist);
