// E10 «Guess the Logo 4» — ~130 براند تقني/أعمال (الطول الجديد) · مصنّف · يستبعد 300 مستخدم
import { mkdir, writeFile } from "node:fs/promises";
import { LOGOS } from "../src/Quiz/logosData.js";
import { LOGOS2 } from "../src/Quiz/logos2Data.js";
import { LOGOS3 } from "../src/Quiz/logos3Data.js";
const USED = new Set([...LOGOS, ...LOGOS2, ...LOGOS3].map((l) => l.slug));

const POOL = {
  easy: [["snapchat","Snapchat"],["twitch","Twitch"],["playstation","PlayStation"],["messenger","Messenger"],["wechat","WeChat"],["skype","Skype"],["firefox","Firefox"],["googlechrome","Google Chrome"],["safari","Safari"],["opera","Opera"],["icloud","iCloud"],["huawei","Huawei"],["xiaomi","Xiaomi"],["nokia","Nokia"],["motorola","Motorola"],["mastercard","Mastercard"],["visa","Visa"],["americanexpress","American Express"],["cashapp","Cash App"],["alipay","Alipay"],["roblox","Roblox"],["minecraft","Minecraft"],["soundcloud","SoundCloud"],["duckduckgo","DuckDuckGo"],["brave","Brave"],["stackoverflow","Stack Overflow"],["quora","Quora"],["medium","Medium"],["aliexpress","AliExpress"],["etsy","Etsy"],["ikea","IKEA"],["bose","Bose"],["jbl","JBL"],["emirates","Emirates"],["lyft","Lyft"],["firebase","Firebase"],["wolfram","WolframAlpha"],["lenovo","Lenovo"],["acer","Acer"],["oneplus","OnePlus"]],
  medium: [["oppo","OPPO"],["vivo","Vivo"],["razer","Razer"],["msi","MSI"],["corsair","Corsair"],["seagate","Seagate"],["qualcomm","Qualcomm"],["mediatek","MediaTek"],["sennheiser","Sennheiser"],["sonos","Sonos"],["beats","Beats"],["denon","Denon"],["revolut","Revolut"],["wise","Wise"],["monzo","Monzo"],["payoneer","Payoneer"],["square","Square"],["afterpay","Afterpay"],["vimeo","Vimeo"],["dailymotion","Dailymotion"],["tidal","Tidal"],["pandora","Pandora"],["hbomax","HBO Max"],["paramountplus","Paramount+"],["appletv","Apple TV"],["plex","Plex"],["kodi","Kodi"],["vivaldi","Vivaldi"],["ecosia","Ecosia"],["baidu","Baidu"],["naver","Naver"],["bilibili","Bilibili"],["rakuten","Rakuten"],["salesforce","Salesforce"],["hubspot","HubSpot"],["zendesk","Zendesk"],["mailchimp","Mailchimp"],["zapier","Zapier"],["gimp","GIMP"],["blender","Blender"]],
  hard: [["sketch","Sketch"],["framer","Framer"],["inkscape","Inkscape"],["krita","Krita"],["autocad","AutoCAD"],["sketchup","SketchUp"],["konami","Konami"],["activision","Activision"],["valve","Valve"],["supercell","Supercell"],["mihoyo","miHoYo"],["intercom","Intercom"],["semrush","Semrush"],["hootsuite","Hootsuite"],["buffer","Buffer"],["googlecloud","Google Cloud"],["alibabacloud","Alibaba Cloud"],["supabase","Supabase"],["huggingface","Hugging Face"],["perplexity","Perplexity"],["elevenlabs","ElevenLabs"],["ollama","Ollama"],["kaggle","Kaggle"],["postman","Postman"],["mariadb","MariaDB"],["framer","Framer"],["sketch","Sketch"],["konami","Konami"],["semrush","Semrush"],["buffer","Buffer"],["notion","Notion"],["miro","Miro"],["airtable","Airtable"],["netlify","Netlify"],["heroku","Heroku"]],
  impossible: [["appwrite","Appwrite"],["pocketbase","PocketBase"],["nhost","Nhost"],["hasura","Hasura"],["fauna","Fauna"],["drizzle","Drizzle ORM"],["trpc","tRPC"],["camunda","Camunda"],["retool","Retool"],["appsmith","Appsmith"],["budibase","Budibase"],["scaleway","Scaleway"],["hetzner","Hetzner"],["vultr","Vultr"],["envoyproxy","Envoy"],["istio","Istio"],["linkerd","Linkerd"],["rancher","Rancher"],["apachepulsar","Apache Pulsar"],["apacheflink","Apache Flink"],["apachedruid","Apache Druid"],["apachenifi","Apache NiFi"],["mlflow","MLflow"],["dvc","DVC"],["milvus","Milvus"],["qdrant","Qdrant"],["honeybadger","Honeybadger"],["rollbar","Rollbar"],["opsgenie","Opsgenie"],["checkmarx","Checkmarx"],["qualys","Qualys"],["parrotsecurity","Parrot Security"],["nxp","NXP"],["espressif","Espressif"],["nordicsemiconductor","Nordic Semiconductor"]],
};
const TARGET = { easy: 25, medium: 35, hard: 35, impossible: 35 }; // = 130

await mkdir("public/logos", { recursive: true });
async function works(slug) {
  try { const r = await fetch(`https://cdn.simpleicons.org/${slug}`); const t = await r.text();
    if (r.ok && t.trimStart().startsWith("<svg")) { await writeFile(`public/logos/${slug}.svg`, t, "utf8"); return true; } } catch {}
  return false;
}
const final = []; const seen = new Set();
for (const level of ["easy", "medium", "hard", "impossible"]) {
  let kept = 0;
  for (const [slug, name] of POOL[level]) {
    if (kept >= TARGET[level]) break;
    if (USED.has(slug) || seen.has(slug)) continue;
    if (await works(slug)) { final.push({ slug, name, level }); seen.add(slug); kept++; }
  }
  console.log(`${level}: kept ${kept}/${TARGET[level]}` + (kept < TARGET[level] ? "  ⚠️ SHORT by " + (TARGET[level] - kept) : ""));
}
console.log(`\nTOTAL ${final.length}`);
const body = final.map((l) => `  { slug: ${JSON.stringify(l.slug)}, name: ${JSON.stringify(l.name)}, level: ${JSON.stringify(l.level)} },`).join("\n");
await writeFile("src/Quiz/logos4Data.js", `// «Guess the Logo 4» — GuessSync · E10 · ~130 براند (الطول الجديد) · مصنّف · تقني/أعمال\nexport const LOGOS4 = [\n${body}\n];\n`, "utf8");
console.log("→ wrote src/Quiz/logos4Data.js (count " + final.length + ")");
