"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";
import { useTimezone, type TimezoneInfo } from "../../hooks/useTimezone";

import type { TimezoneSelectBaseProps } from "./types";
import {
  timezoneSelectDropdownVariants,
  timezoneSelectGroupLabelVariants,
  timezoneSelectOffsetChipVariants,
  timezoneSelectOptionVariants,
  timezoneSelectSearchVariants,
  timezoneSelectTimeVariants,
  timezoneSelectVariants,
} from "./variants";

function groupTimezones(
  timezones: TimezoneInfo[],
  pinned: string[],
  localZone: string,
): Array<{ label: string; options: TimezoneInfo[] }> {
  const groups: Record<string, TimezoneInfo[]> = {};
  const pinnedOptions: TimezoneInfo[] = [];
  const seen = new Set<string>();

  for (const id of pinned) {
    const tz = timezones.find((t) => t.id === id);
    if (tz) {
      pinnedOptions.push(tz);
      seen.add(id);
    }
  }

  if (localZone && !seen.has(localZone)) {
    const local = timezones.find((t) => t.id === localZone);
    if (local) {
      pinnedOptions.unshift(local);
      seen.add(localZone);
    }
  }

  for (const tz of timezones) {
    if (seen.has(tz.id)) continue;
    if (!groups[tz.region]) {
      groups[tz.region] = [];
    }
    groups[tz.region]!.push(tz);
  }

  const result: Array<{ label: string; options: TimezoneInfo[] }> = [];
  if (pinnedOptions.length > 0) {
    result.push({ label: "Local", options: pinnedOptions });
  }
  for (const [region, options] of Object.entries(groups)) {
    result.push({ label: region, options });
  }
  return result;
}

function matchesSearch(tz: TimezoneInfo, query: string): boolean {
  const q = query.toLowerCase().replace(/[_\s]/g, "");
  return (
    tz.id.toLowerCase().replace(/[_\s]/g, "").includes(q) ||
    tz.city.toLowerCase().replace(/[_\s]/g, "").includes(q) ||
    tz.region.toLowerCase().includes(q)
  );
}

function useNow(locale: string, showTime: boolean): number {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!showTime) return;
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [showTime]);

  return now;
}

export function TimezoneSelectBase({
  value: controlledValue,
  defaultValue,
  onValueChange,
  locale: localeProp,
  groupByRegion = true,
  showTime = true,
  showOffset = true,
  pinnedTimezones = [],
  placeholder = "Search timezone...",
  disabled = false,
  appearance,
  size,
  className,
  ref,
  ...rest
}: TimezoneSelectBaseProps) {
  const locale =
    localeProp ??
    (typeof navigator !== "undefined" ? navigator.language : "en-US");
  const { timezones, supported, localTimezone, formatInZone } = useTimezone({
    locale,
  });
  const triggerId = useId();
  const contentId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const now = useNow(locale, showTime);

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = controlledValue ?? internalValue;

  const grouped = useMemo(() => {
    if (!supported || timezones.length === 0) return [];
    const zones = groupByRegion
      ? groupTimezones(timezones, pinnedTimezones, localTimezone)
      : [{ label: "All", options: timezones }];
    return zones;
  }, [timezones, supported, groupByRegion, pinnedTimezones, localTimezone]);

  const flatOptions = useMemo(() => {
    return grouped.flatMap((g) => g.options);
  }, [grouped]);

  const filtered = useMemo(() => {
    if (!query.trim()) return grouped;
    return grouped
      .map((g) => ({
        ...g,
        options: g.options.filter((tz) => matchesSearch(tz, query)),
      }))
      .filter((g) => g.options.length > 0);
  }, [grouped, query]);

  const flatFiltered = useMemo(() => {
    return filtered.flatMap((g) => g.options);
  }, [filtered]);

  const selectedInfo = useMemo(() => {
    if (!selectedValue) return null;
    return flatOptions.find((t) => t.id === selectedValue) ?? null;
  }, [selectedValue, flatOptions]);

  const handleSelect = useCallback(
    (tz: TimezoneInfo) => {
      setInternalValue(tz.id);
      onValueChange?.(tz.id, tz);
      setOpen(false);
      setQuery("");
    },
    [onValueChange],
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      searchRef.current?.focus();
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && flatFiltered[activeIndex]) {
            handleSelect(flatFiltered[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [open, activeIndex, flatFiltered, handleSelect],
  );

  if (!supported) {
    return (
      <div
        ref={ref}
        data-slot="timezone-select"
        className={cn(className)}
        {...rest}
      >
        <input
          type="text"
          placeholder="Timezone API not available — enter IANA ID manually"
          className="w-full rounded-lg border border-[var(--zui-border,#00000026)] px-3 py-2 text-sm"
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        containerRef.current = node;
      }}
      data-slot="timezone-select"
      className={cn(timezoneSelectVariants({ appearance, size }), className)}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={contentId}
      aria-activedescendant={
        activeIndex >= 0 ? `tz-opt-${flatFiltered[activeIndex]?.id}` : undefined
      }
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      <button
        type="button"
        data-slot="timezone-select-trigger"
        className="flex w-full items-center justify-between gap-2 bg-transparent"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        aria-labelledby={triggerId}
      >
        <span id={triggerId} className="truncate">
          {selectedInfo ? (
            <span className="flex items-center gap-2">
              <span className="font-medium">{selectedInfo.city}</span>
              <span className="text-[var(--zui-fg-muted)] text-xs">
                {selectedInfo.region}
              </span>
            </span>
          ) : (
            <span className="text-[var(--zui-fg-muted)]">{placeholder}</span>
          )}
        </span>
        <svg
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          id={contentId}
          role="listbox"
          data-slot="timezone-select-dropdown"
          className={cn(timezoneSelectDropdownVariants())}
        >
          <div className="sticky top-0 z-10 border-b border-[var(--zui-border,#00000026)] dark:border-[var(--zui-border-dark,#ffffff26)] bg-inherit">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
              }}
              className={cn(timezoneSelectSearchVariants())}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const container = containerRef.current;
                  if (container) {
                    container.dispatchEvent(
                      new KeyboardEvent(e.type, {
                        key: e.key,
                        bubbles: true,
                        cancelable: true,
                      }),
                    );
                  }
                  return;
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                  return;
                }
                if (e.key === "Enter" && activeIndex >= 0) {
                  e.preventDefault();
                  if (flatFiltered[activeIndex]) {
                    handleSelect(flatFiltered[activeIndex]);
                  }
                  return;
                }
              }}
            />
          </div>
          {filtered.map((group) => (
            <div key={group.label} data-slot="timezone-select-group">
              <div
                data-slot="timezone-select-group-label"
                className={cn(timezoneSelectGroupLabelVariants())}
              >
                {group.label}
              </div>
              {group.options.map((tz) => {
                const idx = flatFiltered.indexOf(tz);
                const isSelected = tz.id === selectedValue;
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={tz.id}
                    id={`tz-opt-${tz.id}`}
                    role="option"
                    aria-selected={isSelected}
                    data-slot="timezone-select-option"
                    className={cn(
                      timezoneSelectOptionVariants({
                        state: isSelected ? "selected" : "default",
                      }),
                      isActive &&
                        !isSelected &&
                        "bg-[var(--zui-surface-muted)] dark:bg-[var(--zui-surface-muted-dark)]",
                    )}
                    onClick={() => handleSelect(tz)}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium text-sm">
                        {tz.city}
                      </span>
                      <span className="truncate text-xs text-[var(--zui-fg-muted)]">
                        {tz.region}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {showTime && now && (
                        <span className={cn(timezoneSelectTimeVariants())}>
                          {formatInZone(now, tz.id, {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>
                      )}
                      {showOffset && (
                        <span
                          className={cn(timezoneSelectOffsetChipVariants())}
                        >
                          {tz.offsetLabel}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {flatFiltered.length === 0 && (
            <div className="px-3 py-4 text-center text-sm text-[var(--zui-fg-muted)]">
              No timezones found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

TimezoneSelectBase.displayName = "TimezoneSelect";
