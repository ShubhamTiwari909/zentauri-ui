import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { timeTravelInspectorVariants } from "./variants";

/** JSON-compatible state. Arrays are replaced atomically by incremental changes. */
export type TimeTravelValue =
  | null
  | boolean
  | number
  | string
  | readonly TimeTravelValue[]
  | { readonly [key: string]: TimeTravelValue };

/** Object-key segments, not dot notation. An empty path replaces the root. */
export type TimeTravelPatch =
  | { op: "set"; path: readonly string[]; value: TimeTravelValue }
  | { op: "remove"; path: readonly string[] };

export type TimeTravelEvent = {
  /** Unique, stable event identifier. */
  id: string;
  /** Finite timestamp in milliseconds, in nondecreasing order. Zero is valid. */
  timestamp: number;
  label: string;
};

export type TimeTravelSnapshot = TimeTravelEvent &
  (
    | { kind: "checkpoint"; state: TimeTravelValue }
    | { kind: "delta"; changes: readonly TimeTravelPatch[] }
  );

export type TimeTravelCapture = TimeTravelEvent & { state: TimeTravelValue };
export type TimeTravelChange = {
  path: readonly string[];
  type: "added" | "removed" | "changed";
  before?: TimeTravelValue;
  after?: TimeTravelValue;
};
export type TimeTravelRenderContext = {
  snapshot: TimeTravelSnapshot;
  index: number;
  state: TimeTravelValue;
  comparisonSnapshot: TimeTravelSnapshot;
  comparisonState: TimeTravelValue;
  changes: readonly TimeTravelChange[];
};

export type TimeTravelInspectorProps = VariantProps<
  typeof timeTravelInspectorVariants
> &
  Omit<ComponentPropsWithRef<"div">, "children" | "onChange"> & {
    /** Immutable history beginning with a checkpoint. Use createTimeTravelHistory to compact captures. */
    snapshots: readonly TimeTravelSnapshot[];
    /** Controlled selected event. Missing IDs fall back to the latest event. */
    selectedId?: string;
    /** Initially selected event; defaults to the latest. */
    defaultSelectedId?: string;
    onSelectedIdChange?: (id: string) => void;
    /** Comparison baseline. Null automatically compares with the preceding event. */
    comparisonId?: string | null;
    defaultComparisonId?: string | null;
    onComparisonIdChange?: (id: string | null) => void;
    /** Controlled bookmark IDs. IDs absent from history are ignored. */
    bookmarks?: readonly string[];
    defaultBookmarks?: readonly string[];
    onBookmarksChange?: (ids: string[]) => void;
    /** Render a historical application view. Treat state and context as immutable. */
    renderPreview?: (context: TimeTravelRenderContext) => ReactNode;
    /** Optional action for opening the selected historical state. */
    onOpenState?: (context: TimeTravelRenderContext) => void;
    formatTimestamp?: (timestamp: number) => string;
    emptyState?: ReactNode;
  };
