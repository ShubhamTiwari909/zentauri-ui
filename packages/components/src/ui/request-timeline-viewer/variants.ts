import { cva } from "class-variance-authority";

import {
  zuiRequestTimelineViewerAppearances,
  zuiRequestTimelineViewerBase,
  zuiRequestTimelineViewerPhaseTones,
  zuiRequestTimelineViewerSizes,
} from "../../design-system/request-timeline-viewer";

export const requestTimelineViewerVariants = cva(zuiRequestTimelineViewerBase, {
  variants: {
    appearance: zuiRequestTimelineViewerAppearances,
    size: zuiRequestTimelineViewerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const requestTimelineViewerBarVariants = cva("", {
  variants: {
    tone: zuiRequestTimelineViewerPhaseTones,
  },
  defaultVariants: {
    tone: "blocked",
  },
});

export const requestTimelineViewerSwatchVariants = cva("", {
  variants: {
    tone: zuiRequestTimelineViewerPhaseTones,
  },
  defaultVariants: {
    tone: "blocked",
  },
});

export {
  zuiRequestTimelineViewerBarBase,
  zuiRequestTimelineViewerDurationBase,
  zuiRequestTimelineViewerLabelBase,
  zuiRequestTimelineViewerLegendBase,
  zuiRequestTimelineViewerLegendSwatchBase,
  zuiRequestTimelineViewerRowBase,
  zuiRequestTimelineViewerTotalBase,
  zuiRequestTimelineViewerTrackBase,
} from "../../design-system/request-timeline-viewer";
