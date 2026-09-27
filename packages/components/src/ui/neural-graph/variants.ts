import { cva } from "class-variance-authority";
import { zuiNeuralGraphAppearances, zuiNeuralGraphBase, zuiNeuralGraphSizes } from "../../design-system/neural-graph";

export const neuralGraphVariants = cva(zuiNeuralGraphBase, {
  variants: { appearance: zuiNeuralGraphAppearances, size: zuiNeuralGraphSizes },
  defaultVariants: { appearance: "default", size: "md" },
});
