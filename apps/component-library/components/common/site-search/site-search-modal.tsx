"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@zentauri-ui/zentauri-components/ui/modal";
import {
  SearchBar,
  SearchSuggestionList,
  filterSearchSuggestions,
  searchSuggestionOptionDomId,
} from "@zentauri-ui/zentauri-components/ui/search";

import { getSiteSearchEntries } from "@/lib/site-search-entries";

const SITE_SEARCH_ENTRIES = getSiteSearchEntries();

function sortSuggestionItems<T extends { group?: string; label: string }>(
  items: readonly T[],
): T[] {
  return [...items].sort((a, b) => {
    const ga = a.group ?? "";
    const gb = b.group ?? "";
    if (ga !== gb) {
      return ga.localeCompare(gb);
    }
    return a.label.localeCompare(b.label);
  });
}

export type SiteSearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SiteSearchModal({ open, onOpenChange }: SiteSearchModalProps) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [userActiveId, setUserActiveId] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const frame = requestAnimationFrame(() => {
      setQuery("");
      setUserActiveId(undefined);
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  const filtered = useMemo(
    () =>
      filterSearchSuggestions({
        query,
        items: SITE_SEARCH_ENTRIES,
        options: { maxResults: 20 },
      }),
    [query],
  );

  const suggestionItems = useMemo(
    () =>
      sortSuggestionItems(
        filtered.map((entry) => ({
          id: entry.id,
          label: entry.label,
          description: entry.href,
          group: entry.group,
        })),
      ),
    [filtered],
  );

  const highlightedId = useMemo(() => {
    if (suggestionItems.length === 0) {
      return undefined;
    }
    if (userActiveId && suggestionItems.some((item) => item.id === userActiveId)) {
      return userActiveId;
    }
    return suggestionItems[0].id;
  }, [suggestionItems, userActiveId]);

  const activeDescendantId = useMemo(() => {
    if (!highlightedId) {
      return undefined;
    }
    return searchSuggestionOptionDomId(listboxId, highlightedId);
  }, [highlightedId, listboxId]);

  useEffect(() => {
    if (!open || !activeDescendantId) {
      return;
    }
    const node = document.getElementById(activeDescendantId);
    node?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeDescendantId, open]);

  const entryById = useMemo(() => {
    const map = new Map(SITE_SEARCH_ENTRIES.map((e) => [e.id, e]));
    return map;
  }, []);

  const navigateTo = useCallback(
    (id: string) => {
      const entry = entryById.get(id);
      if (!entry) {
        return;
      }
      if (entry.external) {
        window.open(entry.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(entry.href);
      }
      onOpenChange(false);
      setQuery("");
      setUserActiveId(undefined);
    },
    [entryById, onOpenChange, router],
  );

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (suggestionItems.length === 0) {
        return;
      }
      const currentId = highlightedId ?? suggestionItems[0].id;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const idx = suggestionItems.findIndex((item) => item.id === currentId);
        const nextIndex = Math.min(suggestionItems.length - 1, Math.max(0, idx + 1));
        setUserActiveId(suggestionItems[nextIndex].id);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const idx = suggestionItems.findIndex((item) => item.id === currentId);
        const nextIndex = Math.max(0, idx - 1);
        setUserActiveId(suggestionItems[nextIndex].id);
        return;
      }
      if (event.key === "Enter") {
        const pick = highlightedId ?? suggestionItems[0]?.id;
        if (pick) {
          event.preventDefault();
          navigateTo(pick);
        }
      }
    },
    [highlightedId, navigateTo, suggestionItems],
  );

  const hasSuggestions = suggestionItems.length > 0;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        size="lg"
        position="top"
        appearance="glass"
        className="top-24 max-h-[min(90vh,640px)]"
      >
        <ModalHeader className="sr-only">
          <ModalTitle className="">Search documentation</ModalTitle>
        </ModalHeader>
        <ModalBody className="space-y-4">
          <SearchBar
            ref={inputRef}
            className=""
            inputClassName=""
            id={`${listboxId}-input`}
            name="site-search"
            type="search"
            value={query}
            onValueChange={setQuery}
            placeholder="Search pages, components, hooks…"
            leadingSlot={<FiSearch aria-hidden />}
            aria-label="Search documentation"
            comboboxListboxId={listboxId}
            comboboxActiveOptionId={activeDescendantId}
            comboboxExpanded={hasSuggestions}
            onKeyDown={handleSearchKeyDown}
          />
          <SearchSuggestionList
            className=""
            listClassName=""
            listboxId={listboxId}
            items={suggestionItems}
            activeId={highlightedId}
            onActiveIdChange={setUserActiveId}
            onSelect={navigateTo}
            emptyLabel={
              query.trim().length === 0
                ? "Type to find documentation pages."
                : "No matches."
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
