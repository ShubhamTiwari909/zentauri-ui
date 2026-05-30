// timeline.tsx — default static entry (no framer-motion)
import {
  Timeline as TimelineBase,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "./timeline-base";
import type { TimelineProps } from "./types";

export function Timeline(props: TimelineProps) {
  return <TimelineBase {...props} />;
}

Timeline.displayName = "Timeline";

export {
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
};
