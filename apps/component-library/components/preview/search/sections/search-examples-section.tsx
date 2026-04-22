"use client";

import { useCallback, useId, useMemo, useState, type KeyboardEvent } from "react";
import { FiSearch } from "react-icons/fi";

import {
  SearchBar,
  SearchSuggestionList,
  filterSearchSuggestions,
  searchSuggestionOptionDomId,
} from "@zentauri-ui/zentauri-components/ui/search";

const demoItems = [
  {
    id: "/preview/installation",
    label: "Installation",
    href: "/preview/installation",
    group: "Docs",
    keywords: ["npm", "setup"] as const,
  },
  {
    id: "/preview/components/inputs",
    label: "Inputs",
    href: "/preview/components/inputs",
    group: "Components",
    keywords: ["form", "text field"] as const,
  },
  {
    id: "/preview/hooks",
    label: "Hooks",
    href: "/preview/hooks",
    group: "Docs",
    keywords: ["react"] as const,
  },
] as const;

export function SearchExamplesSection() {
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [userActiveId, setUserActiveId] = useState<string | undefined>();
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const matches = useMemo(
    () =>
      filterSearchSuggestions({
        query,
        items: demoItems,
        options: { maxResults: 10 },
      }),
    [query],
  );

  const listItems = useMemo(
    () =>
      [...matches]
        .sort((a, b) => {
          const ga = a.group ?? "";
          const gb = b.group ?? "";
          if (ga !== gb) {
            return ga.localeCompare(gb);
          }
          return a.label.localeCompare(b.label);
        })
        .map((row) => ({
          id: row.id,
          label: row.label,
          description: row.href,
          group: row.group,
        })),
    [matches],
  );

  const highlightedId = useMemo(() => {
    if (listItems.length === 0) {
      return undefined;
    }
    if (userActiveId && listItems.some((item) => item.id === userActiveId)) {
      return userActiveId;
    }
    return listItems[0].id;
  }, [listItems, userActiveId]);

  const activeDescendantId = useMemo(() => {
    if (!highlightedId) {
      return undefined;
    }
    return searchSuggestionOptionDomId(listboxId, highlightedId);
  }, [highlightedId, listboxId]);

  const selectById = useCallback((id: string) => {
    setLastSelected(id);
  }, []);

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (listItems.length === 0) {
        return;
      }
      const currentId = highlightedId ?? listItems[0].id;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const idx = listItems.findIndex((item) => item.id === currentId);
        const nextIndex = Math.min(listItems.length - 1, Math.max(0, idx + 1));
        setUserActiveId(listItems[nextIndex].id);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const idx = listItems.findIndex((item) => item.id === currentId);
        const nextIndex = Math.max(0, idx - 1);
        setUserActiveId(listItems[nextIndex].id);
        return;
      }
      if (event.key === "Enter") {
        const pick = highlightedId ?? listItems[0]?.id;
        if (pick) {
          event.preventDefault();
          selectById(pick);
        }
      }
    },
    [highlightedId, listItems, selectById],
  );

  const hasSuggestions = listItems.length > 0;

  return (
    <section className="mt-16 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">Inline search and list</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Filter the sample entries below. Use arrow keys and Enter from the field; selection
          updates local state only (no navigation on this demo page).
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
        <SearchBar
          value={query}
          onValueChange={setQuery}
          placeholder="Try “install”, “hooks”, or “input”…"
          leadingSlot={<FiSearch aria-hidden />}
          aria-label="Filter demo suggestions"
          className="max-w-xl"
          comboboxListboxId={listboxId}
          comboboxActiveOptionId={activeDescendantId}
          comboboxExpanded={hasSuggestions}
          onKeyDown={handleSearchKeyDown}
        />
        <div className="mt-4 border-t border-white/10 pt-4">
          <SearchSuggestionList
            listboxId={listboxId}
            items={listItems}
            activeId={highlightedId}
            onActiveIdChange={setUserActiveId}
            onSelect={(id: string) => selectById(id)}
            emptyLabel={
              query.trim().length === 0
                ? "Type to filter the sample routes."
                : "No sample matches for that query."
            }
          />
        </div>
        {lastSelected ? (
          <p className="mt-4 text-sm text-slate-400">
            Last selected id:{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-slate-200">{lastSelected}</code>
          </p>
        ) : null}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
        <h3 className="text-lg font-medium text-white">Disabled state</h3>
        <p className="mt-1 text-sm text-slate-400">Same styles with interaction turned off.</p>
        <SearchBar
          value="Read-only preview"
          onValueChange={() => {}}
          disabled
          leadingSlot={<FiSearch aria-hidden />}
          aria-label="Disabled search demo"
          className="mt-4 max-w-xl"
        />
      </div>
    </section>
  );
}
