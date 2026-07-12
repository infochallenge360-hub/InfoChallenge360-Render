// E09 «Guess the Crypto» — كريبتو/Web3 فقط (نظّفت براندات الدفع)، مصنّف لجمهور مهتم بالكريبتو
import { mkdir, writeFile } from "node:fs/promises";
import { LOGOS } from "../src/Quiz/logosData.js";
import { LOGOS2 } from "../src/Quiz/logos2Data.js";
import { LOGOS3 } from "../src/Quiz/logos3Data.js";
const USED = new Set([...LOGOS, ...LOGOS2, ...LOGOS3].map((l) => l.slug));

const POOL = {
  easy: [["bitcoin","Bitcoin"],["ethereum","Ethereum"],["dogecoin","Dogecoin"],["litecoin","Litecoin"],["tether","Tether"],["ripple","XRP"],["cardano","Cardano"],["solana","Solana"],["monero","Monero"],["shibainu","Shiba Inu"],["tron","TRON"],["stellar","Stellar"],["polkadot","Polkadot"],["chainlink","Chainlink"],["metamask","MetaMask"],["ledger","Ledger"],["trezor","Trezor"],["opensea","OpenSea"],["ethereumclassic","Ethereum Classic"],["bitcoincash","Bitcoin Cash"],["dash","Dash"],["zcash","Zcash"],["eos","EOS"],["iota","IOTA"],["neo","Neo"],["tezos","Tezos"],["vechain","VeChain"],["waves","Waves"]],
  medium: [["kraken","Kraken"],["kucoin","KuCoin"],["cryptocom","Crypto.com"],["okx","OKX"],["bybit","Bybit"],["bitfinex","Bitfinex"],["gemini","Gemini"],["polygon","Polygon"],["avalanche","Avalanche"],["cosmos","Cosmos"],["algorand","Algorand"],["fantom","Fantom"],["uniswap","Uniswap"],["aave","Aave"],["helium","Helium"],["chia","Chia"],["nem","NEM"],["hedera","Hedera"],["theta","Theta Network"],["thegraph","The Graph"],["trustwallet","Trust Wallet"],["phantom","Phantom"],["gnosis","Gnosis"],["dai","Dai"],["bitcoinsv","Bitcoin SV"],["qtum","Qtum"],["ontology","Ontology"],["zilliqa","Zilliqa"]],
  hard: [["arbitrum","Arbitrum"],["optimism","Optimism"],["near","NEAR"],["makerdao","Maker"],["curve","Curve"],["compound","Compound"],["synthetix","Synthetix"],["decentraland","Decentraland"],["axieinfinity","Axie Infinity"],["harmony","Harmony"],["celo","Celo"],["1inch","1inch"],["pancakeswap","PancakeSwap"],["sushiswap","SushiSwap"],["icon","ICON"],["enjin","Enjin"],["basicattentiontoken","Basic Attention Token"],["walletconnect","WalletConnect"],["safe","Safe"],["blockstream","Blockstream"],["elrond","MultiversX"],["flow","Flow"],["immutable","Immutable"],["loopring","Loopring"],["ankr","Ankr"],["storj","Storj"],["siacoin","Siacoin"],["ravencoin","Ravencoin"]],
  impossible: [["thorchain","THORChain"],["injective","Injective"],["osmosis","Osmosis"],["starknet","StarkNet"],["zksync","zkSync"],["celestia","Celestia"],["sui","Sui"],["aptos","Aptos"],["kava","Kava"],["ren","Ren"],["balancer","Balancer"],["yearndotfinance","Yearn.finance"],["convex","Convex Finance"],["lido","Lido"],["frax","Frax"],["dydx","dYdX"],["radix","Radix"],["kadena","Kadena"],["nervos","Nervos"],["arweave","Arweave"],["filecoin","Filecoin"],["render","Render"],["oceanprotocol","Ocean Protocol"],["numerai","Numerai"],["livepeer","Livepeer"],["storj","Storj"],["thegraph","The Graph"],["polkadot","Polkadot"]],
};

await mkdir("public/logos", { recursive: true });
async function works(slug) {
  try { const r = await fetch(`https://cdn.simpleicons.org/${slug}`); const t = await r.text();
    if (r.ok && t.trimStart().startsWith("<svg")) { await writeFile(`public/logos/${slug}.svg`, t, "utf8"); return true; } } catch {}
  return false;
}
const final = []; const seen = new Set();
for (const level of ["easy", "medium", "hard", "impossible"]) {
  let kept = 0; const misses = [];
  for (const [slug, name] of POOL[level]) {
    if (kept >= 25) break;
    if (USED.has(slug) || seen.has(slug)) continue;
    if (await works(slug)) { final.push({ slug, name, level }); seen.add(slug); kept++; }
    else misses.push(slug);
  }
  console.log(`${level}: kept ${kept}/25` + (kept < 25 ? "  ⚠️ SHORT by " + (25 - kept) : "") + (misses.length ? `  (404: ${misses.join(",")})` : ""));
}
console.log(`\nTOTAL ${final.length}/100`);
if (final.length === 100) {
  const body = final.map((l) => `  { slug: ${JSON.stringify(l.slug)}, name: ${JSON.stringify(l.name)}, level: ${JSON.stringify(l.level)} },`).join("\n");
  await writeFile("src/Quiz/crypto1Data.js", `// «Guess the Crypto» — GuessSync · E09 · 100 كريبتو/Web3 · صعوبة مصنّفة (لجمهور الكريبتو)\nexport const CRYPTO1 = [\n${body}\n];\n`, "utf8");
  console.log("→ wrote src/Quiz/crypto1Data.js");
} else console.log("لم يكتمل 100 — لا أكتب الملف (نبدّل الموضوع أو نوسّع الحوض)");
