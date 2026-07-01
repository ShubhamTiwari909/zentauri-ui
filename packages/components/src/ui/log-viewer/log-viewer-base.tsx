"use client";

import { useCallback, useMemo, useState } from "react";

import { cn } from "../../lib/utils";
import { useClipboard } from "../../hooks/useClipboard";

import type {
  LogEntry,
  LogLevel,
  LogViewerBaseProps,
  LogViewerLabels,
} from "./types";
import {
  logViewerActionVariants,
  logViewerEntryVariants,
  logViewerFilterVariants,
  logViewerHeaderVariants,
  logViewerLevelVariants,
  logViewerSearchInputVariants,
  logViewerSearchVariants,
  logViewerVariants,
} from "./variants";
import {
  zuiLogViewerTimestamp,
  zuiLogViewerMessage,
  zuiLogViewerMeta,
  zuiLogViewerSummaryBase,
  zuiLogViewerBodyBase,
  zuiLogViewerEmpty,
} from "../../design-system/log-viewer";

const ALL_LEVELS: LogLevel[] = ["error", "warn", "info", "debug", "verbose"];

const DEFAULT_LABELS: Required<LogViewerLabels> = {
  copy: "Copy",
  copied: "Copied",
  noLogs: "No log entries",
  searchPlaceholder: "Search logs\u2026",
  showing: "Showing",
  total: "Total",
};

export function formatLogTimestamp(timestamp: string | Date): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return date.toLocaleString("en-US", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "short",
    second: "2-digit",
  });
}

function buildLogCopyText(entries: LogEntry[]): string {
  return entries
    .map(
      (entry) =>
        `[${formatLogTimestamp(entry.timestamp)}] [${entry.level.toUpperCase()}] ${entry.message}${entry.meta ? ` \u2014 ${entry.meta}` : ""}`,
    )
    .join("\n");
}

export function LogViewerEntry({ entry }: { entry: LogEntry }) {
  return (
    <div
      data-slot="log-viewer-entry"
      data-level={entry.level}
      className={logViewerEntryVariants()}
    >
      <span data-slot="log-viewer-timestamp" className={zuiLogViewerTimestamp}>
        {formatLogTimestamp(entry.timestamp)}
      </span>
      <span
        data-slot="log-viewer-level"
        className={logViewerLevelVariants({ level: entry.level })}
      >
        {entry.level}
      </span>
      <div className="sm:min-w-0 sm:flex-1">
        <span data-slot="log-viewer-message" className={zuiLogViewerMessage}>
          {entry.message}
        </span>
        {entry.meta && (
          <div data-slot="log-viewer-meta" className={zuiLogViewerMeta}>
            {entry.meta}
          </div>
        )}
        {entry.stack && (
          <pre
            data-slot="log-viewer-stack"
            className={cn(
              zuiLogViewerMeta,
              "mt-1 whitespace-pre-wrap break-all",
            )}
          >
            {entry.stack}
          </pre>
        )}
      </div>
    </div>
  );
}

LogViewerEntry.displayName = "LogViewerEntry";

export function LogViewerHeader({
  activeLevels,
  enableClipboard,
  enableSearch,
  entries,
  labels,
  onSearchChange,
  onToggleLevel,
  searchQuery,
}: {
  activeLevels: Set<LogLevel>;
  enableClipboard: boolean;
  enableSearch: boolean;
  entries: LogEntry[];
  labels: Required<LogViewerLabels>;
  onSearchChange: (value: string) => void;
  onToggleLevel: (level: LogLevel) => void;
  searchQuery: string;
}) {
  const { copied, copy } = useClipboard(2000);

  const handleCopy = useCallback(async () => {
    await copy(buildLogCopyText(entries));
  }, [copy, entries]);

  return (
    <div data-slot="log-viewer-header" className={logViewerHeaderVariants()}>
      {ALL_LEVELS.map((level) => (
        <button
          key={level}
          type="button"
          data-slot="log-viewer-filter-button"
          data-level={level}
          data-active={activeLevels.has(level)}
          className={logViewerFilterVariants({
            active: activeLevels.has(level),
          })}
          onClick={() => onToggleLevel(level)}
        >
          {level}
        </button>
      ))}
      <div className="sm:ml-auto mt-5 sm:mt-0 flex items-center gap-2">
        {enableSearch && (
          <div
            data-slot="log-viewer-search"
            className={logViewerSearchVariants()}
          >
            <input
              type="text"
              data-slot="log-viewer-search-input"
              className={logViewerSearchInputVariants()}
              placeholder={
                typeof labels.searchPlaceholder === "string"
                  ? labels.searchPlaceholder
                  : "Search logs\u2026"
              }
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
        {enableClipboard && (
          <button
            type="button"
            data-slot="log-viewer-copy"
            className={logViewerActionVariants()}
            onClick={handleCopy}
          >
            {copied ? labels.copied : labels.copy}
          </button>
        )}
      </div>
    </div>
  );
}

LogViewerHeader.displayName = "LogViewerHeader";

export function LogViewerSummary({
  filtered,
  labels,
  total,
}: {
  filtered: number;
  labels: Required<LogViewerLabels>;
  total: number;
}) {
  return (
    <div data-slot="log-viewer-summary" className={zuiLogViewerSummaryBase}>
      <span>
        {labels.showing} {filtered} / {labels.total} {total}
      </span>
    </div>
  );
}

LogViewerSummary.displayName = "LogViewerSummary";

export function LogViewerBase({
  entries = [],
  appearance,
  size,
  defaultActiveLevels = ALL_LEVELS,
  showHeader = true,
  showSummary = true,
  enableClipboard = true,
  enableSearch = true,
  labels,
  className,
  ref,
  ...rest
}: LogViewerBaseProps) {
  const [activeLevels, setActiveLevels] = useState<Set<LogLevel>>(
    () => new Set(defaultActiveLevels),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

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
      <div data-slot="log-viewer-body" className={zuiLogViewerBodyBase}>
        {filteredEntries.length === 0 ? (
          <div data-slot="log-viewer-empty" className={zuiLogViewerEmpty}>
            {mergedLabels.noLogs}
          </div>
        ) : (
          filteredEntries.map((entry, index) => (
            <LogViewerEntry key={index} entry={entry} />
          ))
        )}
      </div>
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

LogViewerBase.displayName = "LogViewer";
