// food-picture-01 entry: copies the prepared image to /output/entry.png.
// The image is a steaming bowl of ramen with a soft-boiled egg, sliced
// pork, green onions and nori, chopsticks lifting glossy noodles, warm
// golden light — fresh, appetizing, photorealistic food photography.
// After copying, the output is verified byte-for-byte so both grader runs
// write the exact same bytes.
// Run locally with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const source = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);

// Verify the copy is byte-identical to the source.
const srcHash = createHash("sha256").update(readFileSync(source)).digest("hex");
const outHash = createHash("sha256").update(readFileSync(dest)).digest("hex");
if (srcHash !== outHash) throw new Error("entry.png copy mismatch");
