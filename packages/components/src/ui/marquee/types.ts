import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { marqueeVariants } from "./variants";

export type MarqueeVariantProps = VariantProps<typeof marqueeVariants>;

export type MarqueeDirection = "left" | "right" | "up" | "down";

export type MarqueeProps = MarqueeVariantProps &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    children: ReactNode;
    direction?: MarqueeDirection;
    gap?: number | string;
    pauseOnHover?: boolean;
    speed?: number;
    trackClassName?: string;
    itemClassName?: string;
  };
