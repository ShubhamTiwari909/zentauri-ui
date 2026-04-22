/**
 * Builds a stable DOM id for a listbox option so `aria-activedescendant` on the combobox
 * input can reference it. Safe for href-like `itemId` strings.
 */
export function searchSuggestionOptionDomId(listboxId: string, itemId: string): string {
  const safe = itemId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `${listboxId}_opt_${safe}`;
}
