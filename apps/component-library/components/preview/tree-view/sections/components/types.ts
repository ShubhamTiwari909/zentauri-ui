import type { TreeViewProps } from "@zentauri-ui/zentauri-components/ui/tree-view";
import type { TreeViewTransition } from "@zentauri-ui/zentauri-components/ui/tree-view/animated";

export type TreeViewDemoProps = Pick<
  TreeViewProps,
  "appearance" | "size" | "showGuides"
> & {
  animated?: boolean;
  transition?: TreeViewTransition;
};
