"use client";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";
import { cn } from "../../lib/utils";
import { useVirtualList } from "../../hooks/useVirtualList";
import * as tokens from "../../design-system/change-impact-explorer";
import { changeImpactExplorerVariants } from "./variants";
import {
  buildChangeImpactGraph,
  analyzeChangeImpact,
  getChangeImpactPath,
} from "./impact-graph";
import type {
  ChangeImpactExplorerProps,
  ChangeImpactEntry,
  ChangeImpactAnalysis,
  ChangeImpactDetailsContext,
} from "./types";

const kindLabels = {
  changed: "Changed",
  direct: "Direct",
  transitive: "Indirect",
  outside: "Outside analysis",
};
const defaultNode = (entry: ChangeImpactEntry) => (
  <>
    <span className="block truncate font-medium">{entry.node.label}</span>
    <span className="block truncate text-xs opacity-70">
      {entry.node.category ?? "Item"}
      {entry.node.priority ? ` · ${entry.node.priority} priority` : ""}
    </span>
  </>
);
function positive(value: number, fallback: number) {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function keepRowVisible(
  container: HTMLDivElement,
  index: number,
  rowHeight: number,
) {
  if (!container.clientHeight) return;
  const top = index * rowHeight;
  const bottom = top + rowHeight;
  if (top < container.scrollTop) container.scrollTop = top;
  else if (bottom > container.scrollTop + container.clientHeight)
    container.scrollTop = bottom - container.clientHeight;
}

const ImpactMap = memo(function ImpactMap({
  analysis,
  selected,
  limit,
  choose,
  renderNode,
}: {
  analysis: ChangeImpactAnalysis;
  selected?: string;
  limit: number;
  choose: (id: string) => void;
  renderNode: NonNullable<ChangeImpactExplorerProps["renderNode"]>;
}) {
  const entries = analysis.entries.slice(
    0,
    Math.max(1, Math.floor(positive(limit, 24))),
  );
  const lanes = new Map<number, ChangeImpactEntry[]>();
  for (const entry of entries) {
    const lane = lanes.get(entry.depth!) ?? [];
    lane.push(entry);
    lanes.set(entry.depth!, lane);
  }
  return (
    <section
      data-slot="change-impact-explorer-map"
      aria-label="Dependency map"
      className={tokens.zuiChangeImpactExplorerMap}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">Dependency map</h3>
        <span className="text-xs opacity-70">
          {entries.length} of {analysis.entries.length} reachable items ·
          shortest paths
        </span>
      </div>
      <div
        className="flex min-w-0 gap-4"
        style={{
          minWidth: lanes.size > 1 ? `${lanes.size * 210}px` : undefined,
        }}
      >
        {[...lanes].map(([depth, lane]) => (
          <div key={depth} className={tokens.zuiChangeImpactExplorerLane}>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
              {depth === 0 ? "Proposed change" : `Hop ${depth}`}
            </p>
            {lane.map((entry) => (
              <button
                key={entry.node.id}
                type="button"
                data-slot="change-impact-explorer-map-node"
                aria-pressed={entry.node.id === selected}
                className={tokens.zuiChangeImpactExplorerNode}
                onClick={() => choose(entry.node.id)}
              >
                {renderNode(entry)}
                {analysis.parents.has(entry.node.id) && (
                  <span className="block max-w-full truncate text-xs opacity-70">
                    Via{" "}
                    {
                      analysis.graph.nodes.get(
                        analysis.parents.get(entry.node.id)!.nodeId,
                      )?.label
                    }
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      {entries.length < analysis.entries.length && (
        <p className="mt-4 text-xs opacity-70">
          Additional items are available in the searchable results below.
        </p>
      )}
    </section>
  );
});

const ImpactResults = memo(function ImpactResults({
  items,
  selected,
  choose,
  virtualize,
  rowHeight,
  height,
  renderNode,
  id,
  hasSearch,
}: {
  items: readonly ChangeImpactEntry[];
  selected?: string;
  choose: (id: string) => void;
  virtualize: boolean;
  rowHeight: number;
  height: number;
  renderNode: NonNullable<ChangeImpactExplorerProps["renderNode"]>;
  id: string;
  hasSearch: boolean;
}) {
  const virtual = useVirtualList({
    itemCount: items.length,
    itemHeight: rowHeight,
    overscan: 4,
  });
  const indices = useMemo(
    () => new Map(items.map((entry, index) => [entry.node.id, index])),
    [items],
  );
  const [activeState, setActiveState] = useState<{
    id: string;
    selection?: string;
  }>();
  const activeId =
    activeState?.selection === selected ? activeState?.id : selected;
  const index =
    indices.get(activeId ?? selected ?? "") ??
    indices.get(selected ?? "") ??
    -1;
  const windowed = virtualize && items.length > 100;
  const root = useRef<HTMLDivElement | null>(null);
  const virtualContainerRef = virtual.setContainerRef;
  const setContainer = useCallback(
    (node: HTMLDivElement | null) => {
      root.current = node;
      virtualContainerRef(node);
    },
    [virtualContainerRef],
  );
  const typeahead = useRef({ text: "", time: 0 });
  const scroll = virtual.scrollToIndex;
  useEffect(() => {
    const selectedIndex = selected ? indices.get(selected) : undefined;
    if (selectedIndex !== undefined && windowed) scroll(selectedIndex);
    else if (root.current) {
      if (selectedIndex !== undefined)
        keepRowVisible(root.current, selectedIndex, rowHeight);
      else root.current.scrollTop = 0;
    }
  }, [items, selected, indices, windowed, scroll, rowHeight]);
  // Only reference mounted options after pointer scrolling.
  const rows = windowed
    ? virtual.virtualItems
    : items.map((_, index) => ({
        index,
        start: index * rowHeight,
        size: rowHeight,
      }));
  const mounted = new Set(rows.map((row) => row.index));
  const active = items[index];
  function move(next: number) {
    const entry = items[next];
    if (!entry) return;
    setActiveState({ id: entry.node.id, selection: selected });
    choose(entry.node.id);
    if (windowed) scroll(next);
    else if (root.current) keepRowVisible(root.current, next, rowHeight);
  }
  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      !items.length
    )
      return;
    let next: number | undefined;
    if (event.key === "ArrowDown") next = Math.min(index + 1, items.length - 1);
    else if (event.key === "ArrowUp") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "Enter" || event.key === " ")
      next = Math.max(0, index);
    else if (event.key.length === 1) {
      const now = Date.now();
      const key = event.key.toLocaleLowerCase();
      const previous = typeahead.current.text;
      typeahead.current.text =
        now - typeahead.current.time > 600 || previous === key
          ? key
          : previous + key;
      typeahead.current.time = now;
      const text = typeahead.current.text.toLocaleLowerCase();
      for (let offset = 1; offset <= items.length; offset++) {
        const candidate = (index + offset) % items.length;
        if (items[candidate]!.node.label.toLocaleLowerCase().startsWith(text)) {
          next = candidate;
          break;
        }
      }
    }
    if (next !== undefined) {
      event.preventDefault();
      move(next);
    }
  }
  if (!items.length)
    return (
      <p className={tokens.zuiChangeImpactExplorerEmpty}>
        {hasSearch
          ? "No items match your search."
          : "No items in this analysis."}
      </p>
    );
  return (
    <div
      ref={setContainer}
      role="listbox"
      tabIndex={0}
      aria-label="Impact results"
      aria-describedby={`${id}-help`}
      aria-activedescendant={
        active && mounted.has(index) ? `${id}-item-${index}` : undefined
      }
      onKeyDown={handleKey}
      className={tokens.zuiChangeImpactExplorerList}
      data-slot="change-impact-explorer-list"
      data-virtualized={windowed || undefined}
      style={{ height }}
    >
      <div
        role="presentation"
        style={
          windowed
            ? { height: virtual.totalHeight, position: "relative" }
            : undefined
        }
      >
        {rows.map((row) => {
          const entry = items[row.index]!;
          return (
            <div
              id={`${id}-item-${row.index}`}
              role="option"
              key={entry.node.id}
              aria-label={`${entry.node.label}, ${kindLabels[entry.kind]}`}
              aria-selected={selected === entry.node.id}
              aria-setsize={items.length}
              aria-posinset={row.index + 1}
              data-index={row.index}
              data-slot="change-impact-explorer-item"
              className={tokens.zuiChangeImpactExplorerItem}
              style={{
                height: rowHeight,
                ...(windowed
                  ? { position: "absolute", insetInline: 0, top: row.start }
                  : {}),
              }}
              onClick={() => {
                root.current?.focus();
                move(row.index);
              }}
            >
              <span className="min-w-0 flex-1 overflow-hidden">
                {renderNode(entry)}
              </span>
              <span className={tokens.zuiChangeImpactExplorerBadge}>
                {kindLabels[entry.kind]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

function ImpactDetails({
  context,
  renderDetails,
}: {
  context?: ChangeImpactDetailsContext;
  renderDetails?: ChangeImpactExplorerProps["renderDetails"];
}) {
  return (
    <section
      aria-label="Item details"
      data-slot="change-impact-explorer-details"
      className={tokens.zuiChangeImpactExplorerDetails}
    >
      {!context ? (
        <p className={tokens.zuiChangeImpactExplorerEmpty}>
          Select an item to inspect its impact.
        </p>
      ) : renderDetails ? (
        renderDetails(context)
      ) : (
        <div className="space-y-5">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide opacity-70">
              {context.node.category ?? "Item"} ·{" "}
              {context.entry
                ? kindLabels[context.entry.kind]
                : "Outside analysis"}
            </p>
            <h3 className="text-lg font-semibold break-words">
              {context.node.label}
            </h3>
            {context.node.description != null && (
              <div className="mt-2 opacity-80">{context.node.description}</div>
            )}
          </div>
          <div>
            <h4 className="mb-3 font-semibold">
              Connection to the proposed change
            </h4>
            {context.path.length ? (
              <ol className={tokens.zuiChangeImpactExplorerPath}>
                {context.path.length > 12 && (
                  <li className="text-xs opacity-70">
                    {context.path.length - 12} earlier steps omitted from this
                    preview.
                  </li>
                )}
                {context.path.slice(-12).map((step, index) => (
                  <li
                    key={step.node.id}
                    data-slot="change-impact-explorer-path-step"
                  >
                    {step.via && (
                      <div className="mb-1 text-xs opacity-70">
                        {step.via.reason != null
                          ? step.via.reason
                          : "Connected by a supplied dependency"}
                      </div>
                    )}
                    <span className="font-medium">{step.node.label}</span>
                    {!step.via && index === 0 && (
                      <span className="ms-2 text-xs opacity-70">
                        Changed item
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm opacity-70">
                No dependency path was found within this analysis.
              </p>
            )}
          </div>
          {context.comparisons.map((comparison, index) => (
            <div key={index}>
              <h4 className="mb-3 font-semibold">
                {comparison.label ?? "Before and after"}
              </h4>
              <div className={tokens.zuiChangeImpactExplorerComparison}>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-wide opacity-70">
                    Before
                  </p>
                  <div
                    data-slot="change-impact-explorer-before"
                    className={tokens.zuiChangeImpactExplorerValue}
                  >
                    {comparison.before != null
                      ? comparison.before
                      : "Not supplied"}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-wide opacity-70">
                    After
                  </p>
                  <div
                    data-slot="change-impact-explorer-after"
                    className={tokens.zuiChangeImpactExplorerValue}
                  >
                    {comparison.after != null
                      ? comparison.after
                      : "Not supplied"}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {context.node.metadata != null && <div>{context.node.metadata}</div>}
        </div>
      )}
    </section>
  );
}

export function ChangeImpactExplorerBase({
  nodes,
  edges,
  changes,
  title = "Change impact explorer",
  changeId,
  defaultChangeId,
  onChangeIdChange,
  selectedNodeId,
  defaultSelectedNodeId,
  onSelectedNodeIdChange,
  query,
  defaultQuery = "",
  onQueryChange,
  direction = "downstream",
  maxDepth,
  showOutsideAnalysis = false,
  showMap = true,
  mapNodeLimit = 24,
  virtualize = true,
  rowHeight = 64,
  listHeight = 384,
  loading = false,
  error,
  emptyContent,
  renderNode = defaultNode,
  renderDetails,
  appearance,
  size,
  className,
  ref,
  ...props
}: ChangeImpactExplorerProps) {
  const id = useId();
  const [localChange, setLocalChange] = useState(defaultChangeId);
  const [localSelected, setLocalSelected] = useState(defaultSelectedNodeId);
  const [localQuery, setLocalQuery] = useState(defaultQuery);
  const actualQuery = query ?? localQuery;
  const search = useDeferredValue(actualQuery).trim().toLocaleLowerCase();
  const graph = useMemo(
    () => buildChangeImpactGraph(nodes, edges),
    [nodes, edges],
  );
  const change = useMemo(() => {
    const seen = new Set<string>();
    for (const item of changes) {
      if (!item.id || seen.has(item.id))
        throw new Error(
          `Change Impact Explorer: duplicate or empty change ID "${item.id}".`,
        );
      seen.add(item.id);
    }
    const requested = changeId ?? localChange;
    return (
      changes.find((item) => item.id === requested) ??
      (changeId === undefined ? changes[0] : undefined)
    );
  }, [changes, changeId, localChange]);
  const changedNodeIds = change?.nodeIds;
  const analysis = useMemo(
    () =>
      analyzeChangeImpact(graph, changedNodeIds ?? [], {
        direction,
        maxDepth,
      }),
    [graph, changedNodeIds, direction, maxDepth],
  );
  const allItems = useMemo(
    () =>
      showOutsideAnalysis
        ? [
            ...analysis.entries,
            ...[...graph.nodes.values()]
              .filter((node) => !analysis.byId.has(node.id))
              .map((node) => ({ node, depth: null, kind: "outside" as const })),
          ]
        : analysis.entries,
    [analysis, graph, showOutsideAnalysis],
  );
  const items = useMemo(
    () =>
      search
        ? allItems.filter((entry) =>
            `${entry.node.label} ${entry.node.category ?? ""} ${entry.node.priority ?? ""}`
              .toLocaleLowerCase()
              .includes(search),
          )
        : allItems,
    [allItems, search],
  );
  const selected =
    selectedNodeId !== undefined
      ? selectedNodeId
      : localSelected &&
          graph.nodes.has(localSelected) &&
          (showOutsideAnalysis || analysis.byId.has(localSelected))
        ? localSelected
        : analysis.entries[0]?.node.id;
  const choose = useCallback(
    (nodeId: string) => {
      const node = graph.nodes.get(nodeId);
      if (!node || nodeId === selected) return;
      if (selectedNodeId === undefined) setLocalSelected(nodeId);
      onSelectedNodeIdChange?.(nodeId, node);
    },
    [graph, selected, selectedNodeId, onSelectedNodeIdChange],
  );
  const context = useMemo<ChangeImpactDetailsContext | undefined>(() => {
    const node = selected ? graph.nodes.get(selected) : undefined;
    return node
      ? {
          node,
          entry: analysis.byId.get(node.id),
          change,
          path: getChangeImpactPath(analysis, node.id),
          comparisons:
            change?.comparisons?.filter(
              (comparison) => comparison.nodeId === node.id,
            ) ?? [],
        }
      : undefined;
  }, [selected, graph, analysis, change]);
  const counts = useMemo(
    () => ({
      changed: analysis.entries.filter((entry) => entry.kind === "changed")
        .length,
      direct: analysis.entries.filter((entry) => entry.kind === "direct")
        .length,
      transitive: analysis.entries.filter(
        (entry) => entry.kind === "transitive",
      ).length,
      outside: graph.nodes.size - analysis.entries.length,
    }),
    [analysis, graph],
  );
  return (
    <section
      {...props}
      ref={ref}
      aria-label={
        props["aria-label"] ??
        (props["aria-labelledby"] ? undefined : "Change impact explorer")
      }
      aria-busy={loading}
      data-slot="change-impact-explorer"
      className={cn(
        changeImpactExplorerVariants({ appearance, size }),
        className,
      )}
    >
      <header className={tokens.zuiChangeImpactExplorerHeader}>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-xs opacity-70">
            Explore the relationships behind a proposed change.
          </p>
        </div>
        <div className={tokens.zuiChangeImpactExplorerControls}>
          <label
            className="flex min-w-0 flex-col gap-1 text-xs"
            htmlFor={`${id}-change`}
          >
            Proposed change
            <select
              id={`${id}-change`}
              value={change?.id ?? ""}
              disabled={loading || !changes.length}
              onChange={(event) => {
                if (changeId === undefined) setLocalChange(event.target.value);
                if (selectedNodeId === undefined) setLocalSelected(undefined);
                onChangeIdChange?.(event.target.value);
              }}
              className={tokens.zuiChangeImpactExplorerControl}
            >
              <option value="" disabled>
                Select a change
              </option>
              {changes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label
            className="flex min-w-0 flex-col gap-1 text-xs"
            htmlFor={`${id}-search`}
          >
            Find an item
            <input
              id={`${id}-search`}
              type="search"
              value={actualQuery}
              disabled={loading}
              placeholder="Search name, category, priority…"
              className={tokens.zuiChangeImpactExplorerControl}
              onChange={(event) => {
                if (query === undefined) setLocalQuery(event.target.value);
                onQueryChange?.(event.target.value);
              }}
            />
          </label>
        </div>
      </header>
      {loading ? (
        <p role="status" className={tokens.zuiChangeImpactExplorerEmpty}>
          Loading impact data…
        </p>
      ) : error != null ? (
        <div role="alert" className={tokens.zuiChangeImpactExplorerEmpty}>
          {error}
        </div>
      ) : !change || !nodes.length ? (
        <div className={tokens.zuiChangeImpactExplorerEmpty}>
          {emptyContent ??
            "Add graph items and a proposed change to explore impact."}
        </div>
      ) : (
        <>
          {change.description != null && (
            <div className="px-4 pt-4 opacity-80">{change.description}</div>
          )}
          <dl
            data-slot="change-impact-explorer-summary"
            className={tokens.zuiChangeImpactExplorerSummary}
          >
            {[
              ["Changed", counts.changed],
              [
                direction === "upstream"
                  ? "Direct dependencies"
                  : "Direct impact",
                counts.direct,
              ],
              [
                direction === "upstream"
                  ? "Further upstream"
                  : "Downstream impact",
                counts.transitive,
              ],
              [
                analysis.truncated ? "Outside analysis" : "Outside traversal",
                counts.outside,
              ],
            ].map(([label, value]) => (
              <div key={label} className={tokens.zuiChangeImpactExplorerStat}>
                <dt className="text-xs opacity-70">{label}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          {(graph.danglingEdges.length > 0 ||
            analysis.ignoredNodeIds.length > 0 ||
            analysis.truncated) && (
            <p role="status" className="px-4 pb-4 text-xs opacity-80">
              {graph.danglingEdges.length > 0 &&
                `${graph.danglingEdges.length} dependencies reference missing items. `}
              {analysis.ignoredNodeIds.length > 0 &&
                `${analysis.ignoredNodeIds.length} changed items are missing. `}
              {analysis.truncated &&
                "Depth limit reached; this analysis is partial."}
            </p>
          )}
          {showMap && analysis.entries.length > 0 && (
            <ImpactMap
              analysis={analysis}
              selected={selected}
              limit={mapNodeLimit}
              choose={choose}
              renderNode={renderNode}
            />
          )}
          <div className={tokens.zuiChangeImpactExplorerBody}>
            <section
              aria-label={
                showOutsideAnalysis
                  ? "All items"
                  : direction === "upstream"
                    ? "Dependencies"
                    : "Affected items"
              }
              className={tokens.zuiChangeImpactExplorerResults}
            >
              <div className="mb-3 flex flex-wrap justify-between gap-2">
                <h3 className="font-semibold">
                  {showOutsideAnalysis
                    ? "All items"
                    : direction === "upstream"
                      ? "Dependencies"
                      : "Affected items"}
                </h3>
                <span
                  role="status"
                  aria-live="polite"
                  className="text-xs opacity-70"
                >
                  {items.length} results
                </span>
              </div>
              <p id={`${id}-help`} className="mb-3 text-xs opacity-70">
                Use Up/Down, Home/End, or type a name to select an item.
              </p>
              <ImpactResults
                key={change.id}
                items={items}
                hasSearch={Boolean(search)}
                selected={selected}
                choose={choose}
                virtualize={virtualize}
                rowHeight={positive(rowHeight, 64)}
                height={positive(listHeight, 384)}
                renderNode={renderNode}
                id={id}
              />
            </section>
            <ImpactDetails context={context} renderDetails={renderDetails} />
          </div>
        </>
      )}
    </section>
  );
}
