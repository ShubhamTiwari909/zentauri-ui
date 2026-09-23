import { ActivityFeed } from "@zentauri-ui/zentauri-components/ui/activity-feed";

import { ACTIVITY_FEED_EVENTS } from "./data";
import type { ActivityFeedDemoProps } from "./types";

export function ActivityFeedDemo(props: ActivityFeedDemoProps) {
  return <ActivityFeed events={ACTIVITY_FEED_EVENTS} {...props} />;
}
