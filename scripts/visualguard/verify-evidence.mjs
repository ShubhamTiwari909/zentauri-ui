import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const app = resolve("apps/component-library");
const report = JSON.parse(
  readFileSync(resolve(app, "visualguard-results/results.json"), "utf8"),
);
// 15 pages × 4 regular projects, 2 pages × 2 narrow projects, 3 state tests × 4.
// Prevent a filtered or accidentally skipped suite from becoming a passing gate.
assert.equal(
  report.stats.expected,
  76,
  "The complete typography matrix must pass",
);
assert.equal(
  report.stats.skipped,
  32,
  "Only the explicitly excluded narrow cases may skip",
);
assert.equal(report.stats.unexpected, 0);
assert.equal(report.stats.flaky, 0);

const baselineDir = resolve(app, "visualguard/baselines/playwright");
const images = readdirSync(baselineDir).filter((file) => file.endsWith(".png"));
assert.equal(
  images.length,
  88,
  "Expected complete page and interactive references",
);
for (const image of images) {
  const stem = image.slice(0, -4);
  for (const sidecar of ["meta", "dom", "health"]) {
    const data = JSON.parse(
      readFileSync(resolve(baselineDir, `${stem}.${sidecar}.json`), "utf8"),
    );
    if (sidecar === "meta") {
      assert.equal(data.version, 1);
      assert.equal(data.identity.platform, "linux");
    }
  }
}
console.log(
  "Complete typography matrix and 88 reference artifact sets verified.",
);
