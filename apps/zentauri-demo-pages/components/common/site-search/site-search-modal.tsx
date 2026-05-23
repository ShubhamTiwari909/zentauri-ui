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

export function SiteSearchModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
      filtered
        .map((entry) => ({
          id: entry.id,
          label: entry.label,
          description: entry.description ?? entry.href,
          group: entry.group,
        }))
        .sort((a, b) => {
          const groupCompare = (a.group ?? "").localeCompare(b.group ?? "");
          return groupCompare === 0 ? a.label.localeCompare(b.label) : groupCompare;
        }),
    [filtered],
  );

  const highlightedId = useMemo(() => {
    if (suggestionItems.length === 0) {
      return undefined;
    }
    if (
      userActiveId &&
      suggestionItems.some((item) => item.id === userActiveId)
    ) {
      return userActiveId;
    }
    return suggestionItems[0]?.id;
  }, [suggestionItems, userActiveId]);

  const activeDescendantId = highlightedId
    ? searchSuggestionOptionDomId(listboxId, highlightedId)
    : undefined;

  const entryById = useMemo(() => {
    return new Map(SITE_SEARCH_ENTRIES.map((entry) => [entry.id, entry]));
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
      const currentId = highlightedId ?? suggestionItems[0]?.id;
      const currentIndex = suggestionItems.findIndex(
        (item) => item.id === currentId,
      );
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = Math.min(suggestionItems.length - 1, currentIndex + 1);
        setUserActiveId(suggestionItems[nextIndex]?.id);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const nextIndex = Math.max(0, currentIndex - 1);
        setUserActiveId(suggestionItems[nextIndex]?.id);
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

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent
        ref={undefined}
        id={undefined}
        style={undefined}
        size="lg"
        position="top"
        appearance="sky"
        className="top-20 max-h-[min(90vh,640px)]"
      >
        <ModalHeader className="sr-only">
          <ModalTitle className="">Search Zentauri UI</ModalTitle>
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
            leadingSlot={null}
            onChange={undefined}
            disabled={false}
            placeholder="Search demos, docs, components..."
            aria-label="Search Zentauri UI"
            comboboxListboxId={listboxId}
            comboboxActiveOptionId={activeDescendantId}
            comboboxExpanded={suggestionItems.length > 0}
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
                ? "Type to search demos and library docs."
                : "No matches."
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
