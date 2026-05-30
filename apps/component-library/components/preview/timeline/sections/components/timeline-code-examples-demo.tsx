import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@zentauri-ui/zentauri-components/ui/timeline";
import { TimelineItem as TimelineItemAnimated } from "@zentauri-ui/zentauri-components/ui/timeline/animated";

import type { TimelineDemoProps } from "./timeline-code-examples.types";

const TIMELINE_EVENTS = [
  { title: "Order placed", description: "We received your order." },
  { title: "Processing", description: "Your items are being prepared." },
  { title: "Shipped", description: "The package is on the way to you." },
  { title: "Delivered", description: "Handed off at the front door." },
] as const;

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
