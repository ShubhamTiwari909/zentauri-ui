import type { ActivityFeedProps } from "@zentauri-ui/zentauri-components/ui/activity-feed";

export type ActivityFeedAppearance = NonNullable<
  ActivityFeedProps["appearance"]
>;
export type ActivityFeedSize = NonNullable<ActivityFeedProps["size"]>;
export type ActivityFeedGrouping = NonNullable<ActivityFeedProps["grouping"]>;

export type ActivityFeedDemoProps = {
  appearance: ActivityFeedAppearance;
  size: ActivityFeedSize;
  grouping: ActivityFeedGrouping;
};
