import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RequestTimelineViewer } from "./request-timeline-viewer";
import { phaseToneAt, timelineTotal } from "./request-timeline-viewer-base";
import type { TimelinePhase } from "./types";

const PHASES: TimelinePhase[] = [
  { label: "Blocked", duration: 12, tone: "blocked" },
  { label: "DNS", duration: 8, tone: "dns" },
  { label: "Connect", duration: 20, tone: "connect" },
  { label: "Wait", duration: 140, tone: "wait" },
  { label: "Receive", duration: 30, tone: "receive" },
];

describe("RequestTimelineViewer", () => {
  it("should set displayName", () => {
    expect(RequestTimelineViewer.displayName).toBe("RequestTimelineViewer");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<RequestTimelineViewer phases={PHASES} />);
    expect(
      container.querySelector('[data-slot="request-timeline-viewer"]'),
    ).toBeTruthy();
  });

  it("should render one row per phase", () => {
    const { container } = render(<RequestTimelineViewer phases={PHASES} />);
    const rows = container.querySelectorAll(
      '[data-slot="request-timeline-viewer-row"]',
    );
    expect(rows.length).toBe(PHASES.length);
  });

  it("should render phase labels and durations", () => {
    const { container } = render(<RequestTimelineViewer phases={PHASES} />);
    expect(container.textContent).toContain("Wait");
    expect(container.textContent).toContain("140ms");
  });

  it("should apply an inline width style to each bar", () => {
    const { container } = render(<RequestTimelineViewer phases={PHASES} />);
    const bar = container.querySelector(
      '[data-slot="request-timeline-viewer-bar"]',
    ) as HTMLElement;
    expect(bar.style.width).toMatch(/%$/);
  });

  it("should hide the legend when showLegend is false", () => {
    const { container, rerender } = render(
      <RequestTimelineViewer phases={PHASES} />,
    );
    expect(
      container.querySelector('[data-slot="request-timeline-viewer-legend"]'),
    ).toBeTruthy();
    rerender(<RequestTimelineViewer phases={PHASES} showLegend={false} />);
    expect(
      container.querySelector('[data-slot="request-timeline-viewer-legend"]'),
    ).toBeFalsy();
  });

  it("should hide the total when showTotal is false", () => {
    const { container, rerender } = render(
      <RequestTimelineViewer phases={PHASES} />,
    );
    expect(
      container.querySelector('[data-slot="request-timeline-viewer-total"]'),
    ).toBeTruthy();
    rerender(<RequestTimelineViewer phases={PHASES} showTotal={false} />);
    expect(
      container.querySelector('[data-slot="request-timeline-viewer-total"]'),
    ).toBeFalsy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<RequestTimelineViewer phases={PHASES} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe(
      "request-timeline-viewer",
    );
  });

  it("should apply custom className", () => {
    const { container } = render(
      <RequestTimelineViewer phases={PHASES} className="custom-class" />,
    );
    const root = container.querySelector(
      '[data-slot="request-timeline-viewer"]',
    );
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("request-timeline-viewer helpers", () => {
  it("sums phase durations", () => {
    expect(timelineTotal(PHASES)).toBe(210);
    expect(timelineTotal([])).toBe(0);
  });

  it("cycles tones by index when a phase omits its tone", () => {
    expect(phaseToneAt({ label: "a", duration: 1 }, 0)).toBe("blocked");
    expect(phaseToneAt({ label: "b", duration: 1 }, 1)).toBe("dns");
    expect(phaseToneAt({ label: "c", duration: 1, tone: "wait" }, 0)).toBe(
      "wait",
    );
  });
});
