import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { activityFeedVariants } from "./variants";

/** A person or system responsible for an activity event. */
export type ActivityFeedActor = {
  id: string;
  name: string;
  /** Optional image URL; initials are used when it is omitted. */
  avatar?: string;
};

/** A resource affected by an activity event. */
export type ActivityFeedObject = {
  id: string;
  label: string;
};

/** A single actor / verb / object event in chronological display order. */
export type ActivityFeedEvent = {
  id: string;
  actor: ActivityFeedActor;
  verb: string;
  object: ActivityFeedObject;
  /** Copy displayed for the event; the latest value is retained after grouping. */
  timestamp?: ReactNode;
};

export type ActivityFeedGrouping = "consecutive" | "none";

export type ActivityFeedVariantProps = VariantProps<
  typeof activityFeedVariants
>;

export type ActivityFeedBaseProps = ActivityFeedVariantProps &
  Omit<ComponentPropsWithRef<"div">, "children"> & {
    /** Events to display, ordered from most to least recent. */
    events: readonly ActivityFeedEvent[];
    /** Collapse adjacent events with the same actor, verb, and object. */
    grouping?: ActivityFeedGrouping;
    /** Content shown when there are no events. */
    emptyState?: ReactNode;
  };

export type ActivityFeedProps = ActivityFeedBaseProps;

export type ActivityFeedGroup = {
  actor: ActivityFeedActor;
  verb: string;
  object: ActivityFeedObject;
  timestamp?: ReactNode;
  events: readonly ActivityFeedEvent[];
};
