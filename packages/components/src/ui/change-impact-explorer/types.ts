import type { ComponentPropsWithRef, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { changeImpactExplorerVariants } from "./variants";
export type ChangeImpactNode = {
  id: string;
  label: string;
  category?: string;
  description?: ReactNode;
  /** Application-provided priority, not inferred by graph traversal. */
  priority?: "low" | "medium" | "high";
  metadata?: ReactNode;
};
/** source -> target: changes to source can affect target. */
export type ChangeImpactEdge = {
  id: string;
  source: string;
  target: string;
  reason?: ReactNode;
};
export type ChangeImpactComparison = {
  nodeId: string;
  label?: string;
  before?: ReactNode;
  after?: ReactNode;
};
export type ChangeImpactChange = {
  id: string;
  label: string;
  description?: ReactNode;
  nodeIds: readonly string[];
  comparisons?: readonly ChangeImpactComparison[];
};
export type ChangeImpactDirection = "downstream" | "upstream";
export type ChangeImpactEntry = {
  node: ChangeImpactNode;
  depth: number | null;
  kind: "changed" | "direct" | "transitive" | "outside";
};
export type ChangeImpactGraph = {
  nodes: ReadonlyMap<string, ChangeImpactNode>;
  outgoing: ReadonlyMap<string, readonly ChangeImpactEdge[]>;
  incoming: ReadonlyMap<string, readonly ChangeImpactEdge[]>;
  /** Edges referencing missing nodes are excluded from adjacency. */
  danglingEdges: readonly ChangeImpactEdge[];
};
export type ChangeImpactAnalysis = {
  graph: ChangeImpactGraph;
  entries: readonly ChangeImpactEntry[];
  byId: ReadonlyMap<string, ChangeImpactEntry>;
  parents: ReadonlyMap<string, { nodeId: string; edge: ChangeImpactEdge }>;
  ignoredNodeIds: readonly string[];
  /** Reachable nodes beyond maxDepth exist; the displayed analysis is partial. */
  truncated: boolean;
};
export type ChangeImpactPathStep = {
  node: ChangeImpactNode;
  via?: ChangeImpactEdge;
};
export type ChangeImpactDetailsContext = {
  node: ChangeImpactNode;
  entry?: ChangeImpactEntry;
  change?: ChangeImpactChange;
  path: readonly ChangeImpactPathStep[];
  comparisons: readonly ChangeImpactComparison[];
};
export type ChangeImpactExplorerProps = Omit<
  ComponentPropsWithRef<"section">,
  "onChange" | "children" | "title"
> &
  VariantProps<typeof changeImpactExplorerVariants> & {
    nodes: readonly ChangeImpactNode[];
    edges: readonly ChangeImpactEdge[];
    changes: readonly ChangeImpactChange[];
    /** @default Change impact explorer */
    title?: ReactNode;
    changeId?: string;
    defaultChangeId?: string;
    onChangeIdChange?: (id: string) => void;
    selectedNodeId?: string;
    defaultSelectedNodeId?: string;
    onSelectedNodeIdChange?: (id: string, node: ChangeImpactNode) => void;
    query?: string;
    defaultQuery?: string;
    onQueryChange?: (query: string) => void;
    /** @default downstream */
    direction?: ChangeImpactDirection;
    /** Maximum traversal hops; omitted means unlimited. Zero shows changed nodes only. */
    maxDepth?: number;
    /** Include nodes outside this traversal in the results. @default false */
    showOutsideAnalysis?: boolean;
    /** Render the bounded dependency map above the results. @default true */
    showMap?: boolean;
    /** Maximum nodes mounted in the map. @default 24 */
    mapNodeLimit?: number;
    /** Window result rows when the list has more than 100 items. @default true */
    virtualize?: boolean;
    /** Fixed row height in pixels; custom node content must fit this height. @default 64 */
    rowHeight?: number;
    /** Result viewport height in pixels. @default 384 */
    listHeight?: number;
    /** @default false */
    loading?: boolean;
    error?: ReactNode;
    emptyContent?: ReactNode;
    /** Noninteractive node content for map cards and listbox options. */
    renderNode?: (entry: ChangeImpactEntry) => ReactNode;
    renderDetails?: (context: ChangeImpactDetailsContext) => ReactNode;
  };
