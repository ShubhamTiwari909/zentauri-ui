"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";
import { useClipboard } from "../../../hooks/useClipboard";

import type {
  ConsoleEntry,
  ConsoleEntryType,
  ConsoleViewerLabels,
} from "../types";
import {
  ConsoleViewerEntry,
  ConsoleViewerToolbar,
} from "../console-viewer-base";
import {
  consoleViewerVariants,
  zuiConsoleViewerBodyBase,
  zuiConsoleViewerEmpty,
} from "../variants";

import {
  consoleViewerAnimationPresets,
  consoleViewerEntryChildVariants,
} from "./animations";
import type { ConsoleViewerAnimatedProps } from "./types";

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

const DEFAULT_LABELS: Required<ConsoleViewerLabels> = {
  copy: "Copy",
  copied: "Copied",
  clear: "Clear",
  collapseAll: "Collapse",
  noEntries: "No entries",
};

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

export function ConsoleViewerAnimated({
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
  animation = "none",
  className,
  ref,
  ...rest
}: ConsoleViewerAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  const [activeFilterTypes, setActiveFilterTypes] = useState<
    Set<ConsoleEntryType>
  >(() => {
    if (defaultFilter) return new Set(defaultFilter);
    return new Set(ALL_TYPES);
  });
  const [localEntries, setLocalEntries] = useState<ConsoleEntry[]>(entries);
  const [allCollapsed, setAllCollapsed] = useState(initiallyCollapsed ?? false);

  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

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

  const preset = consoleViewerAnimationPresets[animation];
  const isStagger = animation === "stagger";

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
      <motion.div
        data-slot="console-viewer-body"
        className={zuiConsoleViewerBodyBase}
        initial="hidden"
        animate="visible"
        variants={preset.variants}
        transition={preset.transition}
      >
        {filteredEntries.length === 0 ? (
          <p data-slot="console-viewer-empty" className={zuiConsoleViewerEmpty}>
            {mergedLabels.noEntries}
          </p>
        ) : (
          filteredEntries.map((entry, index) => (
            <motion.div
              key={`${entry.type}-${String(entry.message).slice(0, 40)}-${index}`}
              variants={isStagger ? consoleViewerEntryChildVariants : undefined}
              transition={preset.transition}
            >
              <ConsoleViewerEntry
                entry={entry}
                defaultCollapsed={allCollapsed}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}

ConsoleViewerAnimated.displayName = "ConsoleViewerAnimated";
