import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { TimelineDemoProps } from "./timeline-code-examples.types";

const TIMELINE_EVENTS = [
  { title: "Order placed", description: "We received your order." },
  { title: "Processing", description: "Your items are being prepared." },
  { title: "Shipped", description: "The package is on the way to you." },
  { title: "Delivered", description: "Handed off at the front door." },
] as const;

function timelineItems(itemTag: string, itemAttrs: string): string {
  return TIMELINE_EVENTS.map(
    (event) => `  <${itemTag}${itemAttrs}>
    <TimelineIndicator />
    <TimelineContent>
      <TimelineTitle>${event.title}</TimelineTitle>
      <TimelineDescription>${event.description}</TimelineDescription>
    </TimelineContent>
  </${itemTag}>`,
  ).join("\n");
}

export function timelineSnippet({
  appearance,
  size = "md",
  animated = false,
  transition = "default",
}: TimelineDemoProps): string {
  const itemTag = "TimelineItem";
  const itemAttrs = animated ? ` transitionVariant="${transition}"` : "";
  const detail = animated
    ? `appearance · ${appearance}, size · ${size}, animated · ${transition}`
    : `appearance · ${appearance}, size · ${size}`;

  return `${variantLeadComment(detail)}<Timeline appearance="${appearance}" size="${size}">
${timelineItems(itemTag, itemAttrs)}
</Timeline>`;
}
