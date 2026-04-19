import type { DividerBaseProps } from "../types";

export type DividerAnimation = "none" | "expand" | "fade";

/** Motion `div` uses different handler types than React DOM drag/drop events. */
export type DividerDomDragProps =
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

export type DividerAnimatedProps = Omit<DividerBaseProps, "as" | DividerDomDragProps> & {
  animation?: DividerAnimation;
};

