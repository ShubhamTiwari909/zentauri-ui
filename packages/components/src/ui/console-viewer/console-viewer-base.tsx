"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "../../lib/utils";
import { useClipboard } from "../../hooks/useClipboard";

import type {
  ConsoleEntry,
  ConsoleEntryType,
  ConsoleViewerBaseProps,
  ConsoleViewerLabels,
} from "./types";
import {
  consoleViewerActionVariants,
  consoleViewerToolbarVariants,
  consoleViewerTypeVariants,
  consoleViewerVariants,
  zuiConsoleViewerActionActive,
  zuiConsoleViewerBodyBase,
  zuiConsoleViewerCountBase,
  zuiConsoleViewerEmpty,
  zuiConsoleViewerEntryBase,
  zuiConsoleViewerIconBase,
  zuiConsoleViewerIndent,
  zuiConsoleViewerMessage,
  zuiConsoleViewerMeta,
} from "./variants";

const DEFAULT_LABELS: Required<ConsoleViewerLabels> = {
  copy: "Copy",
  copied: "Copied",
  clear: "Clear",
  collapseAll: "Collapse",
  noEntries: "No entries",
};

const TYPE_ICONS: Record<ConsoleEntryType, string> = {
  log: "\u2139\uFE0F",
  info: "\u2139\uFE0F",
  warn: "\u26A0\uFE0F",
  error: "\u2716\uFE0F",
  debug: "\uD83D\uDCBE",
  dir: "\uD83D\uDCCB",
  table: "\uD83D\uDCCA",
  group: "\u25B6\uFE0F",
  groupCollapsed: "\u25B6\uFE0F",
  groupEnd: "\u2514\u2500",
};

const ALL_TYPES: ConsoleEntryType[] = [
  "log",
  "info",
  "warn",
  "error",
  "debug",
  "dir",
  "table",
  "group",
  "groupCollapsed",
  "groupEnd",
];

function collectAllMessages(entries: ConsoleEntry[]): string {
  const lines: string[] = [];
  function walk(list: ConsoleEntry[], indent = "") {
    for (const entry of list) {
      if (entry.type === "groupEnd") {
        lines.push(`${indent}${entry.message}`);
      } else {
        lines.push(`${indent}[${entry.type.toUpperCase()}] ${entry.message}`);
      }
      if (entry.stack) lines.push(`${indent}${entry.stack}`);
      if (entry.children) walk(entry.children, `${indent}  `);
    }
  }
  walk(entries);
  return lines.join("\n");
}

function matchesFilter(
  entry: ConsoleEntry,
  activeFilters: Set<ConsoleEntryType>,
): boolean {
  if (entry.type === "groupEnd") return activeFilters.has("groupEnd");
  if (entry.type === "group" || entry.type === "groupCollapsed") {
    if (!activeFilters.has("group") && !activeFilters.has("groupCollapsed"))
      return false;
    if (entry.children) {
      return entry.children.some((c) => matchesFilter(c, activeFilters));
    }
    return true;
  }
  return activeFilters.has(entry.type);
}

function isExpandableGroup(entry: ConsoleEntry): boolean {
  return (
    (entry.type === "group" || entry.type === "groupCollapsed") &&
    !!entry.children &&
    entry.children.length > 0
  );
}

export function ConsoleViewerToolbar({
  activeFilters,
  onToggleFilter,
  onClear,
  onCollapseAll,
  onCopy,
  copied,
  labels,
  enableFilter,
  enableClear,
  enableCollapseAll,
  enableClipboard,
  entryCount,
}: {
  activeFilters: Set<ConsoleEntryType>;
  onToggleFilter: (type: ConsoleEntryType) => void;
  onClear: () => void;
  onCollapseAll: () => void;
  onCopy: () => void;
  copied: boolean;
  labels: Required<ConsoleViewerLabels>;
  enableFilter: boolean;
  enableClear: boolean;
  enableCollapseAll: boolean;
  enableClipboard: boolean;
  entryCount: number;
}) {
  const filterTypes: ConsoleEntryType[] = [
    "log",
    "info",
    "warn",
    "error",
    "debug",
    "dir",
    "table",
  ];

  return (
    <div
      data-slot="console-viewer-toolbar"
      className={consoleViewerToolbarVariants()}
    >
      {enableFilter && (
        <div
          data-slot="console-viewer-filters"
          className="flex flex-wrap items-center gap-1"
        >
          {filterTypes.map((type) => (
            <button
              key={type}
              type="button"
              data-slot="console-viewer-filter-btn"
              data-type={type}
              data-active={activeFilters.has(type)}
              className={cn(
                consoleViewerActionVariants(),
                activeFilters.has(type) && zuiConsoleViewerActionActive,
              )}
              onClick={() => onToggleFilter(type)}
            >
              {TYPE_ICONS[type]} {type}
            </button>
          ))}
          <button
            type="button"
            data-slot="console-viewer-filter-btn"
            data-type="group"
            data-active={
              activeFilters.has("group") ||
              activeFilters.has("groupCollapsed") ||
              activeFilters.has("groupEnd")
            }
            className={cn(
              consoleViewerActionVariants(),
              (activeFilters.has("group") ||
                activeFilters.has("groupCollapsed") ||
                activeFilters.has("groupEnd")) &&
                zuiConsoleViewerActionActive,
            )}
            onClick={() => {
              const isGroupActive = activeFilters.has("group");
              (["group", "groupCollapsed", "groupEnd"] as const).forEach(
                (t) => {
                  const hasT = activeFilters.has(t);
                  if (isGroupActive && hasT) {
                    onToggleFilter(t);
                  } else if (!isGroupActive && !hasT) {
                    onToggleFilter(t);
                  }
                },
              );
            }}
          >
            {"\u25B6\uFE0F"} group
          </button>
        </div>
      )}
      <div className="ml-auto flex items-center gap-1">
        {enableClear && entryCount > 0 && (
          <button
            type="button"
            data-slot="console-viewer-clear"
            className={consoleViewerActionVariants()}
            onClick={onClear}
          >
            {labels.clear}
          </button>
        )}
        {enableCollapseAll && (
          <button
            type="button"
            data-slot="console-viewer-collapse-all"
            className={consoleViewerActionVariants()}
            onClick={onCollapseAll}
          >
            {labels.collapseAll}
          </button>
        )}
        {enableClipboard && (
          <button
            type="button"
            data-slot="console-viewer-copy"
            className={consoleViewerActionVariants()}
            onClick={onCopy}
          >
            {copied ? labels.copied : labels.copy}
          </button>
        )}
      </div>
    </div>
  );
}

function GroupToggle({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      data-slot="console-viewer-group-toggle"
      aria-expanded={expanded}
      className="mr-0.5 shrink-0 cursor-pointer text-xs leading-none"
      onClick={onToggle}
      tabIndex={0}
    >
      {expanded ? "\u25BC" : "\u25B6"}
    </button>
  );
}

export function ConsoleViewerEntry({
  entry,
  depth = 0,
  defaultCollapsed,
}: {
  entry: ConsoleEntry;
  depth?: number;
  defaultCollapsed?: boolean;
}) {
  const isGroup = isExpandableGroup(entry);
  const startCollapsed =
    defaultCollapsed === true || entry.type === "groupCollapsed";
  const [expanded, setExpanded] = useState(!startCollapsed);

  useEffect(() => {
    setExpanded(!startCollapsed);
  }, [startCollapsed]);

  const indentStyle =
    depth > 0
      ? {
          style: {
            paddingLeft: `${depth * 16}px`,
          } as React.CSSProperties,
        }
      : {};

  const icon = TYPE_ICONS[entry.type] ?? "\u2139\uFE0F";

  return (
    <>
      <div
        data-slot="console-viewer-entry"
        data-type={entry.type}
        className={cn(
          zuiConsoleViewerEntryBase,
          depth > 0 && zuiConsoleViewerIndent,
        )}
        {...indentStyle}
      >
        {isGroup && (
          <GroupToggle
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        )}
        {!isGroup && entry.type !== "groupEnd" && (
          <span
            data-slot="console-viewer-entry-icon"
            className={cn(
              zuiConsoleViewerIconBase,
              consoleViewerTypeVariants({ type: entry.type }),
            )}
          >
            {icon}
          </span>
        )}
        {entry.type === "groupEnd" && (
          <span
            data-slot="console-viewer-entry-icon"
            className={cn(
              zuiConsoleViewerIconBase,
              consoleViewerTypeVariants({ type: entry.type }),
            )}
          >
            {icon}
          </span>
        )}
        <span
          data-slot="console-viewer-entry-message"
          className={zuiConsoleViewerMessage}
        >
          {entry.message}
        </span>
        {entry.count !== undefined && entry.count > 1 && (
          <span
            data-slot="console-viewer-entry-count"
            className={zuiConsoleViewerCountBase}
          >
            {entry.count}
          </span>
        )}
        {entry.stack && (
          <div
            data-slot="console-viewer-entry-stack"
            className={zuiConsoleViewerMeta}
          >
            {entry.stack}
          </div>
        )}
      </div>
      {isGroup && expanded && entry.children && (
        <div data-slot="console-viewer-group-children">
          {entry.children.map((child, i) => (
            <ConsoleViewerEntry
              key={i}
              entry={child}
              depth={depth + 1}
              defaultCollapsed={defaultCollapsed}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function ConsoleViewerBase({
  entries = [],
  appearance,
  size,
  enableFilter = true,
  enableClear = true,
  enableCollapseAll = true,
  enableClipboard = true,
  labels,
  defaultFilter,
  initiallyCollapsed,
  className,
  ref,
  ...rest
}: ConsoleViewerBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  const [activeFilterTypes, setActiveFilterTypes] = useState<
    Set<ConsoleEntryType>
  >(() => {
    if (defaultFilter) return new Set(defaultFilter);
    return new Set(ALL_TYPES);
  });
  const [localEntries, setLocalEntries] = useState<ConsoleEntry[]>(entries);
  const [allCollapsed, setAllCollapsed] = useState(initiallyCollapsed ?? false);

  const getCopyText = useCallback(
    () => collectAllMessages(localEntries),
    [localEntries],
  );
  const { copied, copy } = useClipboard(2000);

  const handleCopy = useCallback(async () => {
    await copy(getCopyText());
  }, [copy, getCopyText]);

  const handleToggleFilter = useCallback((type: ConsoleEntryType) => {
    setActiveFilterTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  const handleClear = useCallback(() => {
    setLocalEntries([]);
  }, []);

  const handleCollapseAll = useCallback(() => {
    setAllCollapsed((prev) => !prev);
  }, []);

  const filteredEntries = useMemo(
    () => localEntries.filter((e) => matchesFilter(e, activeFilterTypes)),
    [localEntries, activeFilterTypes],
  );

  return (
    <div
      ref={ref}
      data-slot="console-viewer"
      className={cn(consoleViewerVariants({ appearance, size }), className)}
      {...rest}
    >
      <ConsoleViewerToolbar
        activeFilters={activeFilterTypes}
        onToggleFilter={handleToggleFilter}
        onClear={handleClear}
        onCollapseAll={handleCollapseAll}
        onCopy={handleCopy}
        copied={copied}
        labels={mergedLabels}
        enableFilter={enableFilter}
        enableClear={enableClear}
        enableCollapseAll={enableCollapseAll}
        enableClipboard={enableClipboard}
        entryCount={localEntries.length}
      />
      <div data-slot="console-viewer-body" className={zuiConsoleViewerBodyBase}>
        {filteredEntries.length === 0 ? (
          <p data-slot="console-viewer-empty" className={zuiConsoleViewerEmpty}>
            {mergedLabels.noEntries}
          </p>
        ) : (
          filteredEntries.map((entry, index) => (
            <ConsoleViewerEntry
              key={index}
              entry={entry}
              defaultCollapsed={allCollapsed}
            />
          ))
        )}
      </div>
    </div>
  );
}

ConsoleViewerBase.displayName = "ConsoleViewer";
