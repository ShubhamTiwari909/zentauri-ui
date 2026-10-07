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
          required?: boolean;
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
  it("documents all Resizable Panels compound props and defaults", () => {
    const component = readManifest().components["resizable-panels"];
    const root = component?.subcomponents.find(
      (p) => p.propsType === "ResizablePanelsProps",
    );
    const panel = component?.subcomponents.find(
      (p) => p.propsType === "ResizablePanelProps",
    );
    const handle = component?.subcomponents.find(
      (p) => p.propsType === "ResizableHandleProps",
    );
    const native = ["children", "className", "id", "onClick", "style", "title"];
    for (const [entry, names, defaults] of [
      [
        root,
        [
          "orientation",
          "defaultSizes",
          "disabled",
          "keyboardStep",
          "onResizeEnd",
          "onSizesChange",
          "sizes",
        ],
        { orientation: "horizontal", disabled: "false", keyboardStep: "2" },
      ],
      [
        panel,
        [
          "appearance",
          "padding",
          "collapsedSize",
          "collapsible",
          "maxSize",
          "minSize",
        ],
        {
          appearance: "default",
          padding: "none",
          collapsedSize: "0",
          collapsible: "false",
          maxSize: "100",
          minSize: "10",
        },
      ],
      [
        handle,
        ["appearance", "size", "disabled", "withGrip"],
        {
          appearance: "default",
          size: "md",
          disabled: "false",
          withGrip: "true",
        },
      ],
    ] as const) {
      expect(entry?.props.map((p) => p.name).sort()).toEqual(
        [...native, ...names].sort(),
      );
      expect(
        Object.fromEntries(
          entry!.props
            .filter((p) => p.default !== undefined)
            .map((p) => [p.name, p.default]),
        ),
      ).toEqual(defaults);
    }
    expect(panel?.props.find((p) => p.name === "id")?.required).toBe(true);
  });
  it("documents Grid responsive configuration and item appearances", () => {
    const grid = readManifest().components.grid;
    const root = grid?.subcomponents.find(
      (component) => component.propsType === "GridProps",
    );
    const item = grid?.subcomponents.find(
      (component) => component.propsType === "GridItemProps",
    );
    expect(root?.props.map((prop) => prop.name)).toEqual(
      expect.arrayContaining(["layout", "gap", "rowGap", "columnGap", "as"]),
    );
    expect(root?.props).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "stackOnMobile", default: "true" }),
      ]),
    );
    expect(item?.props).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "colSpan", default: "1" }),
        expect.objectContaining({
          name: "appearance",
          options: expect.arrayContaining([
            "default",
            "glass",
            "gradient-blue",
          ]),
        }),
      ]),
    );
  });
  it("classifies Orbit System center content correctly", () => {
    const orbit = readManifest().components["orbit-system"];
    const root = orbit?.subcomponents.find(
      (subcomponent) => subcomponent.propsType === "OrbitSystemProps",
    );
    expect(root?.props).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "center", group: "content" }),
      ]),
    );
  });

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
