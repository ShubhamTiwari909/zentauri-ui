import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LogViewer } from "./log-viewer";
import { formatLogTimestamp } from "./log-viewer-base";
import type { LogEntry } from "./types";

const SAMPLE: LogEntry[] = [
  {
    level: "error",
    timestamp: "2025-06-01T10:00:00Z",
    message: "Connection refused",
    meta: "service=api",
  },
  {
    level: "warn",
    timestamp: "2025-06-01T10:00:01Z",
    message: "High memory usage",
    meta: "mem=85%",
  },
  {
    level: "info",
    timestamp: "2025-06-01T10:00:02Z",
    message: "Server started on port 3000",
  },
  {
    level: "debug",
    timestamp: "2025-06-01T10:00:03Z",
    message: "Request body parsed",
    stack: "at parseBody (server.ts:42)",
  },
  {
    level: "verbose",
    timestamp: "2025-06-01T10:00:04Z",
    message: "Headers: { content-type: application/json }",
  },
];

describe("LogViewer", () => {
  it("should set displayName", () => {
    expect(LogViewer.displayName).toBe("LogViewer");
  });

  it("should stamp data-slot on the root and body", () => {
    const { container } = render(<LogViewer entries={SAMPLE} />);
    expect(container.querySelector('[data-slot="log-viewer"]')).toBeTruthy();
    expect(
      container.querySelector('[data-slot="log-viewer-body"]'),
    ).toBeTruthy();
  });

  it("should render the given entry text", () => {
    const { container } = render(<LogViewer entries={SAMPLE} />);
    expect(container.textContent).toContain("Connection refused");
    expect(container.textContent).toContain("High memory usage");
    expect(container.textContent).toContain("Server started on port 3000");
    expect(container.textContent).toContain("Request body parsed");
    expect(container.textContent).toContain("Headers");
    expect(container.textContent).toContain("verbose");
  });

  it("should render a level filter button for each log level", () => {
    const { container } = render(<LogViewer entries={SAMPLE} />);
    const buttons = [
      ...container.querySelectorAll('[data-slot="log-viewer-filter-button"]'),
    ];
    expect(buttons.length).toBe(5);
    expect(buttons.map((b) => b.textContent)).toEqual([
      "error",
      "warn",
      "info",
      "debug",
      "verbose",
    ]);
  });

  it("should filter entries when a level filter is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<LogViewer entries={SAMPLE} />);

    expect(
      container.querySelectorAll('[data-slot="log-viewer-entry"]').length,
    ).toBe(5);

    const errorBtn = container.querySelector(
      '[data-slot="log-viewer-filter-button"][data-level="error"]',
    );
    if (errorBtn) await user.click(errorBtn);

    expect(
      container.querySelectorAll('[data-slot="log-viewer-entry"]').length,
    ).toBe(4);

    expect(container.textContent).not.toContain("Connection refused");
  });

  it("should filter entries by search query", async () => {
    const user = userEvent.setup();
    const { container } = render(<LogViewer entries={SAMPLE} />);

    const searchInput = container.querySelector(
      '[data-slot="log-viewer-search-input"]',
    );
    expect(searchInput).toBeTruthy();

    await user.type(searchInput!, "memory");

    expect(
      container.querySelectorAll('[data-slot="log-viewer-entry"]').length,
    ).toBe(1);
    expect(container.textContent).toContain("High memory usage");
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<LogViewer entries={SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("log-viewer");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <LogViewer entries={SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="log-viewer"]');
    expect(root?.className).toMatch(/custom-class/);
  });

  it("should show empty state when search has no match", async () => {
    const user = userEvent.setup();
    const { container } = render(<LogViewer entries={SAMPLE} />);

    const searchInput = container.querySelector(
      '[data-slot="log-viewer-search-input"]',
    );

    await user.type(searchInput!, "zzzzz_nonexistent");

    expect(
      container.querySelector('[data-slot="log-viewer-empty"]'),
    ).toBeTruthy();
  });
});

describe("log-viewer helpers", () => {
  it("formatLogTimestamp returns a formatted string", () => {
    const formatted = formatLogTimestamp("2025-06-01T10:00:00Z");
    expect(typeof formatted).toBe("string");
    expect(formatted.length).toBeGreaterThan(0);
  });
});
