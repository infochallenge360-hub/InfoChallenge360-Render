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

async function wikiImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page.thumbnail ? page.thumbnail.source : null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const pages = j.query?.pages || {};
  return Object.values(pages).map((p) => p.imageinfo?.[0]?.thumburl).filter(Boolean);
}

const TARGETS = [
  { slug: "chihuahua", title: "Chihuahua (dog)" },
  { slug: "boxer", title: "Boxer (dog)" },
  { slug: "saint-bernard", title: "St. Bernard (dog)" },
  { slug: "maltese", title: "Maltese (dog)" },
  { slug: "dalmatian", title: "Dalmatian (dog)" },
  { slug: "pomeranian", title: "Pomeranian dog" },
  { slug: "akita", title: "Akita (dog)" },
  { slug: "samoyed", title: "Samoyed dog" },
  { slug: "papillon", title: "Papillon dog" },
  { slug: "puli", title: "Puli (dog)" },
];

for (const t of TARGETS) {
  console.log(`fetching ${t.slug} via "${t.title}"...`);
  const url = await wikiImage(t.title);
  if (!url) { console.log(`  STILL MISSING`); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log(`  download failed`); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(`public/dogs/${t.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) from ${url}`);
  await new Promise((res) => setTimeout(res, 800));
}

console.log("\ncatalburun via Commons search...");
const cands = await commonsSearch("Catalburun dog");
console.log(cands.length ? cands.join("\n") : "NO COMMONS RESULTS");
