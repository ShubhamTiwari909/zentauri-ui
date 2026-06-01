import type { TreeViewProps } from "@zentauri-ui/zentauri-components/ui/tree-view";
import type { TreeViewTransition } from "@zentauri-ui/zentauri-components/ui/tree-view/animated";

export const TREE_VIEW_APPEARANCES = [
  "default",
  "outline",
  "ghost",
  "card",
  "separated",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<TreeViewProps["appearance"]>[];

export const TREE_VIEW_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TreeViewProps["size"]>[];

export const TREE_VIEW_TRANSITIONS = [
  "none",
  "default",
  "smooth",
  "slow",
] as const satisfies readonly TreeViewTransition[];
