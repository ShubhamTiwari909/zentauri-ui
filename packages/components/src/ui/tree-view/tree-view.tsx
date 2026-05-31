// tree-view.tsx — default static entry (no framer-motion on expand/collapse)
import { TreeViewBase } from "./tree-view-base";
import type { TreeViewProps } from "./types";

export function TreeView(props: TreeViewProps) {
  return <TreeViewBase {...props} />;
}

TreeView.displayName = "TreeView";
