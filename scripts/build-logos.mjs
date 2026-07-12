// يبني قائمة 100 شعار مؤكّدة الوجود في Simple Icons + يحمّلها + يولّد logosData.js
// المنطق: لكل مستوى حوض مرشّحين (الأشهر أولاً)؛ نختبر كلٌّ ونأخذ أول 25 شغّالة.
import { mkdir, writeFile } from "node:fs/promises";

// name = الاسم الظاهر عند الكشف. المرشّحون مرتّبون: الأشهر أولاً.
const POOL = {
  easy: [
    ["google","Google"],["youtube","YouTube"],["facebook","Facebook"],["instagram","Instagram"],
    ["whatsapp","WhatsApp"],["tiktok","TikTok"],["netflix","Netflix"],["spotify","Spotify"],
    ["nike","Nike"],["adidas","Adidas"],["mcdonalds","McDonald's"],["cocacola","Coca-Cola"],
    ["starbucks","Starbucks"],["apple","Apple"],["android","Android"],["x","X (Twitter)"],
    ["snapchat","Snapchat"],["playstation","PlayStation"],["visa","Visa"],["mastercard","Mastercard"],
    ["samsung","Samsung"],["paypal","PayPal"],["gmail","Gmail"],["googlechrome","Google Chrome"],
    ["telegram","Telegram"],["googleplay","Google Play"],["googlemaps","Google Maps"],["wikipedia","Wikipedia"],
  ],
  medium: [
    ["tesla","Tesla"],["bmw","BMW"],["audi","Audi"],["volkswagen","Volkswagen"],
    ["toyota","Toyota"],["honda","Honda"],["ford","Ford"],["ferrari","Ferrari"],
    ["porsche","Porsche"],["uber","Uber"],["airbnb","Airbnb"],["ebay","eBay"],
    ["pinterest","Pinterest"],["reddit","Reddit"],["discord","Discord"],["intel","Intel"],
    ["nvidia","Nvidia"],["amd","AMD"],["xiaomi","Xiaomi"],["huawei","Huawei"],
    ["redbull","Red Bull"],["puma","Puma"],["twitch","Twitch"],["github","GitHub"],
    ["hyundai","Hyundai"],["kia","Kia"],["nissan","Nissan"],["figma","Figma"],["volvo","Volvo"],
  ],
  hard: [
    ["cisco","Cisco"],["dell","Dell"],["hp","HP"],["lenovo","Lenovo"],
    ["asus","Asus"],["nikon","Nikon"],["dji","DJI"],["siemens","Siemens"],
    ["lg","LG"],["panasonic","Panasonic"],["sony","Sony"],["sega","Sega"],
    ["reebok","Reebok"],["razer","Razer"],["logitech","Logitech"],["steam","Steam"],
    ["ubisoft","Ubisoft"],["ea","EA"],["gitlab","GitLab"],["docker","Docker"],
    ["slack","Slack"],["zoom","Zoom"],["dropbox","Dropbox"],["shopify","Shopify"],
    ["stripe","Stripe"],["sap","SAP"],["redhat","Red Hat"],["mongodb","MongoDB"],
    ["wordpress","WordPress"],["notion","Notion"],["trello","Trello"],["epicgames","Epic Games"],
  ],
  impossible: [
    ["kfc","KFC"],["burgerking","Burger King"],["3m","3M"],["boeing","Boeing"],
    ["shell","Shell"],["hsbc","HSBC"],["fedex","FedEx"],["ups","UPS"],
    ["dhl","DHL"],["spacex","SpaceX"],["qatarairways","Qatar Airways"],["emirates","Emirates"],
    ["underarmour","Under Armour"],["fila","Fila"],["newbalance","New Balance"],["wise","Wise"],
    ["revolut","Revolut"],["binance","Binance"],["coinbase","Coinbase"],["americanexpress","American Express"],
    ["alibaba","Alibaba"],["aliexpress","AliExpress"],["wechat","WeChat"],["line","LINE"],
    ["grab","Grab"],["suzuki","Suzuki"],["peugeot","Peugeot"],["renault","Renault"],
    ["fiat","Fiat"],["skoda","Škoda"],["mini","MINI"],["jaguar","Jaguar"],["mitsubishi","Mitsubishi"],
  ],
};

await mkdir("public/logos", { recursive: true });

async function works(slug) {
  try {
    const res = await fetch(`https://cdn.simpleicons.org/${slug}`);
    const text = await res.text();
    if (res.ok && text.trimStart().startsWith("<svg")) {
      await writeFile(`public/logos/${slug}.svg`, text, "utf8");
      return true;
    }
  } catch {}
  return false;
}

const final = [];
for (const level of ["easy", "medium", "hard", "impossible"]) {
  let kept = 0;
  const misses = [];
  for (const [slug, name] of POOL[level]) {
    if (kept >= 25) break;
    if (await works(slug)) { final.push({ slug, name, level }); kept++; }
    else misses.push(slug);
  }
  console.log(`${level}: kept ${kept}/25` + (kept < 25 ? `  ⚠️ SHORT` : "") + (misses.length ? `  (skipped: ${misses.join(", ")})` : ""));
}

const body = final.map(l => `  { slug: ${JSON.stringify(l.slug)}, name: ${JSON.stringify(l.name)}, level: ${JSON.stringify(l.level)} },`).join("\n");
const out = `// «Guess the Logo» — GuessSync · 100 براند (25/مستوى) · شعارات Simple Icons (مجاني، بالألوان الرسمية)
// مُولّد آلياً بـ scripts/build-logos.mjs — كل السلاقات مؤكّدة الوجود. لا وجوه/موسيقى محمية.
export const LOGOS = [
${body}
];
export const LOGO_LEVELS = ["easy", "medium", "hard", "impossible"];
`;
await writeFile("src/Quiz/logosData.js", out, "utf8");
console.log(`\nTOTAL ${final.length}/100 → wrote src/Quiz/logosData.js`);
