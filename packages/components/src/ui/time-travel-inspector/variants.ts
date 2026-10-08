import { cva } from "class-variance-authority";
import {
  zuiTimeTravelInspectorBase,
  zuiTimeTravelInspectorAppearances,
  zuiTimeTravelInspectorSizes,
} from "../../design-system/time-travel-inspector";

export const timeTravelInspectorVariants = cva(zuiTimeTravelInspectorBase, {
  variants: {
    appearance: zuiTimeTravelInspectorAppearances,
    size: zuiTimeTravelInspectorSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});

export {
  zuiTimeTravelInspectorToolbarBase,
  zuiTimeTravelInspectorMutedBase,
  zuiTimeTravelInspectorControlBase,
  zuiTimeTravelInspectorSelectedBase,
  zuiTimeTravelInspectorTimelineBase,
  zuiTimeTravelInspectorScrubberBase,
  zuiTimeTravelInspectorPanelBase,
  zuiTimeTravelInspectorCodeBase,
  zuiTimeTravelInspectorChangeBase,
  zuiTimeTravelInspectorBeforeBase,
  zuiTimeTravelInspectorAfterBase,
} from "../../design-system/time-travel-inspector";
