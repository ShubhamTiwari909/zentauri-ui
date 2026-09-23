"use client";

import { cn } from "../../lib/utils";

import type {
  ActivityFeedBaseProps,
  ActivityFeedEvent,
  ActivityFeedGroup,
} from "./types";
import {
  activityFeedAvatarVariants,
  activityFeedItemVariants,
  activityFeedVariants,
  zuiActivityFeedActorBase,
  zuiActivityFeedAvatarImageBase,
  zuiActivityFeedContentBase,
  zuiActivityFeedCountBase,
  zuiActivityFeedEmptyBase,
  zuiActivityFeedListBase,
  zuiActivityFeedMetaBase,
  zuiActivityFeedObjectBase,
  zuiActivityFeedSummaryBase,
  zuiActivityFeedVerbBase,
} from "./variants";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => Array.from(part)[0])
    .join("")
    .toUpperCase();
}

function sameActivity(
  left: ActivityFeedEvent,
  right: ActivityFeedEvent,
): boolean {
  return (
    left.actor.id === right.actor.id &&
    left.verb === right.verb &&
    left.object.id === right.object.id
  );
}

/** Groups adjacent events while preserving their chronological order. */
export function groupActivityFeedEvents(
  events: readonly ActivityFeedEvent[],
): ActivityFeedGroup[] {
  return events.reduce<ActivityFeedGroup[]>((groups, event) => {
    const previous = groups.at(-1);
    const previousEvent = previous?.events.at(-1);

    if (previous && previousEvent && sameActivity(previousEvent, event)) {
      previous.events = [...previous.events, event];
      return groups;
    }

    groups.push({
      actor: event.actor,
      verb: event.verb,
      object: event.object,
      timestamp: event.timestamp,
      events: [event],
    });
    return groups;
  }, []);
}

export function ActivityFeedBase({
  events,
  grouping = "consecutive",
  emptyState = "No activity yet.",
  appearance,
  size,
  className,
  ref,
  ...rest
}: ActivityFeedBaseProps) {
  const groups =
    grouping === "consecutive"
      ? groupActivityFeedEvents(events)
      : events.map((event) => ({
          actor: event.actor,
          verb: event.verb,
          object: event.object,
          timestamp: event.timestamp,
          events: [event],
        }));

  return (
    <div
      ref={ref}
      data-slot="activity-feed"
      className={cn(activityFeedVariants({ appearance, size }), className)}
      {...rest}
    >
      {groups.length === 0 ? (
        <div
          data-slot="activity-feed-empty"
          className={zuiActivityFeedEmptyBase}
        >
          {emptyState}
        </div>
      ) : (
        <ul data-slot="activity-feed-list" className={zuiActivityFeedListBase}>
          {groups.map((group) => {
            const count = group.events.length;
            const latestEvent = group.events[0];
            const hasTimestamp = latestEvent?.timestamp != null;
            return (
              <li
                key={group.events[0]?.id}
                data-slot="activity-feed-item"
                data-count={count}
                className={activityFeedItemVariants({ size })}
              >
                <span
                  aria-hidden="true"
                  data-slot="activity-feed-avatar"
                  className={activityFeedAvatarVariants({ size })}
                >
                  {group.actor.avatar ? (
                    <img
                      alt=""
                      src={group.actor.avatar}
                      className={zuiActivityFeedAvatarImageBase}
                    />
                  ) : (
                    initials(group.actor.name)
                  )}
                </span>
                <div
                  data-slot="activity-feed-content"
                  className={zuiActivityFeedContentBase}
                >
                  <p
                    data-slot="activity-feed-summary"
                    className={zuiActivityFeedSummaryBase}
                  >
                    <span
                      data-slot="activity-feed-actor"
                      className={zuiActivityFeedActorBase}
                    >
                      {group.actor.name}
                    </span>{" "}
                    <span
                      data-slot="activity-feed-verb"
                      className={zuiActivityFeedVerbBase}
                    >
                      {group.verb}
                    </span>{" "}
                    <span
                      data-slot="activity-feed-object"
                      className={zuiActivityFeedObjectBase}
                    >
                      {group.object.label}
                    </span>
                  </p>
                  {count > 1 || hasTimestamp ? (
                    <div
                      data-slot="activity-feed-meta"
                      className={zuiActivityFeedMetaBase}
                    >
                      {count > 1 ? (
                        <span
                          data-slot="activity-feed-count"
                          className={zuiActivityFeedCountBase}
                        >
                          {count} events
                        </span>
                      ) : null}
                      {hasTimestamp ? (
                        <span data-slot="activity-feed-timestamp">
                          {latestEvent.timestamp}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

ActivityFeedBase.displayName = "ActivityFeed";
