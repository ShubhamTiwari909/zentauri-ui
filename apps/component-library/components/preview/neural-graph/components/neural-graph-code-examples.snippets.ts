import type { NeuralGraphProps } from "@zentauri-ui/zentauri-components/ui/neural-graph";

export function neuralGraphSnippet(
  appearance: NonNullable<NeuralGraphProps["appearance"]>,
  animate: boolean,
  showLabels: boolean,
): string {
  return `import { ZuiNeuralGraph, ZuiNode, ZuiEdge, ZuiCluster } from "@zentauri-ui/zentauri-components/ui/neural-graph";

<ZuiNeuralGraph appearance="${appearance}" animate={${animate}} showLabels={${showLabels}}>
  <ZuiCluster id="input" label="Inputs">
    <ZuiNode id="signals" label="Signals" position={[-3, 1, 0]} />
    <ZuiNode id="context" label="Context" position={[-3, -1, 1]} />
  </ZuiCluster>
  <ZuiNode id="model" label="Model" position={[0, 0, 0]} />
  <ZuiNode id="output" label="Output" position={[3, 0, 0]} />
  <ZuiEdge from="signals" to="model" animated />
  <ZuiEdge from="context" to="model" animated />
  <ZuiEdge from="model" to="output" animated />
</ZuiNeuralGraph>`;
}
