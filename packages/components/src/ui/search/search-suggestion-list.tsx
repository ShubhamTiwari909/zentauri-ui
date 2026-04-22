"use client";

import { Fragment } from "react";

import { cn } from "../../lib/utils";

import type { SearchSuggestionListProps } from "./types";

const rowClassName =
  "flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50";

export function SearchSuggestionList({
  items,
  onSelect,
  activeId,
  onActiveIdChange,
  className,
  listClassName,
  emptyLabel,
}: SearchSuggestionListProps) {
  if (items.length === 0) {
    return (
      <div
        data-slot="search-suggestion-list-empty"
        className={cn("px-1 py-6 text-center text-sm text-slate-500", className)}
      >
        {emptyLabel ?? "No matches."}
      </div>
    );
  }

  let lastGroup: string | undefined;

  return (
    <nav
      data-slot="search-suggestion-list"
      aria-label="Search results"
      className={cn("flex max-h-[min(50vh,360px)] flex-col gap-1 overflow-y-auto pr-1", className)}
    >
      <div className={cn("flex flex-col gap-0.5", listClassName)}>
        {items.map((item) => {
          const showGroup = item.group && item.group !== lastGroup;
          if (item.group) {
            lastGroup = item.group;
          }
          const isActive = activeId === item.id;
          return (
            <Fragment key={item.id}>
              {showGroup ? (
                <div className="sticky top-0 z-1 bg-slate-950/95 px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 backdrop-blur-sm">
                  {item.group}
                </div>
              ) : null}
              <button
                type="button"
                data-active={isActive ? "" : undefined}
                className={cn(rowClassName, isActive ? "bg-white/5" : null)}
                onMouseEnter={() => onActiveIdChange?.(item.id)}
                onFocus={() => onActiveIdChange?.(item.id)}
                onClick={() => onSelect(item.id)}
              >
                <span className="font-medium text-slate-100">{item.label}</span>
                {item.description ? (
                  <span className="truncate text-xs text-slate-500">{item.description}</span>
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
