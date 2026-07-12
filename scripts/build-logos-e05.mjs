// E05 «Guess the Logo 2» — 100 براند جديدة (غير E01) · سيارات/أزياء/طيران/تقنية/ألعاب
// نفس منطق build-logos.mjs: حوض مرشّحين مرتّب بالأشهر، نختبر التوفّر ونأخذ أول 25/مستوى.
import { mkdir, writeFile } from "node:fs/promises";

const POOL = {
  easy: [
    ["linkedin","LinkedIn"],["skype","Skype"],["firefox","Firefox"],["microsoftedge","Microsoft Edge"],
    ["googledrive","Google Drive"],["yahoo","Yahoo!"],["bing","Bing"],["vimeo","Vimeo"],
    ["soundcloud","SoundCloud"],["applemusic","Apple Music"],["primevideo","Prime Video"],["canva","Canva"],
    ["medium","Medium"],["quora","Quora"],["tumblr","Tumblr"],["messenger","Messenger"],
    ["xbox","Xbox"],["roblox","Roblox"],["mazda","Mazda"],["jeep","Jeep"],
    ["chevrolet","Chevrolet"],["lexus","Lexus"],["ryanair","Ryanair"],["mercedes","Mercedes-Benz"],
    ["lamborghini","Lamborghini"],["gucci","Gucci"],["zara","Zara"],["lego","LEGO"],
    ["ikea","IKEA"],["lidl","Lidl"],["subway","Subway"],["dominos","Domino's"],
    ["pepsi","Pepsi"],["sprite","Sprite"],["fanta","Fanta"],["heineken","Heineken"],
    ["jbl","JBL"],["bose","Bose"],["garmin","Garmin"],["fitbit","Fitbit"],
    ["monster","Monster Energy"],["mclaren","McLaren"],["citroen","Citroën"],["mg","MG"],["tplink","TP-Link"],
  ],
  medium: [
    ["subaru","Subaru"],["cadillac","Cadillac"],["dodge","Dodge"],["chrysler","Chrysler"],
    ["landrover","Land Rover"],["maserati","Maserati"],["bentley","Bentley"],["lufthansa","Lufthansa"],
    ["britishairways","British Airways"],["airfrance","Air France"],["klm","KLM"],["americanairlines","American Airlines"],
    ["turkishairlines","Turkish Airlines"],["singaporeairlines","Singapore Airlines"],["easyjet","easyJet"],["oracle","Oracle"],
    ["salesforce","Salesforce"],["ibm","IBM"],["acer","Acer"],["msi","MSI"],
    ["qualcomm","Qualcomm"],["ubuntu","Ubuntu"],["nintendo","Nintendo"],["riotgames","Riot Games"],
    ["unity","Unity"],["unrealengine","Unreal Engine"],["vans","Vans"],["converse","Converse"],
    ["lacoste","Lacoste"],["levis","Levi's"],["gap","Gap"],["calvinklein","Calvin Klein"],
    ["hm","H&M"],["mango","MANGO"],["asos","ASOS"],["shein","SHEIN"],
    ["aircanada","Air Canada"],["jetblue","JetBlue"],["southwestairlines","Southwest Airlines"],["iberia","Iberia"],
    ["norwegian","Norwegian"],["infiniti","Infiniti"],["sonos","Sonos"],["sennheiser","Sennheiser"],
  ],
  hard: [
    ["vmware","VMware"],["sandisk","SanDisk"],["seagate","Seagate"],["westerndigital","Western Digital"],
    ["kingstontechnology","Kingston"],["corsair","Corsair"],["gigabyte","Gigabyte"],["broadcom","Broadcom"],
    ["arm","Arm"],["raspberrypi","Raspberry Pi"],["arduino","Arduino"],["debian","Debian"],
    ["fedora","Fedora"],["python","Python"],["javascript","JavaScript"],["nodedotjs","Node.js"],
    ["react","React"],["angular","Angular"],["vuedotjs","Vue.js"],["mysql","MySQL"],
    ["postgresql","PostgreSQL"],["redis","Redis"],["kubernetes","Kubernetes"],["jenkins","Jenkins"],
    ["bitbucket","Bitbucket"],["jira","Jira"],["rockstargames","Rockstar Games"],["godotengine","Godot Engine"],
    ["cloudflare","Cloudflare"],["vercel","Vercel"],["netlify","Netlify"],["heroku","Heroku"],
    ["digitalocean","DigitalOcean"],["gnometerminal","GNOME"],["blender","Blender"],["unrealengine","Unreal Engine"],
  ],
  impossible: [
    ["suse","SUSE"],["archlinux","Arch Linux"],["kalilinux","Kali Linux"],["centos","CentOS"],
    ["terraform","Terraform"],["ansible","Ansible"],["circleci","CircleCI"],["elasticsearch","Elasticsearch"],
    ["graphql","GraphQL"],["rust","Rust"],["go","Go"],["kotlin","Kotlin"],
    ["swift","Swift"],["scala","Scala"],["perl","Perl"],["ruby","Ruby"],
    ["laravel","Laravel"],["django","Django"],["flask","Flask"],["svelte","Svelte"],
    ["nextdotjs","Next.js"],["tailwindcss","Tailwind CSS"],["twilio","Twilio"],["fastly","Fastly"],
    ["akamai","Akamai"],["datadog","Datadog"],["grafana","Grafana"],["prometheus","Prometheus"],
    ["byd","BYD"],["saudia","Saudia"],["flydubai","flydubai"],["wizzair","Wizz Air"],
    ["koreanair","Korean Air"],["cathaypacific","Cathay Pacific"],["qantas","Qantas"],["etihadairways","Etihad Airways"],
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
const out = `// «Guess the Logo 2» — GuessSync · E05 · 100 براند جديدة (25/مستوى) · Simple Icons (مجاني، ألوان رسمية)
// مُولّد آلياً بـ scripts/build-logos-e05.mjs — كل السلاقات مؤكّدة الوجود. لا تكرار مع E01.
export const LOGOS2 = [
${body}
];
export const LOGO2_LEVELS = ["easy", "medium", "hard", "impossible"];
`;
await writeFile("src/Quiz/logos2Data.js", out, "utf8");
console.log(`\nTOTAL ${final.length}/100 → wrote src/Quiz/logos2Data.js`);
