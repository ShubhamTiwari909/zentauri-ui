import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Guards the package's optional-peer isolation contract:
 *
 * - A component that ships BOTH a static entry and an `animated/` entry must keep
 *   `framer-motion` out of its static files, so importing the static entry never
 *   forces the optional `framer-motion` peer onto the consumer. (Components that
 *   are themselves motion primitives — e.g. `animated-number`, `marquee` — have no
 *   `animated/` split, so this rule does not apply to them.)
 * - No file under `src/ui` may import `recharts`; charts live only in `src/charts/*`.
 */

const uiRoot = dirname(fileURLToPath(import.meta.url));

const componentDirs = readdirSync(uiRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

/** `.ts`/`.tsx` files directly involved in the static entry (excludes `animated/` and tests). */
function staticFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "animated") continue;
      out.push(...staticFiles(full));
    } else if (
      /\.(tsx?|jsx?)$/.test(entry.name) &&
      !entry.name.includes(".test.")
    ) {
      out.push(full);
    }
  }
  return out;
}

const FRAMER = /from\s+["']framer-motion/;
const RECHARTS = /from\s+["']recharts/;

describe("static UI entries — optional peer isolation", () => {
  it("scans every UI component directory", () => {
    expect(componentDirs.length).toBeGreaterThan(40);
  });

  for (const name of componentDirs) {
    const dir = join(uiRoot, name);
    const hasAnimatedEntry = existsSync(join(dir, "animated"));
    if (!hasAnimatedEntry) continue;

    it(`${name}: static files do not import framer-motion`, () => {
      const offenders = staticFiles(dir).filter((file) =>
        FRAMER.test(readFileSync(file, "utf8")),
      );
      expect(offenders).toEqual([]);
    });
  }

  it("no UI file imports recharts (charts live in src/charts)", () => {
    const offenders = componentDirs
      .flatMap((name) => {
        const all: string[] = [];
        const dir = join(uiRoot, name);
        // include animated files here too — recharts must never appear in ui/.
        const walk = (d: string) => {
          for (const entry of readdirSync(d, { withFileTypes: true })) {
            const full = join(d, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (/\.(tsx?|jsx?)$/.test(entry.name)) all.push(full);
          }
        };
        walk(dir);
        return all;
      })
      .filter((file) => RECHARTS.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });
});
