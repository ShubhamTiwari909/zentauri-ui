import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import type { TimelineTransition } from "./animated/animations";
import type {
  timelineIndicatorVariants,
  timelineVariants,
} from "./variants";

export type { TimelineTransition };

type TimelineVariantProps = VariantProps<typeof timelineVariants>;

export type TimelineAppearance = NonNullable<
  VariantProps<typeof timelineIndicatorVariants>["appearance"]
>;

export type TimelineSize = NonNullable<
  VariantProps<typeof timelineIndicatorVariants>["size"]
>;

export type TimelineProps = TimelineVariantProps & {
  /** Default indicator appearance applied to every item (overridable per indicator). */
  appearance?: TimelineAppearance;
  /** Controls indicator size, content spacing, and text scale. */
  size?: TimelineSize;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<"ol">, "children">;

export type TimelineItemProps = ComponentPropsWithRef<"li"> & {
  children?: ReactNode;
};

export type TimelineIndicatorProps = ComponentPropsWithoutRef<"div"> & {
  /** Override the appearance inherited from the Timeline root. */
  appearance?: TimelineAppearance;
  children?: ReactNode;
};

export type TimelineContentProps = ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
};

export type TimelineTitleProps = ComponentPropsWithoutRef<"div">;

export type TimelineDescriptionProps = ComponentPropsWithoutRef<"p">;

export type TimelineCtx = {
  appearance: TimelineAppearance;
  size: TimelineSize;
  total: number;
};

export type TimelineItemCtx = {
  index: number;
  isLast: boolean;
};
