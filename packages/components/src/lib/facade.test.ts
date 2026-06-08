import { describe, expect, it } from "vitest";

import { DesignSystem } from "../lib/facade";

describe("DesignSystem facade", () => {
  it("lists known components", () => {
    const slugs = DesignSystem.components();
    expect(slugs).toContain("accordion");
    expect(slugs).toContain("buttons");
    expect(slugs).toContain("inputs");
    expect(slugs.length).toBe(DesignSystem.listComponents().length);
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
    expect(
      buttonVars.every((token) => token.name.startsWith("--zui-button")),
    ).toBe(true);

    const inputVars = DesignSystem.getComponent("inputs")?.variables() ?? [];
    expect(
      inputVars.every((token) => token.name.startsWith("--zui-input")),
    ).toBe(true);
  });

  it("borrows the Input recipe for SearchBar", () => {
    const search = DesignSystem.getComponent("search");
    const input = DesignSystem.getComponent("inputs");

    expect(search?.title).toBe("Search");

    const searchVars = search?.variables() ?? [];
    expect(searchVars.length).toBeGreaterThan(0);
    // SearchBar has no tokens of its own — every variable is an Input variable.
    expect(searchVars.every((token) => token.name.startsWith("--zui-input"))).toBe(
      true,
    );
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
    const dropdownNames = (dropdown?.variables() ?? []).map((token) => token.name);

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
    const darkOnly = DesignSystem.parse(
      "bg-[var(--zui-probe-only-dark,#000)]",
    );
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
