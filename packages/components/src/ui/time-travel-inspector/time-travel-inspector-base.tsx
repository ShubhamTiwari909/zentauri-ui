"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
  diffTimeTravelStates,
  indexTimeTravelHistory,
  resolveTimeTravelState,
} from "./history";
import type {
  TimeTravelInspectorProps,
  TimeTravelRenderContext,
} from "./types";
import {
  timeTravelInspectorVariants,
  zuiTimeTravelInspectorToolbarBase as toolbar,
  zuiTimeTravelInspectorMutedBase as muted,
  zuiTimeTravelInspectorControlBase as control,
  zuiTimeTravelInspectorSelectedBase as selected,
  zuiTimeTravelInspectorTimelineBase as timeline,
  zuiTimeTravelInspectorScrubberBase as scrubber,
  zuiTimeTravelInspectorPanelBase as panel,
  zuiTimeTravelInspectorCodeBase as code,
  zuiTimeTravelInspectorChangeBase as changeRow,
  zuiTimeTravelInspectorBeforeBase as before,
  zuiTimeTravelInspectorAfterBase as after,
} from "./variants";

const defaultFormatTimestamp = (timestamp: number) => `${timestamp} ms`;
const serialize = (value: unknown) => JSON.stringify(value, null, 2);

export function TimeTravelInspector({
  snapshots,
  selectedId,
  defaultSelectedId,
  onSelectedIdChange,
  comparisonId,
  defaultComparisonId = null,
  onComparisonIdChange,
  bookmarks,
  defaultBookmarks = [],
  onBookmarksChange,
  renderPreview,
  onOpenState,
  formatTimestamp = defaultFormatTimestamp,
  emptyState = "No snapshots recorded yet.",
  appearance = "default",
  size = "md",
  className,
  ref,
  ...props
}: TimeTravelInspectorProps) {
  const id = useId();
  const timelineRef = useRef<HTMLOListElement>(null);
  const selectedEventRef = useRef<HTMLButtonElement>(null);
  const [localId, setLocalId] = useState(defaultSelectedId);
  const [localComparison, setLocalComparison] = useState<string | null>(
    defaultComparisonId,
  );
  const [localBookmarks, setLocalBookmarks] =
    useState<readonly string[]>(defaultBookmarks);
  const ids = useMemo(() => indexTimeTravelHistory(snapshots), [snapshots]);
  const index = ids.get(selectedId ?? localId ?? "") ?? snapshots.length - 1;
  const baselineId =
    comparisonId === undefined ? localComparison : comparisonId;
  const baselineIndex = ids.get(baselineId ?? "") ?? Math.max(0, index - 1);
  const hasSnapshots = index >= 0;
  const state = useMemo(
    () => (index >= 0 ? resolveTimeTravelState(snapshots, index) : null),
    [snapshots, index],
  );
  const comparisonState = useMemo(
    () =>
      hasSnapshots ? resolveTimeTravelState(snapshots, baselineIndex) : null,
    [snapshots, baselineIndex, hasSnapshots],
  );
  const changes = useMemo(
    () => diffTimeTravelStates(comparisonState, state),
    [comparisonState, state],
  );
  const activeBookmarks = [...new Set(bookmarks ?? localBookmarks)].filter(
    (key) => ids.has(key),
  );
  const snapshot = snapshots[index];
  const comparisonSnapshot = snapshots[baselineIndex];
  const context: TimeTravelRenderContext | null =
    snapshot && comparisonSnapshot
      ? { snapshot, index, state, comparisonSnapshot, comparisonState, changes }
      : null;

  useEffect(() => {
    const track = timelineRef.current;
    const event = selectedEventRef.current;
    if (!track || !event) return;
    const trackBounds = track.getBoundingClientRect();
    const eventBounds = event.getBoundingClientRect();
    // Adjust only this strip; scrollIntoView can also move the document.
    if (eventBounds.left < trackBounds.left) {
      track.scrollLeft += eventBounds.left - trackBounds.left;
    } else if (eventBounds.right > trackBounds.right) {
      track.scrollLeft += eventBounds.right - trackBounds.right;
    }
  }, [index, snapshots]);

  function selectIndex(next: number) {
    const event = snapshots[next];
    if (!event || next === index) return;
    if (selectedId === undefined) setLocalId(event.id);
    onSelectedIdChange?.(event.id);
  }
  function toggleBookmark() {
    if (!snapshot) return;
    const next = activeBookmarks.includes(snapshot.id)
      ? activeBookmarks.filter((key) => key !== snapshot.id)
      : [...activeBookmarks, snapshot.id];
    if (bookmarks === undefined) setLocalBookmarks(next);
    onBookmarksChange?.(next);
  }

  return (
    <div
      ref={ref}
      data-slot="time-travel-inspector"
      data-appearance={appearance}
      data-size={size}
      className={cn(
        timeTravelInspectorVariants({ appearance, size }),
        className,
      )}
      {...props}
    >
      {!context ? (
        <div data-slot="time-travel-inspector-empty" className="p-6">
          {emptyState}
        </div>
      ) : (
        <>
          <div data-slot="time-travel-inspector-toolbar" className={toolbar}>
            <div className="min-w-[12rem] flex-1">
              <p className="font-semibold">Time travel inspector</p>
              <p className={muted}>
                {snapshots.length} events · {index + 1} of {snapshots.length}
              </p>
            </div>
            <button
              type="button"
              className={cn(
                control,
                activeBookmarks.includes(context.snapshot.id) && selected,
              )}
              aria-pressed={activeBookmarks.includes(context.snapshot.id)}
              onClick={toggleBookmark}
            >
              {activeBookmarks.includes(context.snapshot.id)
                ? "Bookmarked"
                : "Bookmark event"}
            </button>
            {onOpenState && (
              <button
                type="button"
                className={control}
                onClick={() => onOpenState(context)}
              >
                Open historical state
              </button>
            )}
          </div>
          <div data-slot="time-travel-inspector-timeline" className={timeline}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div role="status" aria-live="polite" aria-atomic="true">
                <p className="font-semibold">{context.snapshot.label}</p>
                <p className={muted}>
                  {formatTimestamp(context.snapshot.timestamp)} ·{" "}
                  {context.snapshot.kind}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={control}
                  disabled={index === 0}
                  onClick={() => selectIndex(index - 1)}
                >
                  Previous event
                </button>
                <button
                  type="button"
                  className={control}
                  disabled={index === snapshots.length - 1}
                  onClick={() => selectIndex(index + 1)}
                >
                  Next event
                </button>
              </div>
            </div>
            <label htmlFor={`${id}-scrubber`} className="sr-only">
              Snapshot
            </label>
            <input
              id={`${id}-scrubber`}
              data-slot="time-travel-inspector-scrubber"
              className={scrubber}
              type="range"
              min={0}
              max={Math.max(1, snapshots.length - 1)}
              step={1}
              value={index}
              disabled={snapshots.length < 2}
              aria-valuetext={`${context.snapshot.label}, ${formatTimestamp(context.snapshot.timestamp)}`}
              onChange={(event) => selectIndex(Number(event.target.value))}
            />
            <div className="flex justify-between gap-2">
              <span className={muted}>
                {formatTimestamp(snapshots[0]!.timestamp)}
              </span>
              <span className={muted}>
                {formatTimestamp(snapshots[snapshots.length - 1]!.timestamp)}
              </span>
            </div>
            <ol
              ref={timelineRef}
              aria-label="Nearby events"
              className="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-1"
            >
              {snapshots
                .slice(
                  Math.max(0, index - 3),
                  Math.min(snapshots.length, index + 4),
                )
                .map((event) => (
                  <li key={event.id} className="shrink-0">
                    <button
                      ref={
                        event.id === context.snapshot.id
                          ? selectedEventRef
                          : undefined
                      }
                      type="button"
                      className={cn(
                        control,
                        event.id === context.snapshot.id && selected,
                      )}
                      aria-current={
                        event.id === context.snapshot.id ? "step" : undefined
                      }
                      onClick={() => selectIndex(ids.get(event.id)!)}
                    >
                      <span className="block">
                        {activeBookmarks.includes(event.id) ? "★ " : ""}
                        {event.label}
                      </span>
                      <span className="mt-1 block text-[0.7rem]">
                        {formatTimestamp(event.timestamp)}
                      </span>
                    </button>
                  </li>
                ))}
            </ol>
          </div>
          <div className="grid gap-4 p-4 @lg:grid-cols-2">
            <label className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className={muted}>Compare from</span>
              <select
                className={cn(control, "w-full min-w-0")}
                value={
                  baselineId !== null && ids.has(baselineId)
                    ? `event:${baselineId}`
                    : "previous"
                }
                onChange={(event) => {
                  const next =
                    event.target.value === "previous"
                      ? null
                      : event.target.value.slice(6);
                  if (comparisonId === undefined) setLocalComparison(next);
                  onComparisonIdChange?.(next);
                }}
              >
                <option value="previous">Previous event (automatic)</option>
                {snapshots.map((event) => (
                  <option key={event.id} value={`event:${event.id}`}>
                    {formatTimestamp(event.timestamp)} · {event.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className={muted}>
                Jump to bookmark ({activeBookmarks.length})
              </span>
              <select
                className={cn(control, "w-full min-w-0")}
                value=""
                disabled={!activeBookmarks.length}
                onChange={(event) => {
                  const next = ids.get(event.target.value);
                  if (next !== undefined) selectIndex(next);
                }}
              >
                <option value="">Choose a bookmarked event</option>
                {activeBookmarks.map((key) => (
                  <option key={key} value={key}>
                    {snapshots[ids.get(key)!]!.label} ·{" "}
                    {formatTimestamp(snapshots[ids.get(key)!]!.timestamp)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid min-w-0 gap-4 px-4 pb-4 @2xl:grid-cols-2">
            <section
              data-slot="time-travel-inspector-state"
              className={panel}
              aria-labelledby={`${id}-state`}
            >
              <h3 id={`${id}-state`} className="font-semibold">
                State at {formatTimestamp(context.snapshot.timestamp)}
              </h3>
              <pre
                tabIndex={0}
                className={cn(code, "focus-visible:outline-auto")}
              >
                {serialize(state)}
              </pre>
            </section>
            <section
              data-slot="time-travel-inspector-preview"
              className={panel}
              aria-labelledby={`${id}-preview`}
            >
              <h3 id={`${id}-preview`} className="font-semibold">
                Visual preview
              </h3>
              <div className="min-w-0">
                {renderPreview ? (
                  renderPreview(context)
                ) : (
                  <p className={muted}>
                    Provide renderPreview to display your application at this
                    moment.
                  </p>
                )}
              </div>
            </section>
            <section
              data-slot="time-travel-inspector-changes"
              className={cn(panel, "@2xl:col-span-2")}
              aria-labelledby={`${id}-changes`}
            >
              <h3 id={`${id}-changes`} className="font-semibold">
                {changes.length} {changes.length === 1 ? "change" : "changes"}
              </h3>
              <p className={muted}>
                {context.comparisonSnapshot.label} (
                {formatTimestamp(context.comparisonSnapshot.timestamp)}) →{" "}
                {context.snapshot.label} (
                {formatTimestamp(context.snapshot.timestamp)})
              </p>
              {changes.length === 0 ? (
                <p className={muted}>No state changes between these events.</p>
              ) : (
                <ul className="m-0 max-h-80 list-none space-y-2 overflow-auto p-0">
                  {changes.map((change) => (
                    <li key={JSON.stringify(change.path)} className={changeRow}>
                      <p className="mb-2 break-all font-mono text-xs font-semibold">
                        {change.path.length
                          ? `/${change.path.map((key) => key.replace(/~/g, "~0").replace(/\//g, "~1")).join("/")}`
                          : "(root)"}{" "}
                        · {change.type}
                      </p>
                      <div className="grid gap-2 @lg:grid-cols-2">
                        <p className={before}>
                          <span className="font-sans font-semibold">
                            Before:{" "}
                          </span>
                          {change.type === "added"
                            ? "(absent)"
                            : serialize(change.before)}
                        </p>
                        <p className={after}>
                          <span className="font-sans font-semibold">
                            After:{" "}
                          </span>
                          {change.type === "removed"
                            ? "(absent)"
                            : serialize(change.after)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
