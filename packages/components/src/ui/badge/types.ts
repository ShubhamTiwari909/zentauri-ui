import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

import type { badgeVariants } from "./variants";

export type BadgeAnimation = "none" | "pop" | "bounce" | "fade";

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export type BadgeProps = BadgeVariantProps &
  Omit<HTMLMotionProps<"span">, "children"> & {
    animation?: BadgeAnimation;
    closable?: boolean;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    closeLabel?: string;
    children?: ReactNode;
    /** Dot shape hides text; set for accessibility. */
    "aria-label"?: string;
  };
