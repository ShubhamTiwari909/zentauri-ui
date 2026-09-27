import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { neuralGraphVariants } from "./variants";

export type NeuralPosition = readonly [number, number, number];
export type NeuralNodeData = {
  id: string;
  position: NeuralPosition;
  label?: string;
  cluster?: string;
  radius?: number;
};
export type NeuralEdgeData = { from: string; to: string; animated?: boolean };
export type NeuralClusterData = { id: string; label?: string };
export type ZuiNodeProps = NeuralNodeData;
export type ZuiEdgeProps = NeuralEdgeData;
export type ZuiClusterProps = NeuralClusterData & { children?: ReactNode };
export type NeuralGraphVariantProps = VariantProps<typeof neuralGraphVariants>;
export type NeuralGraphProps = NeuralGraphVariantProps & Omit<ComponentPropsWithRef<"div">, "children" | "onSelect"> & {
  children?: ReactNode;
  /** Data form avoids creating thousands of React elements. */
  nodes?: readonly NeuralNodeData[];
  edges?: readonly NeuralEdgeData[];
  clusters?: readonly NeuralClusterData[];
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onSelectionChange?: (id: string | null) => void;
  onNodeHover?: (id: string | null) => void;
  animate?: boolean;
  showLabels?: boolean;
  interactive?: boolean;
  showControls?: boolean;
  showStatus?: boolean;
  /** Canvas pixels are capped at 2× device pixel ratio. */
  pixelRatio?: number;
};
