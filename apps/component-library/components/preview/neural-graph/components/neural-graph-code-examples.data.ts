import type {
  NeuralClusterData,
  NeuralEdgeData,
  NeuralNodeData,
  NeuralGraphProps,
} from "@zentauri-ui/zentauri-components/ui/neural-graph";

export const neuralGraphAppearances = [
  "default",
  "primary",
  "secondary",
  "success",
  "destructive",
  "warning",
  "info",
  "blue",
  "cyan",
  "emerald",
  "violet",
  "rose",
  "amber",
  "slate",
  "gradient-blue",
  "gradient-emerald",
  "gradient-rose",
  "glass",
] as const satisfies readonly NonNullable<NeuralGraphProps["appearance"]>[];

export const neuralGraphNodes: NeuralNodeData[] = [
  {
    id: "input-1",
    label: "Signals",
    position: [-3.5, 1.5, -1],
    cluster: "input",
  },
  {
    id: "input-2",
    label: "Context",
    position: [-3.5, -1.5, 1],
    cluster: "input",
  },
  {
    id: "hidden-1",
    label: "Encode",
    position: [-1, 1.8, 0.8],
    cluster: "model",
  },
  {
    id: "hidden-2",
    label: "Attend",
    position: [0, -1.6, -0.9],
    cluster: "model",
  },
  {
    id: "hidden-3",
    label: "Reason",
    position: [1.5, 1.4, 1.2],
    cluster: "model",
  },
  { id: "output", label: "Output", position: [3.7, 0, 0], radius: 0.19 },
];

export const neuralGraphEdges: NeuralEdgeData[] = [
  { from: "input-1", to: "hidden-1", animated: true },
  { from: "input-1", to: "hidden-2", animated: true },
  { from: "input-2", to: "hidden-1", animated: true },
  { from: "input-2", to: "hidden-2", animated: true },
  { from: "hidden-1", to: "hidden-3", animated: true },
  { from: "hidden-2", to: "hidden-3", animated: true },
  { from: "hidden-3", to: "output", animated: true },
];

export const neuralGraphClusters: NeuralClusterData[] = [
  { id: "input", label: "Inputs" },
  { id: "model", label: "Model" },
];
