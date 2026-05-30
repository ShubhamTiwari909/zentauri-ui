import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";
import { TimelineItem as TimelineItemAnimated } from "@zentauri-ui/zentauri-components/ui/timeline/animated";

import { TIMELINE_EVENTS } from "./timeline-code-examples.data";
import type { TimelineDemoProps } from "./timeline-code-examples.types";

export function TimelineDemo({
  appearance,
  size = "md",
  animated = false,
  transition = "default",
}: TimelineDemoProps) {
  if (animated) {
    return (
      <Timeline appearance={appearance} size={size}>
        {TIMELINE_EVENTS.map((event) => (
          <TimelineItemAnimated key={event.title} transitionVariant={transition}>
            <TimelineIndicator />
            <TimelineContent>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineDescription>{event.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItemAnimated>
        ))}
      </Timeline>
    );
  }
  return (
    <Timeline appearance={appearance} size={size}>
      {TIMELINE_EVENTS.map((event) => (
        <TimelineItem key={event.title}>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>{event.title}</TimelineTitle>
            <TimelineDescription>{event.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
