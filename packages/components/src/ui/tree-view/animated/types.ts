import type { TreeViewBaseProps } from "../types";
import type { TreeViewTransition } from "./animations";

export type TreeViewAnimatedProps = TreeViewBaseProps & {
  transitionVariant?: TreeViewTransition;
};
