import { describe, expect, it } from "vitest";

import { componentTokenReferenceGroups } from "./token-reference-data";

describe("componentTokenReferenceGroups", () => {
  it("keeps Search in the generated CSS variable reference data", () => {
    const slugs = componentTokenReferenceGroups.map((group) => group.slug);
    const searchGroup = componentTokenReferenceGroups.find(
      (group) => group.slug === "search",
    );

    expect(slugs).toEqual(
      expect.arrayContaining(["scroll-area", "search", "select"]),
    );
    expect(slugs.indexOf("search")).toBeGreaterThan(
      slugs.indexOf("scroll-area"),
    );
    expect(slugs.indexOf("search")).toBeLessThan(slugs.indexOf("select"));

    expect(searchGroup?.title).toBe("Search");
    expect(searchGroup?.tokens.length).toBeGreaterThan(0);
    expect(
      searchGroup?.tokens.some((token) => token.name.startsWith("--zui-input")),
    ).toBe(true);
    expect(
      searchGroup?.tokens.some((token) => token.name === "--zui-border"),
    ).toBe(true);
  });
});
