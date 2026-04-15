import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";

import type { spinnerVariants } from "./variants";

type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;

export type SpinnerProps = SpinnerVariantProps &
  Omit<HTMLMotionProps<"span">, "children"> & {
    "aria-label"?: string;
  };
