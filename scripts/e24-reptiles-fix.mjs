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

const TARGETS = [
  { slug: "uracoan-rattlesnake", title: "Crotalus vegrandis" },
  { slug: "roti-island-snake-necked-turtle", title: "Chelodina mccordi" },
  { slug: "egyptian-tortoise", title: "Testudo kleinmanni" },
  { slug: "rhinoceros-ratsnake", title: "Gonyosoma boulengeri" },
  { slug: "feas-viper", title: "Azemiops feae" },
];

for (const t of TARGETS) {
  console.log(`fetching ${t.slug} via "${t.title}"...`);
  const url = await wikiImage(t.title);
  if (!url) { console.log(`  STILL MISSING`); await new Promise((res) => setTimeout(res, 1000)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log(`  download failed`); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(`public/reptiles/${t.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) from ${url}`);
  await new Promise((res) => setTimeout(res, 1000));
}
