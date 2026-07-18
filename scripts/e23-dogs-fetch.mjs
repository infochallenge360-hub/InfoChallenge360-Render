import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { DOG_BREEDS_E23 } from "../src/Quiz/dogBreedsE23Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/dogs";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function wikiImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page.thumbnail ? page.thumbnail.source : null;
}

const results = [];
for (const item of DOG_BREEDS_E23) {
  const dest = `${DEST}/${item.slug}.jpg`;
  console.log(`fetching ${item.slug} (${item.name})...`);
  try {
    const url = await wikiImage(item.name);
    if (!url) {
      console.log(`  no wiki image found`);
      results.push({ slug: item.slug, name: item.name, status: "missing" });
      await new Promise((res) => setTimeout(res, 800));
      continue;
    }
    const r = await fetchWithRetry(url);
    if (!r || !r.ok) {
      console.log(`  download failed`);
      results.push({ slug: item.slug, name: item.name, status: "missing" });
      await new Promise((res) => setTimeout(res, 800));
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  OK (${buf.length} bytes) from ${url}`);
    results.push({ slug: item.slug, name: item.name, status: "ok", size: buf.length, url });
  } catch (e) {
    console.log(`  error: ${e.message}`);
    results.push({ slug: item.slug, name: item.name, status: "error", error: e.message });
  }
  await new Promise((res) => setTimeout(res, 800));
}

writeFileSync("out/e23-fetch-report.json", JSON.stringify(results, null, 2));
const missing = results.filter((r) => r.status === "missing" || r.status === "error");
console.log(`\nDone. ${results.length - missing.length}/${results.length} ok. Missing: ${missing.map((m) => m.slug).join(", ")}`);
