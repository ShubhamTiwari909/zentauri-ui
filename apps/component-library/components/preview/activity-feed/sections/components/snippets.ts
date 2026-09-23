import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { ActivityFeedDemoProps } from "./types";

export function activityFeedSnippet({
  appearance,
  size,
  grouping,
}: ActivityFeedDemoProps): string {
  const groupingAttr = grouping === "consecutive" ? "" : ' grouping="none"';

  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, grouping · ${grouping}`)}import { ActivityFeed } from "@zentauri-ui/zentauri-components/ui/activity-feed";

const events = [
  {
    id: "comment-1",
    actor: { id: "maya", name: "Maya Chen" },
    verb: "commented on",
    object: { id: "atlas", label: "Project Atlas" },
    timestamp: "2m ago",
  },
  {
    id: "comment-2",
    actor: { id: "maya", name: "Maya Chen" },
    verb: "commented on",
    object: { id: "atlas", label: "Project Atlas" },
    timestamp: "5m ago",
  },
];

<ActivityFeed events={events} appearance="${appearance}" size="${size}"${groupingAttr} />`;
}
