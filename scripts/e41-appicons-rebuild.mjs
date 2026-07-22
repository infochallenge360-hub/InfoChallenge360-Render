import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { APP_ICONS_E41 } from "../src/Quiz/appIconsE41Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/app-icons";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      if (r.ok) return r;
      await new Promise((res) => setTimeout(res, 2000));
    } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  return null;
}

// Curated slug -> Simple Icons CDN slug. This is the PRIMARY source: a maintained icon
// library purpose-built for this use case, avoiding the wrong-title-collision risk that
// hit loose Wikipedia/Commons keyword search (Facebook->"Boid", Netflix->phone-plan ad, etc).
const SI = {
  whatsapp: "whatsapp", instagram: "instagram", facebook: "facebook", youtube: "youtube",
  tiktok: "tiktok", google: "google", gmail: "gmail", "google-maps": "googlemaps",
  "x-twitter": "x", netflix: "netflix", spotify: "spotify", uber: "uber", amazon: "amazon",
  paypal: "paypal", zoom: "zoom", telegram: "telegram", "facebook-messenger": "messenger",
  snapchat: "snapchat", linkedin: "linkedin", pinterest: "pinterest", discord: "discord",
  reddit: "reddit", skype: "skype", wechat: "wechat", twitch: "twitch", airbnb: "airbnb",
  ebay: "ebay", "google-drive": "googledrive", dropbox: "dropbox", roblox: "roblox",
  "booking-com": "bookingdotcom", duolingo: "duolingo", shazam: "shazam",
  vlc: "vlcmediaplayer", tripadvisor: "tripadvisor", "google-photos": "googlephotos",
  notion: "notion", slack: "slack", trello: "trello", threads: "threads", bereal: "bereal",
  signal: "signal", capcut: "capcut", headspace: "headspace", calm: "calm", fitbit: "fitbit",
  strava: "strava", venmo: "venmo", robinhood: "robinhood", coinbase: "coinbase",
  "line-app": "line", letterboxd: "letterboxd", evernote: "evernote", revolut: "revolut",
  obsidian: "obsidian", todoist: "todoist", figma: "figma", postman: "postman",
  onepassword: "1password", bitwarden: "bitwarden", feedly: "feedly", asana: "asana",
  basecamp: "basecamp", yelp: "yelp", nextdoor: "nextdoor", goodreads: "goodreads",
  flipboard: "flipboard", overcast: "overcast", anki: "anki", "toggl-track": "toggl",
  grab: "grab", kakaotalk: "kakaotalk",
};

async function trySimpleIcons(si) {
  const url = `https://wsrv.nl/?url=cdn.simpleicons.org/${si}&output=png&w=1024`;
  const r = await fetchWithRetry(url);
  if (!r) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 300) return null;
  return buf;
}

const report = [];
for (const item of APP_ICONS_E41) {
  const si = SI[item.slug];
  console.log(`${item.slug} -> simpleicons:${si}`);
  if (!si) {
    console.log("  NO SI MAPPING — leaving existing file, needs manual check");
    report.push({ slug: item.slug, status: "no-si-mapping" });
    continue;
  }
  const buf = await trySimpleIcons(si);
  if (!buf) {
    console.log("  SI fetch failed — leaving existing file, needs manual check");
    report.push({ slug: item.slug, si, status: "si-fetch-failed" });
    await new Promise((r) => setTimeout(r, 400));
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.png`, buf);
  console.log(`  OK (${buf.length} bytes)`);
  report.push({ slug: item.slug, si, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 400));
}

writeFileSync("out/e41-appicons-rebuild-report.json", JSON.stringify(report, null, 2));
const ok = report.filter((r) => r.status === "ok").length;
const bad = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${ok}/${report.length} rebuilt via Simple Icons. Needs manual attention: ${bad.map((m) => m.slug).join(", ") || "none"}`);
