"use client";
import { useState } from "react";
import { ChangeImpactExplorer } from "@zentauri-ui/zentauri-components/ui/change-impact-explorer";
import {
  IMPACT_NODES,
  IMPACT_EDGES,
  IMPACT_CHANGES,
  LARGE_NODES,
  LARGE_EDGES,
  LARGE_CHANGES,
  type ImpactOptions,
} from "./change-impact-explorer-code-examples.data";
export function ImpactBasicDemo() {
  return (
    <ChangeImpactExplorer
      nodes={IMPACT_NODES}
      edges={IMPACT_EDGES}
      changes={IMPACT_CHANGES}
      defaultSelectedNodeId="dashboard"
    />
  );
}
export function ImpactControlledDemo() {
  const [selected, setSelected] = useState("sdk");
  const [change, setChange] = useState("rename");
  return (
    <div className="space-y-3">
      <ChangeImpactExplorer
        nodes={IMPACT_NODES}
        edges={IMPACT_EDGES}
        changes={IMPACT_CHANGES}
        changeId={change}
        onChangeIdChange={(id) => {
          setChange(id);
          setSelected(
            IMPACT_CHANGES.find((change) => change.id === id)?.nodeIds[0] ??
              "schema",
          );
        }}
        selectedNodeId={selected}
        onSelectedNodeIdChange={setSelected}
        appearance="blue"
      />
      <p role="status" className="text-sm">
        Selected item: {selected} · Proposal: {change}
      </p>
    </div>
  );
}
export function ImpactUpstreamDemo() {
  return (
    <ChangeImpactExplorer
      nodes={IMPACT_NODES}
      edges={IMPACT_EDGES}
      changes={[
        {
          id: "upstream",
          label: "Inspect dashboard dependencies",
          nodeIds: ["dashboard"],
        },
      ]}
      direction="upstream"
      defaultSelectedNodeId="schema"
      renderDetails={(context) => (
        <div className="space-y-3">
          <h3 className="font-semibold">{context.node.label}</h3>
          <p>Owner-provided review content can appear here.</p>
          <p>
            {context.path.length} steps connect this item to the selected
            change.
          </p>
        </div>
      )}
    />
  );
}
export function ImpactLargeDemo() {
  return (
    <ChangeImpactExplorer
      nodes={LARGE_NODES}
      edges={LARGE_EDGES}
      changes={LARGE_CHANGES}
      appearance="subtle"
      mapNodeLimit={12}
    />
  );
}
export function ImpactPlaygroundDemo({ options }: { options: ImpactOptions }) {
  const large = options.dataset === "10000";
  return (
    <ChangeImpactExplorer
      nodes={
        options.state === "empty" ? [] : large ? LARGE_NODES : IMPACT_NODES
      }
      edges={large ? LARGE_EDGES : IMPACT_EDGES}
      changes={large ? LARGE_CHANGES : IMPACT_CHANGES}
      appearance={options.appearance}
      size={options.size}
      direction={options.direction}
      showMap={options.showMap}
      showOutsideAnalysis={options.showOutsideAnalysis}
      virtualize={options.virtualize}
      maxDepth={options.depth === "all" ? undefined : Number(options.depth)}
      loading={options.state === "loading"}
      error={
        options.state === "error"
          ? "Impact data could not be loaded. Try again with a fresh graph."
          : undefined
      }
      dir={options.dir}
    />
  );
}
