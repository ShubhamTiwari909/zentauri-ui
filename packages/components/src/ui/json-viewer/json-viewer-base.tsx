"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/utils";

import type {
  JsonValueKind,
  JsonViewerBaseProps,
  JsonViewerLabels,
} from "./types";
import {
  jsonViewerActionVariants,
  jsonViewerToolbarVariants,
  jsonViewerValueVariants,
  jsonViewerVariants,
  zuiJsonViewerGuide,
  zuiJsonViewerKey,
  zuiJsonViewerPreview,
  zuiJsonViewerPunctuation,
  zuiJsonViewerToggleBase,
  zuiJsonViewerTreeBase,
} from "./variants";

const DEFAULT_LABELS: Required<JsonViewerLabels> = {
  expandAll: "Expand all",
  collapseAll: "Collapse all",
  copy: "Copy",
  copied: "Copied",
};

/** Classify a value into a coarse JSON kind used for color and rendering. */
export function jsonValueKind(value: unknown): JsonValueKind {
  if (value === null || value === undefined) return "null";
  if (Array.isArray(value)) return "array";
  const type = typeof value;
  if (type === "object") return "object";
  if (type === "number" || type === "bigint") return "number";
  if (type === "boolean") return "boolean";
  return "string";
}

export function isJsonContainer(value: unknown): boolean {
  const kind = jsonValueKind(value);
  return kind === "object" || kind === "array";
}

/** Format a primitive value for display. Strings are JSON-escaped when quoted. */
export function formatJsonPrimitive(
  value: unknown,
  quoteStrings = true,
): string {
  const kind = jsonValueKind(value);
  if (kind === "null") return "null";
  if (kind === "string") {
    return quoteStrings ? JSON.stringify(String(value)) : String(value);
  }
  return String(value);
}

/** Number of direct entries in a container. */
export function jsonChildCount(value: unknown): number {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return 0;
}

/** Short collapsed summary, e.g. `{ … } 3 keys` or `[ … ] 2 items`. */
export function jsonContainerSummary(value: unknown): string {
  const count = jsonChildCount(value);
  if (Array.isArray(value)) {
    return `${count} ${count === 1 ? "item" : "items"}`;
  }
  return `${count} ${count === 1 ? "key" : "keys"}`;
}

type PathDepth = { path: string; depth: number };

/** Walk every expandable container path with its depth, for expansion seeding. */
export function collectExpandablePaths(
  value: unknown,
  path = "$",
  depth = 0,
  acc: PathDepth[] = [],
  ancestors = new Set<unknown>(),
): PathDepth[] {
  if (!isJsonContainer(value)) return acc;
  if (ancestors.has(value)) return acc;
  ancestors.add(value);
  acc.push({ path, depth });
  const entries = jsonEntries(value);
  for (const [key, child] of entries) {
    collectExpandablePaths(
      child,
      `${path}/${encodeURIComponent(key)}`,
      depth + 1,
      acc,
      ancestors,
    );
  }
  ancestors.delete(value);
  return acc;
}

/** Normalize a container into `[key, value]` entries (index strings for arrays). */
export function jsonEntries(value: unknown): [string, unknown][] {
  if (Array.isArray(value)) {
    return value.map((item, index) => [String(index), item]);
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>);
  }
  return [];
}

/**
 * Manage which container paths are collapsed. Seeds from `defaultExpandedDepth`
 * and resets when the data or depth changes. Returns helpers shared by the
 * static and animated viewers.
 */
export function useJsonExpansion(data: unknown, defaultExpandedDepth: number) {
  const paths = useMemo(() => collectExpandablePaths(data), [data]);

  const effectiveDepth = defaultExpandedDepth <= 0 ? 1 : defaultExpandedDepth;

  const seed = useMemo(() => {
    const collapsed = new Set<string>();
    for (const { path, depth } of paths) {
      if (depth >= effectiveDepth) collapsed.add(path);
    }
    return collapsed;
  }, [paths, effectiveDepth]);

  const [collapsed, setCollapsed] = useState<Set<string>>(seed);
  const [prevSeed, setPrevSeed] = useState(seed);
  if (seed !== prevSeed) {
    setCollapsed(seed);
    setPrevSeed(seed);
  }

  const isOpen = useCallback(
    (path: string) => !collapsed.has(path),
    [collapsed],
  );
  const toggle = useCallback((path: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);
  const expandAll = useCallback(() => setCollapsed(new Set()), []);
  const collapseAll = useCallback(() => {
    // Collapse every container except the root so something stays visible.
    setCollapsed(new Set(paths.filter((p) => p.depth > 0).map((p) => p.path)));
  }, [paths]);

  return { isOpen, toggle, expandAll, collapseAll };
}

type Expansion = ReturnType<typeof useJsonExpansion>;

type JsonNodeProps = {
  name?: string;
  value: unknown;
  path: string;
  isRoot: boolean;
  isLast: boolean;
  isArrayItem: boolean;
  expansion: Expansion;
  quoteStrings: boolean;
  showItemCount: boolean;
  ancestors?: Set<unknown>;
};

function NodeKey({
  name,
  isArrayItem,
}: {
  name?: string;
  isArrayItem: boolean;
}) {
  if (name === undefined) return null;
  return (
    <>
      <span data-slot="json-viewer-key" className={zuiJsonViewerKey}>
        {isArrayItem ? name : JSON.stringify(name)}
      </span>
      <span className={zuiJsonViewerPunctuation}>:&nbsp;</span>
    </>
  );
}

/** A primitive (leaf) row: optional key, the colored value, and a trailing comma. */
function PrimitiveNode({
  name,
  value,
  isArrayItem,
  isLast,
  quoteStrings,
}: Pick<
  JsonNodeProps,
  "name" | "value" | "isArrayItem" | "isLast" | "quoteStrings"
>) {
  const kind = jsonValueKind(value);
  const valueKind = kind === "null" ? "null" : kind;
  return (
    <div
      data-slot="json-viewer-node"
      className="whitespace-pre-wrap break-words"
    >
      <NodeKey name={name} isArrayItem={isArrayItem} />
      <span
        data-slot="json-viewer-value"
        data-kind={kind}
        className={jsonViewerValueVariants({
          kind: valueKind as "string" | "number" | "boolean" | "null",
        })}
      >
        {formatJsonPrimitive(value, quoteStrings)}
      </span>
      {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
    </div>
  );
}

function ContainerNode(props: JsonNodeProps) {
  const {
    name,
    value,
    path,
    isLast,
    isArrayItem,
    expansion,
    quoteStrings,
    showItemCount,
    ancestors = new Set<unknown>(),
  } = props;

  if (ancestors.has(value)) {
    return (
      <div
        data-slot="json-viewer-node"
        className="whitespace-pre-wrap break-words"
      >
        <NodeKey name={name} isArrayItem={isArrayItem} />
        <span className={zuiJsonViewerPreview}>[Circular]</span>
        {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
      </div>
    );
  }

  const open = expansion.isOpen(path);
  const entries = jsonEntries(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];

  const nextAncestors = new Set(ancestors).add(value);

  return (
    <div data-slot="json-viewer-node">
      <div className="flex items-start">
        <button
          type="button"
          data-slot="json-viewer-toggle"
          aria-expanded={open}
          aria-label={
            name
              ? `${open ? "Collapse" : "Expand"} ${name}`
              : open
                ? "Collapse"
                : "Expand"
          }
          className={zuiJsonViewerToggleBase}
          onClick={() => expansion.toggle(path)}
        >
          <span
            aria-hidden="true"
            className={cn("transition-transform", open && "rotate-90")}
          >
            ▸
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <span className="whitespace-pre-wrap break-words">
            <NodeKey name={name} isArrayItem={isArrayItem} />
            <span className={zuiJsonViewerPunctuation}>{openBracket}</span>
            {!open && (
              <>
                <span className={zuiJsonViewerPreview}> … </span>
                <span className={zuiJsonViewerPunctuation}>{closeBracket}</span>
                {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
                {showItemCount && (
                  <span
                    data-slot="json-viewer-count"
                    className={zuiJsonViewerPreview}
                  >
                    {"  "}
                    {jsonContainerSummary(value)}
                  </span>
                )}
              </>
            )}
          </span>
          {open && (
            <>
              <div className={cn("ml-1.5 pl-3", zuiJsonViewerGuide)}>
                {entries.map(([key, child], index) => (
                  <JsonNode
                    key={key}
                    name={key}
                    value={child}
                    path={`${path}/${encodeURIComponent(key)}`}
                    isRoot={false}
                    isLast={index === entries.length - 1}
                    isArrayItem={Array.isArray(value)}
                    expansion={expansion}
                    quoteStrings={quoteStrings}
                    showItemCount={showItemCount}
                    ancestors={nextAncestors}
                  />
                ))}
              </div>
              <span className="whitespace-pre-wrap">
                <span className={zuiJsonViewerPunctuation}>{closeBracket}</span>
                {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function JsonNode(props: JsonNodeProps) {
  return isJsonContainer(props.value) ? (
    <ContainerNode {...props} />
  ) : (
    <PrimitiveNode
      name={props.name}
      value={props.value}
      isArrayItem={props.isArrayItem}
      isLast={props.isLast}
      quoteStrings={props.quoteStrings}
    />
  );
}

export function JsonViewerToolbar({
  labels,
  enableClipboard,
  onExpandAll,
  onCollapseAll,
  getCopyText,
}: {
  labels: Required<JsonViewerLabels>;
  enableClipboard: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  getCopyText: () => string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCopyText());
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      data-slot="json-viewer-toolbar"
      className={jsonViewerToolbarVariants()}
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          data-slot="json-viewer-expand-all"
          className={jsonViewerActionVariants()}
          onClick={onExpandAll}
        >
          {labels.expandAll}
        </button>
        <button
          type="button"
          data-slot="json-viewer-collapse-all"
          className={jsonViewerActionVariants()}
          onClick={onCollapseAll}
        >
          {labels.collapseAll}
        </button>
      </div>
      {enableClipboard && (
        <button
          type="button"
          data-slot="json-viewer-copy"
          className={jsonViewerActionVariants()}
          onClick={handleCopy}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      )}
    </div>
  );
}

export function JsonViewerBase({
  data,
  appearance,
  size,
  defaultExpandedDepth = Number.POSITIVE_INFINITY,
  showToolbar = true,
  enableClipboard = true,
  showItemCount = true,
  quoteStrings = true,
  labels,
  className,
  ref,
  ...rest
}: JsonViewerBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const expansion = useJsonExpansion(data, defaultExpandedDepth);
  const getCopyText = useCallback(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }, [data]);

  return (
    <div
      ref={ref}
      data-slot="json-viewer"
      className={cn(jsonViewerVariants({ appearance, size }), className)}
      {...rest}
    >
      {showToolbar && (
        <JsonViewerToolbar
          labels={mergedLabels}
          enableClipboard={enableClipboard}
          onExpandAll={expansion.expandAll}
          onCollapseAll={expansion.collapseAll}
          getCopyText={getCopyText}
        />
      )}
      <div data-slot="json-viewer-tree" className={zuiJsonViewerTreeBase}>
        <JsonNode
          value={data}
          path="$"
          isRoot
          isLast
          isArrayItem={false}
          expansion={expansion}
          quoteStrings={quoteStrings}
          showItemCount={showItemCount}
        />
      </div>
    </div>
  );
}

JsonViewerBase.displayName = "JsonViewer";
