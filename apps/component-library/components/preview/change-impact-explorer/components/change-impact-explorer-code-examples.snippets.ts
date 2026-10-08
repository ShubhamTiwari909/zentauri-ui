import {
  IMPACT_NODES,
  IMPACT_EDGES,
  IMPACT_CHANGES,
  LARGE_CHANGES,
  type ImpactOptions,
} from "./change-impact-explorer-code-examples.data";
const imports = `"use client";
import { ChangeImpactExplorer, type ChangeImpactNode, type ChangeImpactEdge, type ChangeImpactChange } from "@zentauri-ui/zentauri-components/ui/change-impact-explorer";`;
const graph = `${imports}
const nodes: readonly ChangeImpactNode[] = ${JSON.stringify(IMPACT_NODES, null, 2)};
const edges: readonly ChangeImpactEdge[] = ${JSON.stringify(IMPACT_EDGES, null, 2)};
const changes: readonly ChangeImpactChange[] = ${JSON.stringify(IMPACT_CHANGES, null, 2)};`;
export const impactBasicSnippet = `${graph}
export function ImpactExample() { return <ChangeImpactExplorer nodes={nodes} edges={edges} changes={changes} defaultSelectedNodeId="dashboard" />; }`;
export const impactControlledSnippet = `${graph.replace("import { ChangeImpactExplorer", 'import { useState } from "react";\nimport { ChangeImpactExplorer')}
export function ImpactExample() {
  const [selected, setSelected] = useState("sdk");
  const [change, setChange] = useState("rename");
  function chooseChange(id: string) {
    setChange(id);
    setSelected(changes.find(change => change.id === id)?.nodeIds[0] ?? "schema");
  }
  return <div className="space-y-3">
    <ChangeImpactExplorer nodes={nodes} edges={edges} changes={changes} appearance="blue" changeId={change} onChangeIdChange={chooseChange} selectedNodeId={selected} onSelectedNodeIdChange={setSelected} />
    <p role="status">Selected item: {selected} · Proposal: {change}</p>
  </div>;
}`;
export const impactUpstreamSnippet = `${graph}
export function ImpactExample() { return <ChangeImpactExplorer nodes={nodes} edges={edges} changes={[{ id: "upstream", label: "Inspect dashboard dependencies", nodeIds: ["dashboard"] }]} direction="upstream" defaultSelectedNodeId="schema" renderDetails={({ node, path }) => <div className="space-y-3"><h3 className="font-semibold">{node.label}</h3><p>Owner-provided review content can appear here.</p><p>{path.length} steps connect this item to the selected change.</p></div>} />; }`;
const largeGraph = `${imports}
const nodes = Array.from({ length: 10000 }, (_, index) => ({ id: "item-" + index, label: "Consumer " + String(index).padStart(5, "0"), category: index === 0 ? "Contract" : "Integration" }));
const edges = nodes.slice(1).map(node => ({ id: node.id, source: "item-0", target: node.id, reason: "Consumes the shared contract" }));
const changes = ${JSON.stringify(LARGE_CHANGES, null, 2)};`;
export const impactLargeSnippet = `${largeGraph}
export function LargeImpactExample() { return <ChangeImpactExplorer nodes={nodes} edges={edges} changes={changes} appearance="subtle" mapNodeLimit={12} />; }`;
export function impactPlaygroundSnippet(options: ImpactOptions) {
  const properties = `appearance=${JSON.stringify(options.appearance)} size=${JSON.stringify(options.size)} direction=${JSON.stringify(options.direction)} showMap={${options.showMap}} showOutsideAnalysis={${options.showOutsideAnalysis}} virtualize={${options.virtualize}} maxDepth={${options.depth === "all" ? "undefined" : options.depth}} dir=${JSON.stringify(options.dir)} loading={${options.state === "loading"}} error={${options.state === "error" ? JSON.stringify("Impact data could not be loaded. Try again with a fresh graph.") : "undefined"}}`;
  const large = options.dataset === "10000";
  const empty = options.state === "empty";
  const data = empty
    ? `${imports}
const nodes: ChangeImpactNode[] = [];
const edges: ChangeImpactEdge[] = [];
const changes: ChangeImpactChange[] = [];`
    : large
      ? largeGraph
      : graph;
  return `${data}
export function ImpactPlaygroundExample() {
  return <ChangeImpactExplorer nodes={nodes} edges={edges} changes={changes} ${large ? "mapNodeLimit={12} " : ""}${properties} />;
}`;
}
