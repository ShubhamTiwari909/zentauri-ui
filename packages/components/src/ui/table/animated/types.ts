import type { TableAnimation, TableProps } from "../types";
import type { HTMLMotionProps } from "framer-motion";

export type TableAnimatedProps = TableProps & {
  rowAnimation?: TableAnimation;
};

export type TableRowPresetMotionProps = Pick<
  HTMLMotionProps<"tr">,
  "initial" | "animate" | "whileHover" | "transition"
>;

export type TableRowAnimationPresets = Record<
  TableAnimation,
  TableRowPresetMotionProps
>;
