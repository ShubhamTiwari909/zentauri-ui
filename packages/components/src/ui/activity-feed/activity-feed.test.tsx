import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityFeed } from "./activity-feed";
import { groupActivityFeedEvents } from "./activity-feed-base";
import type { ActivityFeedEvent } from "./types";

const EVENTS: ActivityFeedEvent[] = [
  {
    id: "1",
    actor: { id: "maya", name: "Maya Chen" },
    verb: "commented on",
    object: { id: "atlas", label: "Project Atlas" },
    timestamp: "2m ago",
  },
  {
    id: "2",
    actor: { id: "maya", name: "Maya Chen" },
    verb: "commented on",
    object: { id: "atlas", label: "Project Atlas" },
    timestamp: "5m ago",
  },
  {
    id: "3",
    actor: { id: "leo", name: "Leo Park" },
    verb: "created",
    object: { id: "issue-12", label: "Issue #12" },
    timestamp: "1h ago",
  },
];

describe("ActivityFeed", () => {
  it("sets the display name", () => {
    expect(ActivityFeed.displayName).toBe("ActivityFeed");
  });

  it("renders grouped actor, verb, and object events", () => {
    const { container } = render(<ActivityFeed events={EVENTS} />);
    expect(
      container.querySelectorAll('[data-slot="activity-feed-item"]'),
    ).toHaveLength(2);
    expect(container.textContent).toContain(
      "Maya Chen commented on Project Atlas",
    );
    expect(container.textContent).toContain("2 events");
    expect(container.textContent).toContain("2m ago");
    expect(container.textContent).not.toContain("5m ago");
  });

  it("can render each event independently", () => {
    const { container } = render(
      <ActivityFeed events={EVENTS} grouping="none" />,
    );
    expect(
      container.querySelectorAll('[data-slot="activity-feed-item"]'),
    ).toHaveLength(3);
  });

  it("supports colored appearances", () => {
    const { container } = render(
      <ActivityFeed events={EVENTS} appearance="emerald" />,
    );
    expect(
      container.querySelector('[data-slot="activity-feed"]')?.className,
    ).toContain("--zui-activity-feed-emerald-bg");
  });

  it("renders the empty state", () => {
    const { container } = render(
      <ActivityFeed events={[]} emptyState="Nothing happened." />,
    );
    expect(
      container.querySelector('[data-slot="activity-feed-empty"]')?.textContent,
    ).toBe("Nothing happened.");
  });

  it("forwards refs and custom class names", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ActivityFeed events={EVENTS} ref={ref} className="custom-feed" />);
    expect(ref.current?.getAttribute("data-slot")).toBe("activity-feed");
    expect(ref.current?.className).toContain("custom-feed");
  });
});

describe("groupActivityFeedEvents", () => {
  it("only groups adjacent matching events", () => {
    expect(groupActivityFeedEvents(EVENTS)).toHaveLength(2);
    expect(
      groupActivityFeedEvents([EVENTS[0]!, EVENTS[2]!, EVENTS[1]!]),
    ).toHaveLength(3);
  });
});
