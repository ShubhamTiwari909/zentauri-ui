import { describe, expect, it } from "vitest";

import { searchSuggestionOptionDomId } from "./search-suggestion-utils";

describe("searchSuggestionOptionDomId", () => {
  it("prefixes listbox id and sanitizes item id", () => {
    expect(searchSuggestionOptionDomId(":lb:", "/a/b")).toBe(":lb:_opt__a_b");
  });
});
