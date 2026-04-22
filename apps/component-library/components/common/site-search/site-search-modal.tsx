"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@zentauri-ui/zentauri-components/ui/modal";
import {
  SearchBar,
  SearchSuggestionList,
  filterSearchSuggestions,
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
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const id = requestAnimationFrame(() => {
      setQuery("");
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const filtered = useMemo(
    () => filterSearchSuggestions({query, items: SITE_SEARCH_ENTRIES, options: { maxResults: 20 } }),
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
    },
    [entryById, onOpenChange, router],
  );

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="lg" position="top" appearance="glass" className="top-24 max-h-[min(90vh,640px)]">
        <ModalHeader className="sr-only">
          <ModalTitle>Search documentation</ModalTitle>
        </ModalHeader>
        <ModalBody className="space-y-4">
          <SearchBar
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            placeholder="Search pages, components, hooks…"
            leadingSlot={<FiSearch aria-hidden />}
            aria-label="Search documentation"
          />
          <SearchSuggestionList
            items={suggestionItems}
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
