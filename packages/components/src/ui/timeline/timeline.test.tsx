import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "./timeline";

describe("Timeline", () => {
  it("should expose displayName", () => {
    expect(Timeline.displayName).toBe("Timeline");
    expect(TimelineItem.displayName).toBe("TimelineItem");
    expect(TimelineIndicator.displayName).toBe("TimelineIndicator");
    expect(TimelineContent.displayName).toBe("TimelineContent");
    expect(TimelineTitle.displayName).toBe("TimelineTitle");
    expect(TimelineDescription.displayName).toBe("TimelineDescription");
  });

  it("should stamp data-slot on timeline root and use ordered list markup", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>One</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    const root = document.querySelector('[data-slot="timeline"]');
    expect(root).toBeTruthy();
    expect(root?.tagName).toBe("OL");
    expect(document.querySelector('[data-slot="timeline-item"]')?.tagName).toBe(
      "LI",
    );
  });

  it("should apply default indicator appearance from the root", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Cart</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    const indicator = document.querySelector(
      '[data-slot="timeline-indicator"]',
    );
    expect(indicator?.className).toContain(
      "--zui-timeline-indicator-default-border",
    );
  });

  it("should inherit appearance from the Timeline root", () => {
    render(
      <Timeline appearance="sky">
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Sky</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    const indicator = document.querySelector(
      '[data-slot="timeline-indicator"]',
    );
    expect(indicator?.className).toContain(
      "--zui-timeline-indicator-sky-border",
    );
  });

  it("should let an indicator override the root appearance", () => {
    render(
      <Timeline appearance="sky">
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Default sky</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator appearance="rose" />
          <TimelineContent>
            <TimelineTitle>Override rose</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    const indicators = document.querySelectorAll(
      '[data-slot="timeline-indicator"]',
    );
    expect(indicators[0]?.className).toContain(
      "--zui-timeline-indicator-sky-border",
    );
    expect(indicators[1]?.className).toContain(
      "--zui-timeline-indicator-rose-border",
    );
  });

  it("should pass size from Timeline context to indicators", () => {
    render(
      <Timeline size="sm">
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Small</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    const indicator = document.querySelector(
      '[data-slot="timeline-indicator"]',
    );
    expect(indicator?.className).toMatch(/size-5/);
  });

  it("should render a connector on every item except the last", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>First</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Second</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>Third</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    const connectors = document.querySelectorAll(
      '[data-slot="timeline-connector"]',
    );
    expect(connectors).toHaveLength(2);
    const items = document.querySelectorAll('[data-slot="timeline-item"]');
    expect(items[2]?.hasAttribute("data-last")).toBe(true);
    expect(items[0]?.hasAttribute("data-last")).toBe(false);
  });

  it("should drop bottom padding on the last item's content", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent data-testid="first">
            <TimelineTitle>First</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent data-testid="last">
            <TimelineTitle>Last</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    expect(screen.getByTestId("first").className).toMatch(/pb-6/);
    expect(screen.getByTestId("last").className).toMatch(/pb-0/);
    expect(screen.getByTestId("last").className).not.toMatch(/pb-6/);
  });

  it("should render custom indicator children", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator>✓</TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>Check</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("should stamp data-slot on content, title and description", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent data-testid="c">
            <TimelineTitle data-testid="t">T</TimelineTitle>
            <TimelineDescription data-testid="d">D</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    expect(document.querySelector('[data-slot="timeline-content"]')).toBe(
      screen.getByTestId("c"),
    );
    expect(document.querySelector('[data-slot="timeline-title"]')).toBe(
      screen.getByTestId("t"),
    );
    expect(document.querySelector('[data-slot="timeline-description"]')).toBe(
      screen.getByTestId("d"),
    );
  });

  it("should forward ref on Timeline", () => {
    const ref = createRef<HTMLOListElement>();
    render(
      <Timeline ref={ref}>
        <TimelineItem>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>A</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("timeline");
  });

  it("should forward ref on TimelineItem", () => {
    const ref = createRef<HTMLLIElement>();
    render(
      <Timeline>
        <TimelineItem ref={ref}>
          <TimelineIndicator />
          <TimelineContent>
            <TimelineTitle>A</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("timeline-item");
  });

  it("should throw when TimelineItem is used outside Timeline", () => {
    expect(() =>
      render(
        <TimelineItem>
          <TimelineIndicator />
        </TimelineItem>,
      ),
    ).toThrow(/must be used within <Timeline>/);
  });

  it("should throw when TimelineIndicator is used outside Timeline", () => {
    expect(() => render(<TimelineIndicator />)).toThrow(
      /must be used within <Timeline>/,
    );
  });
});
