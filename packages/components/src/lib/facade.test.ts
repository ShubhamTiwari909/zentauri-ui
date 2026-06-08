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
