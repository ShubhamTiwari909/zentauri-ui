import { describe, expect, it } from "vitest";

import { DesignSystem } from "../lib/facade";
import { zuiGlobalThemeTokens } from "../design-system/tokens";

const globalTokenNames = new Set([
  ...Object.values(zuiGlobalThemeTokens),
  ...Object.values(zuiGlobalThemeTokens).map((name) => `${name}-dark`),
]);

describe("DesignSystem facade", () => {
  it("lists known components", () => {
    const slugs = DesignSystem.components();
    expect(slugs).toContain("accordion");
    expect(slugs).toContain("activity-feed");
    expect(slugs).toContain("time-travel-inspector");
    expect(slugs).toContain("glass-card");
    expect(slugs).toContain("grid");
    expect(slugs).toContain("field");
    expect(slugs).toContain("toolbar");
    expect(slugs).toContain("resizable-panels");
    expect(slugs).toContain("product-3d");
    expect(slugs).toContain("neural-graph");
    expect(slugs).toContain("orbit-system");
    expect(slugs).toContain("buttons");
    expect(slugs).toContain("inputs");
    expect(slugs.length).toBe(DesignSystem.listComponents().length);
  });

  it("discovers Time Travel Inspector appearances and reciprocal focus tokens", () => {
    const inspector = DesignSystem.getComponent("time-travel-inspector");
    expect(inspector?.title).toBe("Time Travel Inspector");
    expect(inspector?.appearances()).toEqual(
      expect.arrayContaining([
        "default",
        "subtle",
        "contrast",
        "glass",
        "gradient-blue",
      ]),
    );
    expect(inspector?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-time-travel-inspector-focus-ring",
          pairName: "--zui-time-travel-inspector-focus-ring-dark",
        }),
      ]),
    );
  });

  it("resolves a component handle", () => {
    const accordion = DesignSystem.getComponent("accordion");
    expect(accordion?.title).toBe("Accordion");
    expect(accordion?.appearances()).toEqual(
      expect.arrayContaining(["default", "blue", "outline"]),
    );
    expect(accordion?.sizes()).toEqual(
      expect.arrayContaining(["sm", "md", "lg"]),
    );
    expect(accordion?.slots()).toEqual(
      expect.arrayContaining(["root", "item", "trigger", "content"]),
    );
    expect(accordion?.groups()).toEqual(
      expect.arrayContaining(["appearance", "size"]),
    );
  });

  it("discovers Resizable Panels surfaces and reciprocal handle tokens", () => {
    const panels = DesignSystem.getComponent("resizable-panels");
    expect(panels?.title).toBe("Resizable Panels");
    expect(panels?.slots()).toEqual(
      expect.arrayContaining(["root", "panel", "handle"]),
    );
    expect(panels?.appearances("panel")).toEqual(
      expect.arrayContaining(["subtle", "contrast", "glass", "gradient-blue"]),
    );
    expect(panels?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-resizable-panels-focus-ring",
          pairName: "--zui-resizable-panels-focus-ring-dark",
        }),
        expect.objectContaining({
          name: "--zui-resizable-panels-focus-ring-dark",
          pairName: "--zui-resizable-panels-focus-ring",
        }),
      ]),
    );
  });

  it("discovers Toolbar slots, appearances, and reciprocal focus tokens", () => {
    const toolbar = DesignSystem.getComponent("toolbar");
    expect(toolbar?.title).toBe("Toolbar");
    expect(toolbar?.slots()).toEqual(
      expect.arrayContaining(["root", "item", "group", "separator"]),
    );
    expect(toolbar?.appearances()).toEqual(
      expect.arrayContaining(["subtle", "contrast", "glass", "gradient-blue"]),
    );
    expect(toolbar?.groups()).toContain("wrap");
    expect(toolbar?.getVariant("wrap", "true")?.className).toBe("flex-wrap");
    expect(toolbar?.getVariant("wrap", "false")?.className).toBe("flex-nowrap");
    expect(toolbar?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-toolbar-focus-ring",
          pairName: "--zui-toolbar-focus-ring-dark",
        }),
        expect.objectContaining({
          name: "--zui-toolbar-focus-ring-dark",
          pairName: "--zui-toolbar-focus-ring",
        }),
      ]),
    );
  });

  it("discovers Field appearances, slots, and paired form tokens", () => {
    const field = DesignSystem.getComponent("field");
    expect(field?.title).toBe("Field");
    expect(field?.slots()).toEqual(
      expect.arrayContaining([
        "root",
        "label",
        "description",
        "error",
        "group",
        "legend",
        "form",
      ]),
    );
    expect(field?.appearances()).toEqual(
      expect.arrayContaining([
        "default",
        "subtle",
        "contrast",
        "glass",
        "gradient-blue",
      ]),
    );
    expect(field?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-field-form-gap",
          pairName: "--zui-field-form-gap-dark",
        }),
        expect.objectContaining({
          name: "--zui-field-form-gap-dark",
          pairName: "--zui-field-form-gap",
        }),
      ]),
    );
  });

  it("discovers Grid slots, appearance variants, and paired spacing tokens", () => {
    const grid = DesignSystem.getComponent("grid");
    expect(grid?.title).toBe("Grid");
    expect(grid?.slots()).toEqual(expect.arrayContaining(["root", "item"]));
    expect(grid?.appearances("item")).toEqual(
      expect.arrayContaining([
        "default",
        "subtle",
        "contrast",
        "glass",
        "gradient-blue",
      ]),
    );
    expect(grid?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-grid-gap-md",
          pairName: "--zui-grid-gap-md-dark",
        }),
        expect.objectContaining({
          name: "--zui-grid-gap-md-dark",
          pairName: "--zui-grid-gap-md",
        }),
      ]),
    );
  });

  it("exposes Activity Feed token variants", () => {
    const activityFeed = DesignSystem.getComponent("activity-feed");
    expect(activityFeed?.appearances()).toEqual(
      expect.arrayContaining(["default", "emerald", "glass"]),
    );
    expect(activityFeed?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "--zui-activity-feed-emerald-bg" }),
      ]),
    );
  });

  it("discovers Neural Graph appearances and paired canvas tokens", () => {
    const graph = DesignSystem.getComponent("neural-graph");
    expect(graph?.appearances()).toContain("gradient-blue");
    expect(graph?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-neural-graph-edge",
          pairName: "--zui-neural-graph-edge-dark",
        }),
      ]),
    );
  });

  it("discovers Orbit System appearances and paired scene tokens", () => {
    const orbit = DesignSystem.getComponent("orbit-system");
    expect(orbit?.appearances()).toContain("gradient-blue");
    expect(orbit?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-orbit-system-ring",
          pairName: "--zui-orbit-system-ring-dark",
        }),
      ]),
    );
  });

  it("discovers Product 3D appearances and paired tokens", () => {
    const product = DesignSystem.getComponent("product-3d");
    expect(product?.appearances()).toContain("gradient-blue");
    expect(product?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-product-3d-control-bg",
          pairName: "--zui-product-3d-control-bg-dark",
        }),
      ]),
    );
  });

  it("discovers Glass Card appearances and paired material tokens", () => {
    const card = DesignSystem.getComponent("glass-card");
    expect(card?.title).toBe("Glass Card");
    expect(card?.appearances()).toContain("cyan");
    expect(card?.groups()).toContain("variant");
    expect(card?.variants("variant").map(({ key }) => key)).toEqual([
      "glass",
      "crystal",
      "frosted",
    ]);
    expect(card?.getVariant("variant", "crystal")?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-glass-card-crystal-blur",
          fallback: "8px",
        }),
        expect.objectContaining({
          name: "--zui-glass-card-crystal-blur-dark",
          fallback: "8px",
        }),
      ]),
    );
    expect(card?.variables()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "--zui-glass-card-crystal-blur",
          pairName: "--zui-glass-card-crystal-blur-dark",
        }),
      ]),
    );
  });

  it("resolves a variant and its variables with light/dark pairing", () => {
    const variant = DesignSystem.getComponent("accordion")?.getVariant(
      "appearance",
      "blue",
    );

    expect(variant?.slot).toBe("root");
    expect(variant?.className).toContain("--zui-accordion-blue-divider");

    const variables = variant?.variables() ?? [];
    const light = variables.find(
      (token) => token.name === "--zui-accordion-blue-divider",
    );
    const dark = variables.find(
      (token) => token.name === "--zui-accordion-blue-divider-dark",
    );

    expect(light?.theme).toBe("light");
    expect(light?.pairName).toBe("--zui-accordion-blue-divider-dark");
    expect(dark?.theme).toBe("dark");
    expect(dark?.pairName).toBe("--zui-accordion-blue-divider");
  });

  it("resolves slot-scoped variants", () => {
    const itemBlue = DesignSystem.getComponent("accordion")?.getVariant(
      "appearance",
      "blue",
      { slot: "item" },
    );

    expect(itemBlue?.slot).toBe("item");
    expect(itemBlue?.className).toContain("--zui-accordion-item-blue-border");
  });

  it("scopes variables to the component token prefix", () => {
    const buttonVars = DesignSystem.getComponent("buttons")?.variables() ?? [];
    expect(buttonVars.length).toBeGreaterThan(0);
    const componentSpecificButtonVars = buttonVars.filter(
      (token) => !globalTokenNames.has(token.name),
    );
    expect(
      componentSpecificButtonVars.every((token) =>
        token.name.startsWith("--zui-button"),
      ),
    ).toBe(true);

    const inputVars = DesignSystem.getComponent("inputs")?.variables() ?? [];
    const componentSpecificInputVars = inputVars.filter(
      (token) => !globalTokenNames.has(token.name),
    );
    expect(
      componentSpecificInputVars.every((token) =>
        token.name.startsWith("--zui-input"),
      ),
    ).toBe(true);
  });

  it("borrows the Input recipe for SearchBar", () => {
    const search = DesignSystem.getComponent("search");
    const input = DesignSystem.getComponent("inputs");

    expect(search?.title).toBe("Search");

    const searchVars = search?.variables() ?? [];
    expect(searchVars.length).toBeGreaterThan(0);
    // SearchBar has no tokens of its own — every variable is an Input variable.
    const componentSpecificSearchVars = searchVars.filter(
      (token) => !globalTokenNames.has(token.name),
    );
    expect(
      componentSpecificSearchVars.every((token) =>
        token.name.startsWith("--zui-input"),
      ),
    ).toBe(true);
    expect(searchVars.length).toBe(input?.variables().length);
  });

  it("does not absorb another component's exports via a shared namespace", () => {
    // ContextMenu reuses Dropdown's `--zui-dropdown-*` namespace, but scoping by
    // export stem means it only collects its own exports — never Dropdown's
    // trigger tokens, which ContextMenu has no export for.
    const contextMenu = DesignSystem.getComponent("context-menu");
    const dropdown = DesignSystem.getComponent("dropdown");

    const contextMenuNames = (contextMenu?.variables() ?? []).map(
      (token) => token.name,
    );
    const dropdownNames = (dropdown?.variables() ?? []).map(
      (token) => token.name,
    );

    expect(contextMenuNames.length).toBeGreaterThan(0);
    expect(
      dropdownNames.some((name) => name.includes("dropdown-trigger")),
    ).toBe(true);
    expect(
      contextMenuNames.some((name) => name.includes("dropdown-trigger")),
    ).toBe(false);
  });

  it("ignores shared recipe exports so badge tokens never leak into buttons", () => {
    // `zuiButtonLikeSolidAppearances` is spread into `zuiBadgeAppearances` and
    // references `--zui-badge-*`. Its `Button` prefix must not pull it into the
    // Buttons model, and it must not add a phantom appearance group.
    const buttons = DesignSystem.getComponent("buttons");

    expect(
      (buttons?.variables() ?? []).some((token) =>
        token.name.startsWith("--zui-badge"),
      ),
    ).toBe(false);
    expect(buttons?.appearances()).not.toContain("like-solid");
    expect(buttons?.slots()).not.toContain("like-solid");
  });

  it("recognizes the full set of variant-group suffixes", () => {
    const toastPositions = DesignSystem.getComponent("toast")
      ?.variants("position", { slot: "viewport" })
      .map((variant) => variant.key);
    expect(toastPositions).toEqual(
      expect.arrayContaining(["top-left", "bottom-right"]),
    );

    const popoverWidths = DesignSystem.getComponent("popover")
      ?.variants("width", { slot: "content" })
      .map((variant) => variant.key);
    expect(popoverWidths).toEqual(expect.arrayContaining(["sm", "2xl"]));

    const badgeShapes = DesignSystem.getComponent("badge")
      ?.variants("shape")
      .map((variant) => variant.key);
    expect(badgeShapes).toEqual(expect.arrayContaining(["pill", "square"]));

    const drawerSides = DesignSystem.getComponent("drawer")
      ?.variants("side", { slot: "content" })
      .map((variant) => variant.key);
    expect(drawerSides).toEqual(expect.arrayContaining(["left", "right"]));
  });

  it("leaves dark-only variables unpaired", () => {
    // A `-dark` reference with no light base must stay unpaired rather than
    // pointing at a variable that was never parsed.
    const darkOnly = DesignSystem.parse("bg-[var(--zui-probe-only-dark,#000)]");
    expect(darkOnly).toHaveLength(1);
    expect(darkOnly[0]?.theme).toBe("dark");
    expect(darkOnly[0]?.pairName).toBeUndefined();

    const paired = DesignSystem.parse(
      "a-[var(--zui-probe-bg,#fff)] b-[var(--zui-probe-bg-dark,#000)]",
    );
    const light = paired.find((token) => token.name === "--zui-probe-bg");
    const dark = paired.find((token) => token.name === "--zui-probe-bg-dark");
    expect(light?.theme).toBe("light");
    expect(light?.pairName).toBe("--zui-probe-bg-dark");
    expect(dark?.pairName).toBe("--zui-probe-bg");
  });

  it("returns undefined for unknown slugs and variants", () => {
    expect(DesignSystem.getComponent("not-a-component")).toBeUndefined();
    expect(
      DesignSystem.getComponent("accordion")?.getVariant(
        "appearance",
        "not-a-variant",
      ),
    ).toBeUndefined();
  });
});
