import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { dividerVariants } from "./variants";

export type DividerAnimation = "none" | "expand" | "fade";

type DividerVariantProps = VariantProps<typeof dividerVariants>;

export type DividerProps = DividerVariantProps &
  Omit<HTMLMotionProps<"div">, "children"> & {
    animation?: DividerAnimation;
    /** Optional label between divider lines. */
    label?: ReactNode;
    children?: ReactNode;
  };
