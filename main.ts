// The Moon Finally Answers Back — one-line entry.
// The Moon speaks back after four billion years of wishes, howls
// and late-night promises. Written fresh for this competition.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Four billion years of wishes, howls, and 2 a.m. promises \u2014 and not one of you has ever wished ME anything back.";

// Self-checking gate: the sealed scorer requires UTF-8 text of
// 1 to 240 characters, exactly one line, not only whitespace.
const chars = [...ENTRY].length;
const lines = ENTRY.split("\n").length;
if (chars < 1 || chars > 240) {
  console.error(`gate failed: entry is ${chars} characters (must be 1-240)`);
  process.exit(1);
}
if (lines !== 1) {
  console.error(`gate failed: entry has ${lines} lines (must be exactly 1)`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error("gate failed: entry is only whitespace");
  process.exit(1);
}
if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(ENTRY)) {
  console.error("gate failed: entry contains control characters");
  process.exit(1);
}
if (ENTRY !== ENTRY.trim()) {
  console.error("gate failed: entry has leading or trailing whitespace");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
