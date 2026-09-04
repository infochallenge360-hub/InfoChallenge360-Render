import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const entry = "D:/mnbety-video/src/index.js";
const outDir = "D:/mnbety-video/out/e82_check_shorts";
fs.mkdirSync(outDir, { recursive: true });

console.log("Bundling...");
const bundled = await bundle({ entryPoint: entry, webpackOverride: (c) => c });
console.log("Bundled at", bundled);

for (let part = 1; part <= 5; part++) {
  const id = `Short-E82-${part}`;
  const comp = await selectComposition({ serveUrl: bundled, id, inputProps: {} });
  console.log(id, "duration", comp.durationInFrames);
  const shots = [
    { name: "q1", frame: 90 },
    { name: "reveal1", frame: 170 },
    { name: "q_last", frame: 11*240+90 },
    { name: "reveal_last", frame: 11*240+170 },
  ];
  for (const s of shots) {
    const outPath = path.join(outDir, `${id}_${s.name}_f${s.frame}.png`);
    await renderStill({ composition: comp, serveUrl: bundled, output: outPath, frame: s.frame });
    console.log("  rendered", outPath);
  }
}
console.log("DONE");
