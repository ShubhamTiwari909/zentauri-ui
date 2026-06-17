import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const manifestPath = join(__dirname, "props.json");

type PropsManifest = {
  components: Record<
    string,
    {
      subcomponents: Array<{
        name: string;
        propsType: string;
        props: Array<{
          name: string;
          options?: string[];
          default?: string;
          description?: string;
          group: string;
          isVariant?: boolean;
        }>;
      }>;
    }
  >;
};

function readManifest() {
  return JSON.parse(readFileSync(manifestPath, "utf8")) as PropsManifest;
}

describe("props manifest", () => {
  it("documents accordion variants and compound props without dumping raw DOM props", () => {
    const manifest = readManifest();
    const accordion = manifest.components.accordion;

    expect(accordion).toBeDefined();

    const root = accordion.subcomponents.find(
      (subcomponent) => subcomponent.propsType === "AccordionProps",
    );
    const item = accordion.subcomponents.find(
      (subcomponent) => subcomponent.propsType === "AccordionItemProps",
    );

    expect(root?.props).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "appearance",
          group: "variant",
          isVariant: true,
          default: "default",
          options: expect.arrayContaining(["default", "blue", "ghost"]),
        }),
        expect.objectContaining({
          name: "size",
          group: "variant",
          isVariant: true,
          default: "md",
          options: expect.arrayContaining(["sm", "md", "lg"]),
        }),
        expect.objectContaining({
          name: "value",
          group: "controlled",
          description: "Controlled value for `single` mode.",
        }),
      ]),
    );

    expect(item?.props).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "value",
          group: "controlled",
        }),
      ]),
    );
    expect(item?.props.map((prop) => prop.name)).not.toContain("aria-label");
  });
});
