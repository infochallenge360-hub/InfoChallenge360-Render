import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/fastfood";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function infoboxImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=wikitext&section=0&page=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const wt = j.parse?.wikitext?.["*"] || "";
  if (/^#REDIRECT/i.test(wt.trim())) return "REDIRECT";
  const m = wt.match(/\|\s*(?:logo|image)\s*=\s*([^\n|]+)/i);
  return m ? m[1].trim().replace(/^File:/i, "") : null;
}

async function resolveTitle(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return title;
  const j = await r.json();
  return Object.values(j.query.pages)[0]?.title || title;
}

async function localFileUrl(filename) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + filename)}&prop=imageinfo&iiprop=url&iiurlwidth=800`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const info = page.imageinfo?.[0];
  return info ? (info.thumburl || info.url) : null;
}

const TARGETS = {
  "mcdonalds": "McDonald's",
  "kfc": "KFC",
  "burger-king": "Burger King",
  "subway": "Subway (restaurant)",
  "pizza-hut": "Pizza Hut",
  "dominos-pizza": "Domino's",
  "starbucks": "Starbucks",
  "taco-bell": "Taco Bell",
  "dunkin": "Dunkin'",
  "wendys": "Wendy's",
  "papa-johns": "Papa Johns",
  "chick-fil-a": "Chick-fil-A",
  "baskin-robbins": "Baskin-Robbins",
  "popeyes": "Popeyes",
  "dairy-queen": "Dairy Queen",
  "little-caesars": "Little Caesars",
  "panda-express": "Panda Express",
  "five-guys": "Five Guys",
  "hardees": "Hardee's",
  "carls-jr": "Carl's Jr.",
  "sonic-drive-in": "Sonic Drive-In",
  "chipotle": "Chipotle Mexican Grill",
  "panera-bread": "Panera Bread",
  "jimmy-johns": "Jimmy John's",
  "arbys": "Arby's",
  "in-n-out-burger": "In-N-Out Burger",
  "jack-in-the-box": "Jack in the Box",
  "krispy-kreme": "Krispy Kreme",
  "tim-hortons": "Tim Hortons",
  "nandos": "Nando's",
  "shake-shack": "Shake Shack",
  "wingstop": "Wingstop",
  "churchs-chicken": "Church's Chicken",
  "whataburger": "Whataburger",
  "culvers": "Culver's",
  "zaxbys": "Zaxby's",
  "jollibee": "Jollibee",
  "aw-restaurants": "A&W Restaurants",
  "long-john-silvers": "Long John Silver's",
  "el-pollo-loco": "El Pollo Loco",
  "raising-canes": "Raising Cane's",
  "bojangles": "Bojangles (restaurant)",
  "cook-out": "Cook Out (restaurant)",
  "del-taco": "Del Taco",
  "white-castle": "White Castle (restaurant)",
  "checkers-rallys": "Checkers and Rally's",
  "freddys": "Freddy's Frozen Custard & Steakburgers",
  "captain-ds": "Captain D's",
  "fatburger": "Fatburger",
  "skyline-chili": "Skyline Chili",
  "portillos": "Portillo's Restaurants",
  "braums": "Braum's",
  "steak-n-shake": "Steak 'n Shake",
  "wienerschnitzel": "Wienerschnitzel",
  "nathans-famous": "Nathan's Famous",
  "habit-burger-grill": "Habit Burger Grill",
  "golden-chick": "Golden Chick",
  "mod-pizza": "MOD Pizza",
  "blaze-pizza": "Blaze Pizza",
  "noodles-company": "Noodles & Company",
  "which-wich": "Which Wich",
  "firehouse-subs": "Firehouse Subs",
  "jersey-mikes": "Jersey Mike's Subs",
  "charleys-philly-steaks": "Charleys Philly Steaks",
  "slim-chickens": "Slim Chickens",
  "pdq": "PDQ (restaurant)",
  "golden-corral": "Golden Corral",
  "lotteria": "Lotteria",
  "mos-burger": "MOS Burger",
  "steers": "Steers",
  "quick": "Quick (restaurant)",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.png`;
  console.log(`${slug} (${title})`);
  let realTitle = title;
  let filename = await infoboxImage(title);
  if (filename === "REDIRECT") {
    realTitle = await resolveTitle(title);
    await new Promise((r) => setTimeout(r, 600));
    filename = await infoboxImage(realTitle);
  }
  if (!filename || filename === "REDIRECT") { console.log("  no infobox image found"); report.push({ slug, title, status: "no-infobox-image" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const url = await localFileUrl(filename);
  if (!url) { console.log(`  file "${filename}" not resolvable`); report.push({ slug, title, filename, status: "unresolvable" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, filename, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) { console.log("  file too small, skip"); report.push({ slug, title, filename, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) ${filename}`);
  report.push({ slug, title, filename, url, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e27-fastfood-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
