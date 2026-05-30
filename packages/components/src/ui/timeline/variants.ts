import { cva } from "class-variance-authority";

import {
  zuiTimelineBase,
  zuiTimelineConnectorBase,
  zuiTimelineConnectorSizes,
  zuiTimelineContentBase,
  zuiTimelineContentSizes,
  zuiTimelineDescriptionBase,
  zuiTimelineDescriptionSizes,
  zuiTimelineIndicatorAppearances,
  zuiTimelineIndicatorBase,
  zuiTimelineIndicatorSizes,
  zuiTimelineItemBase,
  zuiTimelineTitleBase,
  zuiTimelineTitleSizes,
} from "../../design-system/timeline";

export const timelineVariants = cva(zuiTimelineBase);

export const timelineItemVariants = cva(zuiTimelineItemBase);

export const timelineConnectorVariants = cva(zuiTimelineConnectorBase, {
  variants: {
    size: zuiTimelineConnectorSizes,
  },
  defaultVariants: { size: "md" },
});

export const timelineIndicatorVariants = cva(zuiTimelineIndicatorBase, {
  variants: {
    appearance: zuiTimelineIndicatorAppearances,
    size: zuiTimelineIndicatorSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const timelineContentVariants = cva(zuiTimelineContentBase, {
  variants: {
    size: zuiTimelineContentSizes,
  },
  defaultVariants: { size: "md" },
});

export const timelineTitleVariants = cva(zuiTimelineTitleBase, {
  variants: {
    size: zuiTimelineTitleSizes,
  },
  defaultVariants: { size: "md" },
});

export const timelineDescriptionVariants = cva(zuiTimelineDescriptionBase, {
  variants: {
    size: zuiTimelineDescriptionSizes,
  },
  defaultVariants: { size: "md" },
});
