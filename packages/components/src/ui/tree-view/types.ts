import type { VariantProps } from "class-variance-authority";
import type { ComponentType, ReactNode } from "react";

import type { treeViewVariants } from "./variants";

export type TreeViewVariantProps = VariantProps<typeof treeViewVariants>;

export type TreeNode = {
  /** Stable, unique identifier used for expansion and selection state. */
  id: string;
  label: ReactNode;
  /** Optional leading icon rendered before the label. */
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
};

export type TreeViewRenderArgs = {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  isSelected: boolean;
};

export type TreeViewBaseProps = TreeViewVariantProps & {
  data: TreeNode[];
  /** Uncontrolled set of expanded node ids. */
  defaultExpanded?: string[];
  /** Controlled set of expanded node ids. */
  expanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Uncontrolled selected node id. */
  defaultSelected?: string;
  /** Controlled selected node id. */
  selected?: string;
  onSelect?: (node: TreeNode) => void;
  /** Replace the default label rendering for each node. */
  renderNode?: (args: TreeViewRenderArgs) => ReactNode;
  /** Draw vertical indentation guide lines for nested levels. */
  showGuides?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export type TreeViewProps = TreeViewBaseProps;

export type TreeGroupProps = {
  open: boolean;
  level: number;
  children: ReactNode;
};

export type TreeViewCtx = {
  appearance: NonNullable<TreeViewBaseProps["appearance"]>;
  size: NonNullable<TreeViewBaseProps["size"]>;
  showGuides: boolean;
  GroupComponent: ComponentType<TreeGroupProps>;
  isExpanded: (id: string) => boolean;
  toggleExpanded: (id: string) => void;
  setExpanded: (id: string, open: boolean) => void;
  selectedId: string | undefined;
  activeId: string | undefined;
  selectNode: (node: TreeNode) => void;
  registerItem: (id: string, el: HTMLDivElement | null) => void;
  onItemKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  renderNode?: (args: TreeViewRenderArgs) => ReactNode;
};
