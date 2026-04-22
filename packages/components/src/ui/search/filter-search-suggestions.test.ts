import { describe, expect, it } from "vitest";

import { filterSearchSuggestions } from "./filter-search-suggestions";
import type { SearchFilterable } from "./types";

const sampleItems: SearchFilterable[] = [
  { id: "1", label: "Installation", href: "/preview/installation", keywords: ["npm", "setup"] },
  { id: "2", label: "Modal", href: "/preview/components/modal" },
  { id: "3", label: "GitHub", href: "https://example.com/repo", keywords: ["github", "source"] },
];

describe("filterSearchSuggestions", () => {
  it("returns empty list for whitespace-only query", () => {
    expect(filterSearchSuggestions({ query: "   ", items: sampleItems })).toEqual([]);
  });

  it("returns empty list for empty query", () => {
    expect(filterSearchSuggestions({ query: "", items: sampleItems })).toEqual([]);
  });

  it("matches label case-insensitively", () => {
    expect(filterSearchSuggestions({ query: "modal", items: sampleItems })).toEqual([
      { id: "2", label: "Modal", href: "/preview/components/modal" },
    ]);
  });

  it("matches href substring", () => {
    expect(filterSearchSuggestions({ query: "installation", items: sampleItems })).toEqual([
      { id: "1", label: "Installation", href: "/preview/installation", keywords: ["npm", "setup"] },
    ]);
  });

  it("matches keywords", () => {
    expect(filterSearchSuggestions({ query: "github", items: sampleItems })).toEqual([
      { id: "3", label: "GitHub", href: "https://example.com/repo", keywords: ["github", "source"] },
    ]);
  });

  it("respects maxResults", () => {
    const many: SearchFilterable[] = Array.from({ length: 30 }, (_, index) => ({
      id: `x-${index}`,
      label: `Item ${index}`,
      href: `/x/${index}`,
      keywords: ["alpha"],
    }));
    expect(filterSearchSuggestions({ query: "alpha", items: many, options: { maxResults: 5 } })).toHaveLength(5);
  });
});
