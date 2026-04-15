import type { HTMLMotionProps } from "framer-motion";

import type { TableAnimation } from "./types";

type TablePresetMotionProps = Pick<HTMLMotionProps<"tr">, "whileHover" | "transition">;

export type TableAnimationPresets = Record<TableAnimation, TablePresetMotionProps>;

export const tableAnimationPresets: TableAnimationPresets = {
  none: {},
  hover: {
    whileHover: { backgroundColor: "rgba(255,255,255,0.05)" },
    transition: { duration: 0.15 },
  },
};
