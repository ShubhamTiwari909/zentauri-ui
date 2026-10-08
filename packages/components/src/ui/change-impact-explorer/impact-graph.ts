import type {
  ChangeImpactNode,
  ChangeImpactEdge,
  ChangeImpactGraph,
  ChangeImpactAnalysis,
  ChangeImpactDirection,
  ChangeImpactEntry,
  ChangeImpactPathStep,
} from "./types";
/** Index once per graph revision. IDs must be nonempty and unique. */
export function buildChangeImpactGraph(
  nodes: readonly ChangeImpactNode[],
  edges: readonly ChangeImpactEdge[],
): ChangeImpactGraph {
  const byId = new Map<string, ChangeImpactNode>();
  for (const node of nodes) {
    if (!node.id || byId.has(node.id))
      throw new Error(
        `Change Impact Explorer: duplicate or empty node ID "${node.id}".`,
      );
    byId.set(node.id, node);
  }
  const outgoing = new Map<string, ChangeImpactEdge[]>();
  const incoming = new Map<string, ChangeImpactEdge[]>();
  const ids = new Set<string>();
  const danglingEdges: ChangeImpactEdge[] = [];
  for (const edge of edges) {
    if (!edge.id || ids.has(edge.id))
      throw new Error(
        `Change Impact Explorer: duplicate or empty edge ID "${edge.id}".`,
      );
    ids.add(edge.id);
    if (!byId.has(edge.source) || !byId.has(edge.target)) {
      danglingEdges.push(edge);
      continue;
    }
    const out = outgoing.get(edge.source) ?? [];
    out.push(edge);
    outgoing.set(edge.source, out);
    const into = incoming.get(edge.target) ?? [];
    into.push(edge);
    incoming.set(edge.target, into);
  }
  return { nodes: byId, outgoing, incoming, danglingEdges };
}
/** O(V + E) multi-source BFS. Cycles are safe; one shortest explanation path is retained. */
export function analyzeChangeImpact(
  graph: ChangeImpactGraph,
  changedNodeIds: readonly string[],
  options: { direction?: ChangeImpactDirection; maxDepth?: number } = {},
): ChangeImpactAnalysis {
  const limit =
    options.maxDepth == null || options.maxDepth === Infinity
      ? Infinity
      : Number.isFinite(options.maxDepth)
        ? Math.max(0, Math.floor(options.maxDepth))
        : 0;
  const entries: ChangeImpactEntry[] = [];
  const byId = new Map<string, ChangeImpactEntry>();
  const parents = new Map<string, { nodeId: string; edge: ChangeImpactEdge }>();
  const ignoredNodeIds = [
    ...new Set(changedNodeIds.filter((id) => !graph.nodes.has(id))),
  ];
  for (const id of changedNodeIds) {
    const node = graph.nodes.get(id);
    if (node && !byId.has(id)) {
      const entry: ChangeImpactEntry = { node, depth: 0, kind: "changed" };
      byId.set(id, entry);
      entries.push(entry);
    }
  }
  const adjacency =
    options.direction === "upstream" ? graph.incoming : graph.outgoing;
  let truncated = false;
  for (let cursor = 0; cursor < entries.length; cursor++) {
    const entry = entries[cursor]!;
    for (const edge of adjacency.get(entry.node.id) ?? []) {
      const id = options.direction === "upstream" ? edge.source : edge.target;
      if (byId.has(id)) continue;
      if (entry.depth! >= limit) {
        truncated = true;
        continue;
      }
      const depth = entry.depth! + 1;
      const next: ChangeImpactEntry = {
        node: graph.nodes.get(id)!,
        depth,
        kind: depth === 1 ? "direct" : "transitive",
      };
      parents.set(id, { nodeId: entry.node.id, edge });
      byId.set(id, next);
      entries.push(next);
    }
  }
  // A later source can reach a boundary neighbor without exceeding the limit.
  if (truncated)
    truncated = entries.some(
      (entry) =>
        entry.depth === limit &&
        (adjacency.get(entry.node.id) ?? []).some(
          (edge) =>
            !byId.has(
              options.direction === "upstream" ? edge.source : edge.target,
            ),
        ),
    );
  return { graph, entries, byId, parents, ignoredNodeIds, truncated };
}
/** Materialize a path only for the selected node, avoiding a path array per graph node. */
export function getChangeImpactPath(
  analysis: ChangeImpactAnalysis,
  nodeId: string,
): ChangeImpactPathStep[] {
  if (!analysis.byId.has(nodeId)) return [];
  const steps: ChangeImpactPathStep[] = [];
  let current: string | undefined = nodeId;
  while (current !== undefined) {
    const parent = analysis.parents.get(current);
    steps.push({ node: analysis.graph.nodes.get(current)!, via: parent?.edge });
    current = parent?.nodeId;
  }
  return steps.reverse();
}
