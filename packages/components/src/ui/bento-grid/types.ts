import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { bentoGridItemVariants, bentoGridVariants } from "./variants";

export type BentoGridSpan = "1x1" | "2x1" | "1x2" | "2x2" | "featured";

/**
 * Cumulative animation levels: `bento` includes reflow; `morph` includes both.
 * The static entry never animates, but still reads the level to gate behavior
 * (bento expand needs `bento`+, the detail view needs `morph`).
 */
export type BentoGridAnimation = "none" | "reflow" | "bento" | "morph";

export type BentoGridVariantProps = VariantProps<typeof bentoGridVariants> &
  VariantProps<typeof bentoGridItemVariants>;

export type BentoGridContextValue = {
  animation: BentoGridAnimation;
  cols: number;
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

export type BentoGridBaseProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof bentoGridVariants> & {
    cols?: number;
    /** Overrides `cols` with `repeat(auto-fit, minmax(minItemWidth, 1fr))`. */
    minItemWidth?: number;
    animation?: BentoGridAnimation;
  };

export type BentoGridItemBaseProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof bentoGridItemVariants> & {
    /** Stability key for reflow/morph animations. Must be unique within a grid. */
    id: string;
    expandable?: boolean;
    expandedSpan?: BentoGridSpan;
    detail?: ReactNode;
    onOpenDetail?: () => void;
    onCloseDetail?: () => void;
  };

export type BentoGridProps = BentoGridBaseProps;
export type BentoGridItemProps = BentoGridItemBaseProps;
