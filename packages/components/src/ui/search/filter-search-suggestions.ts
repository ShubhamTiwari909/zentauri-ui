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
    const parts = [
      item.label,
      item.description ?? "",
      item.href ?? "",
      ...(item.keywords ?? []),
    ];
    const haystack = parts.join(" ").toLowerCase();
    if (haystack.includes(normalized)) {
      matches.push(item);
      if (matches.length >= maxResults) {
        break;
      }
    }
  }
  return matches;
}
