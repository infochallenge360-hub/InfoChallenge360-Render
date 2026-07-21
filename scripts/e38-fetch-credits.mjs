import { writeFileSync } from "node:fs";
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

function filenameFromUrl(url) {
  const parts = url.split("/");
  const thumbIdx = parts.indexOf("thumb");
  if (thumbIdx >= 0) return decodeURIComponent(parts[thumbIdx + 3]);
  return decodeURIComponent(parts[parts.length - 1]);
}

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  return null;
}

// slug -> exact Commons filename, verified against actual saved image content this session
const FILES = {
  "phillie-phanatic": "Phillie_Phanatic.jpg",
  "gritty": "Gov._Wolf_Joins_Philadelphia_Flyers_Organization_to_Encourage_Pennsylvanians_to_'Take_Your_Shot'_(51156977424)_(cropped).jpg",
  "san-diego-chicken": "SDChicken.jpg",
  "mr-met": "Mr_Met_Gotham_NC_Courage_Mar_21_2026-19_(cropped).jpg",
  "benny-the-bull": "20180206_UM-NW_Benny_The_Bull_7DM27126.jpg",
  "gunnersaurus": "Gunnersaurus_rex.jpg",
  "rocky-nuggets": "Rocky_at_Buckley_1.jpg",
  "youppi": "Youppi.jpg",
  "bevo": "Bevo-01.jpg",
  "ralphie": "Ralphie_the_CU_Buffalo_at_the_Big12_Championship_football_game_2005.JPG",
  "chief-osceola": "Chief_Osceola_and_renegade_taken_at_the_2011_Miami_game_in_Tallahassee,_FL.jpg",
  "misha-bear": "1980_USSR_stamp_Olympic_mascot.jpg",
  "sluggerrr": "Sluggerrr.JPG",
  "wally-green-monster": "Wally_the_green_monster.jpg",
  "fredbird": "Fredbird,_background,_the_team_mascot_for_the_St_130408-F-RN211-050.jpg",
  "kc-wolf": "KC_Wolf.JPG",
  "bernie-brewer": "Bernie_brewer_in_dugout.jpg",
  "clutch-the-bear": "Houston_rockets_mascot.JPG",
  "stuff-magic-dragon": "US_Navy_071127-N-6936D-265_Members_of_the_Orlando_Magic_Dancers_and_STUFF_the_Magic_Dragon_sign_autographs_for_Sasebo_Sailors_and_their_families_during_the_Pacific-leg_of_an_Armed_Forces_Entertainment_tour.jpg",
  "lou-seal": "Lou_seal_giants_mascot.jpg",
  "brutus-buckeye": "Brutus_Buckeye_in_2017.jpg",
  "bucky-badger": "BuckinghamUBadger.jpg",
  "big-al": "Alabama_Big_Al,_2024_(cropped).jpg",
  "mike-the-tiger": "Mike_VII.jpg",
  "oregon-duck": "The_Oregon_Duck_in_2011.jpg",
  "zabivaka": "Rus-IvoryCoast_(13).jpg",
  "fred-the-red": "Fred_the_Red.jpg",
  "slider": "Slider_and_the_Dogs_with_the_Cleveland_Strikers_(52649545351).jpg",
  "dinger": "Rockiesdinger.JPG",
  "pirate-parrot": "Pirate_parrot_pirates_mascot.jpg",
  "billy-the-marlin": "Billy_the_Marlin_2011.jpg",
  "testudo": "UMD_Testudo_Statue.JPG",
  "reveille": "Reveille-TAMU-Mascot.JPG",
  "traveler": "Usctravelerandband.jpg",
  "sparky-sun-devil": "Sparky_on_the_Field.jpg",
  "otto-the-orange": "Otto_the_Orange_2013.jpg",
  "stanford-tree": "Stanford_Tree_at_2008_Big_Game.JPG",
  "smokey": "BTSmokey.JPG",
  "zampa-the-lion": "Zampa_the_lion_125_anniversary_game.jpg",
  "cyril-the-swan": "Cyril_the_swan.JPG",
  "moonchester": "Moonchester_and_Moonbeam_(36243867680).jpg",
  "billy-the-badger": "Billy_the_Badger_04012026_(1).jpg",
  "berni": "Berni_Bayern.jpg",
  "chirpy-cockerel": "Tottenham_Hotspur_LFC_v_West_Ham_United_LFC,_19_April_2017_(004).jpg",
  // manually re-fetched/verified this session
  "suns-gorilla": "Optreden_van_de_Phoenix_Suns_Gorilla_tijdens_de_Haarlemse_Basketbalweek_in_de_Kennemer_Sporthal._NL-HlmNHA_5400465482.JPG",
  "uga": "Ugaviwikiphoto.jpg",
  "blue-colts": "Colts_mascot_Blue_(cropped).jpg",
  "zakumi": "HK_Causeway_Bay_Times_Square_evening_South_Africa_World_Cup_2010_Icon_figure_Zakumi_羅素街_Russell_Street.jpg",
  "orbit": "Orbit_Houston_Astros_mascot_preseason_2014.jpg",
  "bing-dwen-dwen": "Bing_Dwen_Dwen_at_Yanqing_Winter_Olympic_Cultural_Square.jpg",
  "hugo-the-hornet": "US_Navy_091104-N-9319B-099_Rear_Adm._Victor_G._Guillory_watches_the_mascot_for_the_New_Orleans_Hornets.jpg",
  "world-cup-willie": "National_Football_Museum_Manchester_5697_(14180312576).jpg",
  "cosmo-cougar": "Cosmo_Cougar_Waving_the_BYU_Flag_After_Another_BYU_Touchdown_(5273318912).jpg",
  "handsome-dan": "Handsome_Dan_(original_mascot).jpg",
  "iceburgh": "Iceburgh.jpg",
  "sir-purr": "Sir_Purr_2016.jpeg",
  "t-rac": "Tennessee_Titans_mascot_T-Rac.png",
  "cocky": "Cockyspringgame.jpg",
  "rumble-bison": "Rumble_the_bison.png",
  "youdee": "YoUDee_Laying_Down.jpg",
  "purdue-pete": "Purdue_Pete_modern.jpg",
  "sebastian-ibis": "Sebastian_the_Ibis.jpg",
  "rowdy-utsa": "Rowdy_UTSA_2021_1.jpg",
  "cy-cardinal": "2018-0716-Big12MD-Cy.jpg",
  "herky-hawk": "Herky.jpg",
  "sparty": "Sparty.jpg",
  "goldy-gopher": "University_of_Minnesota's_mascot_Goldy_Gopher_at_the_women's_basketball_game.jpg",
  "blitz-seahawks": "Blitz_Seattle_Seahawks_Mascot.jpg",
  "pat-patriot": "Pat_Patriot_mascot_of_the_New_England_Patriots.jpg",
};
// jaxson-de-ville, screech, wild-wing intentionally excluded: fetch-report URL didn't match
// visually-confirmed saved image content, so exact source file is unverified -> flagged pending.

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, "").trim();
const results = {};
const items = Object.entries(FILES).map(([slug, filename]) => ({ slug, filename }));
const BATCH = 12;
for (let i = 0; i < items.length; i += BATCH) {
  const batch = items.slice(i, i + BATCH);
  const titles = batch.map((b) => "File:" + b.filename).join("|");
  const isEnwiki = batch.some((b) => b.filename === "Phillie_Phanatic.jpg");
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
        } : { license: "not-found-commons", artist: "" };
      }
    }
  }
  console.log(`batch ${i}-${i + batch.length} done, resolved so far: ${Object.keys(results).length}`);
  await new Promise((r) => setTimeout(r, 1500));
}

// Phillie Phanatic is a local enwiki non-free file, not Commons - handle separately
if (!results["phillie-phanatic"] || results["phillie-phanatic"].license === "not-found-commons") {
  const r = await fetchWithRetry("https://en.wikipedia.org/w/api.php?action=query&format=json&titles=File:Phillie_Phanatic.jpg&prop=imageinfo&iiprop=extmetadata");
  if (r && r.ok) {
    const j = await r.json();
    const p = Object.values(j.query?.pages || {})[0];
    const meta = p?.imageinfo?.[0]?.extmetadata;
    results["phillie-phanatic"] = meta ? { license: meta.LicenseShortName?.value || "non-free (fair use)", artist: stripHtml(meta.Artist?.value) || "Unknown" } : { license: "non-free (fair use, enwiki-local)", artist: "" };
  }
}

const out = items.map((it) => ({ slug: it.slug, filename: it.filename, ...(results[it.slug] || { license: "missing", artist: "" }) }));
writeFileSync("out/e38-final-credits.json", JSON.stringify(out, null, 2));
console.log("done", out.length);
for (const o of out) console.log(o.slug, "->", o.license, "|", o.artist);
