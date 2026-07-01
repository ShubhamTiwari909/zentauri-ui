import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ConsoleViewer } from "./console-viewer";
import type { ConsoleEntry } from "./types";

const SAMPLE: ConsoleEntry[] = [
  { type: "log", message: "Hello world" },
  { type: "info", message: "This is info" },
  { type: "warn", message: "Warning signal" },
  { type: "error", message: "Something broke", stack: "at line 42" },
  { type: "debug", message: "x = 42" },
  { type: "dir", message: "Object { a: 1, b: 2 }" },
  { type: "table", message: "Table data" },
];

const GROUPED: ConsoleEntry[] = [
  {
    type: "group",
    message: 'ConsoleGroup "items"',
    children: [
      { type: "log", message: "item 1" },
      { type: "log", message: "item 2" },
      {
        type: "groupCollapsed",
        message: "nested",
        children: [{ type: "log", message: "deep" }],
      },
      { type: "groupEnd", message: "" },
    ],
  },
];

describe("ConsoleViewer", () => {
  it("should set displayName", () => {
    expect(ConsoleViewer.displayName).toBe("ConsoleViewer");
  });

  it("should stamp data-slot on the root and body", () => {
    const { container } = render(<ConsoleViewer entries={SAMPLE} />);
    expect(
      container.querySelector('[data-slot="console-viewer"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="console-viewer-body"]'),
    ).toBeTruthy();
  });

  it("should render entry messages", () => {
    const { container } = render(<ConsoleViewer entries={SAMPLE} />);
    expect(container.textContent).toContain("Hello world");
    expect(container.textContent).toContain("This is info");
    expect(container.textContent).toContain("Warning signal");
    expect(container.textContent).toContain("Something broke");
  });

  it("should render stack traces", () => {
    const { container } = render(<ConsoleViewer entries={SAMPLE} />);
    const stackEl = container.querySelector(
      '[data-slot="console-viewer-entry-stack"]',
    );
    expect(stackEl?.textContent).toContain("at line 42");
  });

  it("should render type filter buttons", () => {
    const { container } = render(<ConsoleViewer entries={SAMPLE} />);
    const filterBtns = [
      ...container.querySelectorAll('[data-slot="console-viewer-filter-btn"]'),
    ];
    expect(filterBtns.length).toBeGreaterThan(0);
    const logBtn = filterBtns.find(
      (b) => b.getAttribute("data-type") === "log",
    );
    expect(logBtn).toBeTruthy();
  });

  it("should filter entries when a filter button is clicked", () => {
    const { container } = render(<ConsoleViewer entries={SAMPLE} />);
    const warnBtn = [
      ...container.querySelectorAll('[data-slot="console-viewer-filter-btn"]'),
    ].find((b) => b.getAttribute("data-type") === "warn") as HTMLButtonElement;
    fireEvent.click(warnBtn);
    const messages = [
      ...container.querySelectorAll(
        '[data-slot="console-viewer-entry-message"]',
      ),
    ];
    expect(
      messages.find((m) => m.textContent === "Warning signal"),
    ).toBeFalsy();
  });

  it("should render grouped entries", () => {
    const { container } = render(<ConsoleViewer entries={GROUPED} />);
    expect(container.textContent).toContain("ConsoleGroup");
    expect(container.textContent).toContain("item 1");
    expect(container.textContent).toContain("item 2");
  });

  it("should render nested group entries with depth", () => {
    const { container } = render(<ConsoleViewer entries={GROUPED} />);
    expect(container.textContent).toContain("nested");
    const toggles = [
      ...container.querySelectorAll(
        '[data-slot="console-viewer-group-toggle"]',
      ),
    ];
    fireEvent.click(toggles[1]!);
    expect(container.textContent).toContain("deep");
  });

  it("should have group toggle buttons", () => {
    const { container } = render(<ConsoleViewer entries={GROUPED} />);
    const toggles = [
      ...container.querySelectorAll(
        '[data-slot="console-viewer-group-toggle"]',
      ),
    ];
    expect(toggles.length).toBeGreaterThan(0);
  });

  it("should clear entries when clear button is clicked", () => {
    const { container } = render(<ConsoleViewer entries={SAMPLE} />);
    const clearBtn = container.querySelector(
      '[data-slot="console-viewer-clear"]',
    ) as HTMLButtonElement;
    fireEvent.click(clearBtn);
    const messages = [
      ...container.querySelectorAll(
        '[data-slot="console-viewer-entry-message"]',
      ),
    ];
    expect(messages.length).toBe(0);
  });

  it("should show empty state when no entries", () => {
    const { container } = render(<ConsoleViewer entries={[]} />);
    expect(
      container.querySelector('[data-slot="console-viewer-empty"]'),
    ).toBeTruthy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ConsoleViewer entries={SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("console-viewer");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <ConsoleViewer entries={SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="console-viewer"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});
