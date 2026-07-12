// E08 «Guess the Logo 3» — 100 براند جديد مصنّف بالصعوبة الحقيقية (إيجينت + تحقق توفّر)
// يستبعد الـ200 المستخدمة، يزيل التكرار، يتحقق من Simple Icons، يأخذ أول 25 شغّالة/مستوى (مرتّبة بالصعوبة).
import { mkdir, writeFile } from "node:fs/promises";
import { LOGOS } from "../src/Quiz/logosData.js";
import { LOGOS2 } from "../src/Quiz/logos2Data.js";

const USED = new Set([...LOGOS, ...LOGOS2].map((l) => l.slug));

const POOL = {
  easy: [["whatsapp","WhatsApp"],["gmail","Gmail"],["paypal","PayPal"],["visa","Visa"],["mastercard","Mastercard"],["googlemaps","Google Maps"],["googleplay","Google Play"],["wikipedia","Wikipedia"],["googletranslate","Google Translate"],["googlephotos","Google Photos"],["googlemeet","Google Meet"],["googlecalendar","Google Calendar"],["googlepay","Google Pay"],["minecraft","Minecraft"],["fortnite","Fortnite"],["roblox","Roblox"],["pubg","PUBG"],["duolingo","Duolingo"],["imdb","IMDb"],["shazam","Shazam"],["walmart","Walmart"],["target","Target"],["etsy","Etsy"],["carrefour","Carrefour"],["tesco","Tesco"],["hbo","HBO"],["hulu","Hulu"],["epicgames","Epic Games"],["leagueoflegends","League of Legends"],["valorant","Valorant"],["wordpress","WordPress"],["dropbox","Dropbox"],["zoom","Zoom"],["audible","Audible"],["yelp","Yelp"],["tripadvisor","Tripadvisor"],["opera","Opera"],["brave","Brave"],["duckduckgo","DuckDuckGo"],["kodak","Kodak"]],
  medium: [["delta","Delta Air Lines"],["unitedairlines","United Airlines"],["verizon","Verizon"],["vodafone","Vodafone"],["orange","Orange"],["volvo","Volvo"],["renault","Renault"],["peugeot","Peugeot"],["fiat","Fiat"],["skoda","Skoda"],["mini","MINI"],["klarna","Klarna"],["venmo","Venmo"],["cashapp","Cash App"],["robinhood","Robinhood"],["chase","Chase"],["bankofamerica","Bank of America"],["wellsfargo","Wells Fargo"],["barclays","Barclays"],["figma","Figma"],["notion","Notion"],["trello","Trello"],["canva","Canva"],["fiverr","Fiverr"],["upwork","Upwork"],["grammarly","Grammarly"],["evernote","Evernote"],["mailchimp","Mailchimp"],["godaddy","GoDaddy"],["namecheap","Namecheap"],["nordvpn","NordVPN"],["expressvpn","ExpressVPN"],["hubspot","HubSpot"],["zendesk","Zendesk"],["expedia","Expedia"],["deezer","Deezer"],["tidal","Tidal"],["crunchyroll","Crunchyroll"],["coursera","Coursera"],["udemy","Udemy"],["behance","Behance"],["dribbble","Dribbble"],["gopro","GoPro"]],
  hard: [["asana","Asana"],["atlassian","Atlassian"],["squarespace","Squarespace"],["wix","Wix"],["1password","1Password"],["bitwarden","Bitwarden"],["lastpass","LastPass"],["surfshark","Surfshark"],["mullvad","Mullvad"],["proton","Proton"],["protonmail","Proton Mail"],["airtable","Airtable"],["clickup","ClickUp"],["calendly","Calendly"],["typeform","Typeform"],["miro","Miro"],["coda","Coda"],["basecamp","Basecamp"],["zoho","Zoho"],["trustpilot","Trustpilot"],["wetransfer","WeTransfer"],["freelancer","Freelancer"],["webex","Webex"],["signal","Signal"],["viber","Viber"],["mastodon","Mastodon"],["bluesky","Bluesky"],["flickr","Flickr"],["deviantart","DeviantArt"],["artstation","ArtStation"],["mongodb","MongoDB"],["grafana","Grafana"],["cloudflare","Cloudflare"],["vercel","Vercel"],["digitalocean","DigitalOcean"],["snowflake","Snowflake"],["caterpillar","Caterpillar"],["johndeere","John Deere"],["hitachi","Hitachi"],["fujitsu","Fujitsu"],["toshiba","Toshiba"],["hootsuite","Hootsuite"],["nubank","Nubank"]],
  impossible: [["servicenow","ServiceNow"],["workday","Workday"],["databricks","Databricks"],["datadog","Datadog"],["splunk","Splunk"],["okta","Okta"],["auth0","Auth0"],["hashicorp","HashiCorp"],["consul","Consul"],["vault","Vault"],["nomad","Nomad"],["packer","Packer"],["saltproject","Salt Project"],["puppet","Puppet"],["couchbase","Couchbase"],["planetscale","PlanetScale"],["cockroachlabs","Cockroach Labs"],["scylladb","ScyllaDB"],["clickhouse","ClickHouse"],["neo4j","Neo4j"],["influxdb","InfluxDB"],["timescale","TimescaleDB"],["duckdb","DuckDB"],["confluent","Confluent"],["apachekafka","Apache Kafka"],["rabbitmq","RabbitMQ"],["prometheus","Prometheus"],["sentry","Sentry"],["newrelic","New Relic"],["pagerduty","PagerDuty"],["temporal","Temporal"],["prefect","Prefect"],["airbyte","Airbyte"],["mixpanel","Mixpanel"],["qlik","Qlik"],["looker","Looker"],["nxp","NXP"],["stmicroelectronics","STMicroelectronics"],["abb","ABB"],["schneiderelectric","Schneider Electric"],["rockwellautomation","Rockwell Automation"],["haxe","Haxe"],["ocaml","OCaml"],["nixos","NixOS"]],
};

await mkdir("public/logos", { recursive: true });
async function works(slug) {
  try { const r = await fetch(`https://cdn.simpleicons.org/${slug}`); const t = await r.text();
    if (r.ok && t.trimStart().startsWith("<svg")) { await writeFile(`public/logos/${slug}.svg`, t, "utf8"); return true; } } catch {}
  return false;
}

const final = [];
const seen = new Set();
for (const level of ["easy", "medium", "hard", "impossible"]) {
  let kept = 0; const misses = [];
  for (const [slug, name] of POOL[level]) {
    if (kept >= 25) break;
    if (USED.has(slug) || seen.has(slug)) continue;      // لا تكرار مع E01/E05 ولا داخلي
    if (await works(slug)) { final.push({ slug, name, level }); seen.add(slug); kept++; }
    else misses.push(slug);
  }
  console.log(`${level}: kept ${kept}/25` + (kept < 25 ? "  ⚠️ SHORT" : "") + (misses.length ? `  (skipped: ${misses.join(", ")})` : ""));
}

const body = final.map((l) => `  { slug: ${JSON.stringify(l.slug)}, name: ${JSON.stringify(l.name)}, level: ${JSON.stringify(l.level)} },`).join("\n");
await writeFile("src/Quiz/logos3Data.js", `// «Guess the Logo 3» — GuessSync · E08 · 100 براند جديد (25/مستوى) · صعوبة مُصنّفة فعلياً (سهل 90% ← مستحيل <3%)
// مُولّد بـ scripts/build-logos-e08.mjs — إيجينت صنّف بالصعوبة، تحقق توفّر Simple Icons، لا تكرار مع E01/E05.
export const LOGOS3 = [
${body}
];
export const LOGO3_LEVELS = ["easy", "medium", "hard", "impossible"];
`, "utf8");
console.log(`\nTOTAL ${final.length}/100 → src/Quiz/logos3Data.js`);
