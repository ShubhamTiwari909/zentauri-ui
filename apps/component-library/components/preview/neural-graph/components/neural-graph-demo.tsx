"use client";

import { ZuiNeuralGraph } from "@zentauri-ui/zentauri-components/ui/neural-graph";
import type { NeuralGraphProps } from "@zentauri-ui/zentauri-components/ui/neural-graph";
import {
  neuralGraphClusters,
  neuralGraphEdges,
  neuralGraphNodes,
} from "./neural-graph-code-examples.data";

export function NeuralGraphDemo(
  props: Pick<
    NeuralGraphProps,
    | "appearance"
    | "animate"
    | "showLabels"
    | "size"
    | "interactive"
    | "showControls"
    | "showStatus"
    | "className"
  >,
) {
  return (
    <ZuiNeuralGraph
      aria-label="AI model dependency graph"
      nodes={neuralGraphNodes}
      edges={neuralGraphEdges}
      clusters={neuralGraphClusters}
      {...props}
    />
  );
}
