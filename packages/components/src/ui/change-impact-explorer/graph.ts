/** Server-safe graph helpers. This entry has no client boundary or UI runtime. */
export {
  buildChangeImpactGraph,
  analyzeChangeImpact,
  getChangeImpactPath,
} from "./impact-graph";
export type {
  ChangeImpactNode,
  ChangeImpactEdge,
  ChangeImpactDirection,
  ChangeImpactEntry,
  ChangeImpactGraph,
  ChangeImpactAnalysis,
  ChangeImpactPathStep,
} from "./types";
