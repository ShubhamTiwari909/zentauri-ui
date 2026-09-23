import type {
  ActivityFeedEvent,
  ActivityFeedProps,
} from "@zentauri-ui/zentauri-components/ui/activity-feed";

export const ACTIVITY_FEED_APPEARANCES = [
  "default",
  "blue",
  "cyan",
  "teal",
  "emerald",
  "lime",
  "violet",
  "purple",
  "pink",
  "rose",
  "orange",
  "amber",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<ActivityFeedProps["appearance"]>[];

export const ACTIVITY_FEED_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<ActivityFeedProps["size"]>[];

export const ACTIVITY_FEED_GROUPING = ["consecutive", "none"] as const;

export const ACTIVITY_FEED_EVENTS = [
  {
    id: "activity-1",
    actor: { id: "maya", name: "Maya Chen" },
    verb: "commented on",
    object: { id: "atlas", label: "Project Atlas" },
    timestamp: "2m ago",
  },
  {
    id: "activity-2",
    actor: { id: "maya", name: "Maya Chen" },
    verb: "commented on",
    object: { id: "atlas", label: "Project Atlas" },
    timestamp: "5m ago",
  },
  {
    id: "activity-3",
    actor: { id: "leo", name: "Leo Park" },
    verb: "created",
    object: { id: "issue-12", label: "Issue #12" },
    timestamp: "1h ago",
  },
  {
    id: "activity-4",
    actor: { id: "dana", name: "Dana Ortiz" },
    verb: "moved",
    object: { id: "roadmap", label: "Roadmap" },
    timestamp: "3h ago",
  },
] as const satisfies readonly ActivityFeedEvent[];
