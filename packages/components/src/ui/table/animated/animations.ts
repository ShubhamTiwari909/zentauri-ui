import type { TableRowAnimationPresets } from "./types";

export const tableAnimationPresets: TableRowAnimationPresets = {
  none: {},
  hover: {
    whileHover: { backgroundColor: "rgba(255,255,255,0.05)" },
    transition: { duration: 0.15 },
  },
};
