import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const entry = "D:/mnbety-video/src/index.js";
const outDir = "D:/mnbety-video/out/e82_check";
fs.mkdirSync(outDir, { recursive: true });

console.log("Bundling...");
const bundled = await bundle({ entryPoint: entry, webpackOverride: (c) => c });
console.log("Bundled at", bundled);

const frames = [
  { name: "level_easy", frame: 455 },
  { name: "round_easy_q", frame: 590 },
  { name: "round_easy_reveal", frame: 700 },
  { name: "round_medium_q", frame: 6075 },
  { name: "round_medium_reveal", frame: 6185 },
  { name: "checkpoint_25", frame: 7375 },
  { name: "level_hard", frame: 10440 },
  { name: "round_hard_q", frame: 11656 },
  { name: "round_hard_reveal", frame: 11766 },
  { name: "checkpoint_50", frame: 14306 },
  { name: "level_impossible", frame: 14940 },
  { name: "round_impossible_q", frame: 16157 },
  { name: "round_impossible_reveal", frame: 16267 },
  { name: "outro", frame: 19887 },
];

const comp = await selectComposition({
  serveUrl: bundled,
  id: "E82RoadSignQuiz",
  inputProps: {},
});
console.log("Composition durationInFrames:", comp.durationInFrames);

for (const f of frames) {
  const outPath = path.join(outDir, `${f.name}_f${f.frame}.png`);
  console.log("Rendering", f.name, "frame", f.frame);
  await renderStill({
    composition: comp,
    serveUrl: bundled,
    output: outPath,
    frame: f.frame,
  });
}
console.log("DONE");
