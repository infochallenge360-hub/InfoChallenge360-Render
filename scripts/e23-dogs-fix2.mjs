import { writeFileSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

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

async function commonsSearch(query, limit = 8) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const pages = j.query?.pages || {};
  return Object.values(pages).map((p) => ({
    title: p.title,
    url: p.imageinfo?.[0]?.thumburl,
    mime: p.imageinfo?.[0]?.mime,
    license: p.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value,
  })).filter((x) => x.url);
}

const QUERIES = {
  "cocker-spaniel": "Cocker Spaniel dog -people -handler",
  "beagle": "Beagle dog standing -handler -person",
  "whippet": "Whippet dog standing side",
  "vizsla": "Vizsla dog standing",
  "belgian-malinois": "Belgian Malinois dog standing single",
  "xoloitzcuintli": "Xoloitzcuintli dog standing -banner",
  "azawakh": "Azawakh dog standing",
};

for (const [slug, q] of Object.entries(QUERIES)) {
  console.log(`\n=== ${slug} : "${q}" ===`);
  const cands = await commonsSearch(q);
  for (const c of cands) {
    console.log(`  ${c.mime} | ${c.license} | ${c.title}`);
    console.log(`    ${c.url}`);
  }
  await new Promise((res) => setTimeout(res, 800));
}
