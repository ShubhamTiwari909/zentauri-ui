"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import type { LogLevel, LogViewerLabels } from "../types";
import {
  LogViewerEntry,
  LogViewerHeader,
  LogViewerSummary,
} from "../log-viewer-base";
import { logViewerVariants } from "../variants";

import {
  logViewerAnimationPresets,
  logViewerEntryChildVariants,
} from "./animations";
import type { LogViewerAnimatedProps } from "./types";
import {
  zuiLogViewerBodyBase,
  zuiLogViewerEmpty,
} from "../../../design-system/log-viewer";

const ALL_LEVELS: LogLevel[] = ["error", "warn", "info", "debug", "verbose"];

const DEFAULT_LABELS: Required<LogViewerLabels> = {
  copy: "Copy",
  copied: "Copied",
  filterLabel: "Level",
  noLogs: "No log entries",
  searchPlaceholder: "Search logs\u2026",
  showing: "Showing",
  total: "Total",
};

export function LogViewerAnimated({
  entries = [],
  appearance,
  size,
  defaultActiveLevels = ALL_LEVELS,
  showHeader = true,
  showSummary = true,
  enableClipboard = true,
  enableSearch = true,
  labels,
  animation = "none",
  className,
  ref,
  ...rest
}: LogViewerAnimatedProps) {
  const [activeLevels, setActiveLevels] = useState<Set<LogLevel>>(
    () => new Set(defaultActiveLevels),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const preset = logViewerAnimationPresets[animation];
  const isStagger = animation === "stagger";

  const toggleLevel = useCallback((level: LogLevel) => {
    setActiveLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        if (next.size === 1) return prev;
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  }, []);

  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        if (!activeLevels.has(entry.level)) return false;
        if (searchQuery) {
          return entry.message
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return true;
      }),
    [entries, activeLevels, searchQuery],
  );

  return (
    <div
      ref={ref}
      data-slot="log-viewer"
      className={cn(logViewerVariants({ appearance, size }), className)}
      {...rest}
    >
      {showHeader && (
        <LogViewerHeader
          activeLevels={activeLevels}
          enableClipboard={enableClipboard}
          enableSearch={enableSearch}
          entries={entries}
          labels={mergedLabels}
          onSearchChange={setSearchQuery}
          onToggleLevel={toggleLevel}
          searchQuery={searchQuery}
        />
      )}
      <motion.div
        data-slot="log-viewer-body"
        className={zuiLogViewerBodyBase}
        initial="hidden"
        animate="visible"
        variants={preset.variants}
        transition={preset.transition}
      >
        {filteredEntries.length === 0 ? (
          <div data-slot="log-viewer-empty" className={zuiLogViewerEmpty}>
            {mergedLabels.noLogs}
          </div>
        ) : (
          filteredEntries.map((entry, index) => (
            <motion.div
              key={index}
              variants={isStagger ? logViewerEntryChildVariants : undefined}
              transition={preset.transition}
            >
              <LogViewerEntry entry={entry} />
            </motion.div>
          ))
        )}
      </motion.div>
      {showSummary && (
        <LogViewerSummary
          filtered={filteredEntries.length}
          labels={mergedLabels}
          total={entries.length}
        />
      )}
    </div>
  );
}

LogViewerAnimated.displayName = "LogViewerAnimated";
