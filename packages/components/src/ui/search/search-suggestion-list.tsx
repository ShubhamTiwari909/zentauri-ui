"use client";

import { Fragment } from "react";

import { cn } from "../../lib/utils";
import { searchSuggestionOptionDomId } from "./search-suggestion-utils";

import type { SearchSuggestionListProps } from "./types";

const rowClassName =
  "flex w-full flex-col gap-0.5 rounded-[var(--zui-search-suggestion-radius,var(--zui-radius,0.5rem))] px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--zui-search-suggestion-bg-hover,var(--zui-surface-hover,#0000001a))] dark:hover:bg-[var(--zui-search-suggestion-bg-hover-dark,var(--zui-surface-hover-dark,#ffffff0d))] focus-visible:bg-[var(--zui-search-suggestion-bg-focus,var(--zui-surface-hover,#ffffff0d))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-search-suggestion-ring-focus,var(--zui-focus-ring,#22d3ee80))]";

export function SearchSuggestionList({
  items,
  onSelect,
  activeId,
  onActiveIdChange,
  listboxId,
  className,
  listClassName,
  emptyLabel,
}: SearchSuggestionListProps) {
  if (items.length === 0) {
    return (
      <div
        data-slot="search-suggestion-list-empty"
        className={cn(
          "px-1 py-6 text-center text-sm text-[color:var(--zui-search-empty-fg,var(--zui-fg,#0f172a))] dark:text-[color:var(--zui-search-empty-fg-dark,var(--zui-fg-dark,#e2e8f0))]",
          className,
        )}
      >
        {emptyLabel ?? "No matches."}
      </div>
    );
  }

  const useListbox = Boolean(listboxId);

  const rows: Array<{
    item: (typeof items)[number];
    showGroup: boolean;
  }> = [];
  let lastGroupSeen: string | undefined;
  for (const item of items) {
    const showGroup = Boolean(item.group && item.group !== lastGroupSeen);
    if (item.group) {
      lastGroupSeen = item.group;
    }
    rows.push({ item, showGroup });
  }

  return (
    <nav
      data-slot="search-suggestion-list"
      aria-label="Search results"
      className={cn(
        "flex max-h-[min(50vh,360px)] flex-col gap-1 overflow-y-auto pr-1",
        className,
      )}
    >
      <div
        {...(useListbox
          ? {
              id: listboxId,
              role: "listbox" as const,
            }
          : {})}
        className={cn("flex flex-col gap-0.5", listClassName)}
      >
        {rows.map(({ item, showGroup }) => {
          const isActive = activeId === item.id;
          const optionDomId =
            useListbox && listboxId
              ? searchSuggestionOptionDomId(listboxId, item.id)
              : undefined;
          return (
            <Fragment key={item.id}>
              {showGroup ? (
                <div
                  role="presentation"
                  className="sticky top-0 z-1 rounded-[var(--zui-search-group-radius,var(--zui-radius,0.5rem))] bg-[var(--zui-search-group-bg,var(--zui-surface-muted,#f8fafcf2))] px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--zui-search-group-fg,var(--zui-fg,#0f172a))] backdrop-blur-sm dark:bg-[var(--zui-search-group-bg-dark,var(--zui-surface-muted-dark,#020617f2))] dark:text-[color:var(--zui-search-group-fg-dark,var(--zui-fg-dark,#e2e8f0))]"
                >
                  {item.group}
                </div>
              ) : null}
              <button
                type="button"
                id={optionDomId}
                role={useListbox ? "option" : undefined}
                aria-selected={useListbox ? isActive : undefined}
                data-active={isActive ? "" : undefined}
                className={cn(
                  rowClassName,
                  isActive
                    ? "bg-[var(--zui-search-suggestion-bg-active,var(--zui-surface-hover,#ffffff0d))]"
                    : null,
                )}
                onMouseEnter={() => onActiveIdChange?.(item.id)}
                onFocus={() => onActiveIdChange?.(item.id)}
                onClick={() => onSelect(item.id)}
              >
                <span className="font-medium text-[color:var(--zui-search-suggestion-label-fg,var(--zui-fg,#0f172a))] dark:text-[color:var(--zui-search-suggestion-label-fg-dark,var(--zui-fg-dark,#f1f5f9))]">
                  {item.label}
                </span>
                {item.description ? (
                  <span className="truncate text-xs text-[color:var(--zui-search-suggestion-description-fg,var(--zui-fg-muted,#0f172a))] dark:text-[color:var(--zui-search-suggestion-description-fg-dark,var(--zui-fg-muted-dark,#e2e8f0))]">
                    {item.description}
                  </span>
                ) : null}
              </button>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}

SearchSuggestionList.displayName = "SearchSuggestionList";
