import type { SearchFilterable } from "./types";

export type FilterSearchSuggestionsOptions = {
  /** Maximum number of matches returned. */
  maxResults?: number;
};

/**
 * Returns items whose label, description, href, or keywords contain the query (case-insensitive).
 * Whitespace-only query matches no items.
 */
export function filterSearchSuggestions<T extends SearchFilterable>({
  query,
  items,
  options = { maxResults: 20 },
}: {
  query: string;
  items: readonly T[];
  options?: FilterSearchSuggestionsOptions;
}): T[] {
  const maxResults = options.maxResults ?? 20;
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const matches: T[] = [];
  for (const item of items) {
    const isMatch =
      item.label.toLowerCase().includes(normalized) ||
      (item.description?.toLowerCase().includes(normalized)) ||
      (item.href?.toLowerCase().includes(normalized)) ||
      (item.keywords?.some((k) => k.toLowerCase().includes(normalized)));

    if (isMatch) {
      matches.push(item);
      if (matches.length >= maxResults) {
        break;
      }
    }
  }
  return matches;
}
