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

/** Object-key segments, not dot notation. Only set accepts an empty root path. */
export type TimeTravelPatch =
  | {
      readonly op: "set";
      readonly path: readonly string[];
      readonly value: TimeTravelValue;
    }
  | { readonly op: "remove"; readonly path: readonly [string, ...string[]] };

export type TimeTravelEvent = {
  /** Unique, stable event identifier. */
  readonly id: string;
  /** Finite timestamp in milliseconds, in nondecreasing order. Zero is valid. */
  readonly timestamp: number;
  readonly label: string;
};

export type TimeTravelSnapshot = TimeTravelEvent &
  (
    | { readonly kind: "checkpoint"; readonly state: TimeTravelValue }
    | { readonly kind: "delta"; readonly changes: readonly TimeTravelPatch[] }
  );

export type TimeTravelCapture = TimeTravelEvent & {
  readonly state: TimeTravelValue;
};
export type TimeTravelChange =
  | {
      readonly path: readonly string[];
      readonly type: "added";
      readonly after: TimeTravelValue;
    }
  | {
      readonly path: readonly [string, ...string[]];
      readonly type: "removed";
      readonly before: TimeTravelValue;
    }
  | {
      readonly path: readonly string[];
      readonly type: "changed";
      readonly before: TimeTravelValue;
      readonly after: TimeTravelValue;
    };
export type TimeTravelRenderContext = {
  readonly snapshot: TimeTravelSnapshot;
  readonly index: number;
  readonly state: TimeTravelValue;
  readonly comparisonSnapshot: TimeTravelSnapshot;
  readonly comparisonState: TimeTravelValue;
  readonly changes: readonly TimeTravelChange[];
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
