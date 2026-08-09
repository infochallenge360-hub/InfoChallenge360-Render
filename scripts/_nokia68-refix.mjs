// One-shot: resolve exact Commons file titles to URLs (with retry) and download, for the 14 QA-flagged E68 slugs.
import { writeFileSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";

async function fetchWithRetry(url, tries = 6, baseDelay = 4000) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (r.ok) return r;
    await new Promise((res) => setTimeout(res, baseDelay * (i + 1)));
  }
  throw new Error("failed after retries: " + url);
}

async function urlFor(file) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + file)}&prop=imageinfo&iiprop=url&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  const j = await r.json();
  const p = Object.values(j.query.pages)[0];
  return p?.imageinfo?.[0]?.thumburl || p?.imageinfo?.[0]?.url;
}

const map = {
  "nokia-3510": "Nokia 3510 (2002).jpg",
  "nokia-3410": "Nokia 3410 (6).jpg",
  "nokia-n70": "Nokia N70.JPG",
  "nokia-7110": "Nokia 7110 (2016-06-17).jpg",
  "nokia-lumia-520": "Nokia Lumia 520 Black.jpg",
  "nokia-9210-communicator": "Nokia 9210 RAE-5N.jpg",
  "nokia-6310i": "Nokia 6310i.jpg",
  "nokia-5210": "Nokia 5210.jpg",
  "nokia-2110i": "Nokia 2110i (2016-06-17).jpg",
  "nokia-1208": "Nokia 1208 ubt.JPG",
  "nokia-lumia-1520": "Nokia Lumia 1520.jpg",
  "nokia-e5": "Nokia E5.png",
  "nokia-6-2017": "Nokia 6 resting.jpg",
  "nokia-lumia-900": "Nokia Lumia 900.jpg",
};

const results = {};
for (const [slug, file] of Object.entries(map)) {
  try {
    const url = await urlFor(file);
    results[slug] = { file, url };
    console.log(slug, "->", url);
  } catch (e) {
    results[slug] = { file, error: String(e) };
    console.log(slug, "URL LOOKUP FAILED:", e.message);
  }
  await new Promise((r) => setTimeout(r, 2000));
}
writeFileSync("out/nokia68-refix-urls.json", JSON.stringify(results, null, 2));
console.log("done");
