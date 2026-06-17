import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import propsManifest from "@zentauri-ui/zentauri-components/props.json";

const previewDir = join(__dirname);

function readPreviewImplementation(slug: string) {
  if (slug === "toast") {
    return readFileSync(join(previewDir, slug, "root.tsx"), "utf8");
  }

  if (slug === "typography") {
    return [
      readFileSync(join(previewDir, slug, "hub-page.tsx"), "utf8"),
      readFileSync(join(previewDir, slug, "section-page.tsx"), "utf8"),
    ].join("\n");
  }

  const indexPath = join(previewDir, slug, "index.tsx");
  return existsSync(indexPath) ? readFileSync(indexPath, "utf8") : undefined;
}

describe("component preview API section rollout", () => {
  it("adds the generated props API section to every component preview page", () => {
    const missing = Object.keys(propsManifest.components)
      .sort()
      .filter((slug) => {
        const implementation = readPreviewImplementation(slug);

        if (!implementation) {
          return false;
        }

        return !implementation.includes(`<PreviewApiSection slug="${slug}" />`);
      });

    expect(missing).toEqual([]);
  });
});
