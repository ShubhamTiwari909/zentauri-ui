import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RelativeTime } from "./index";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("RelativeTime", () => {
  it("renders a <time> element with dateTime attribute", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    render(<RelativeTime date={d} live={false} />);
    const el = screen.getByRole("time");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("datetime", d.toISOString());
  });

  it("has data-slot and displayName", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    render(<RelativeTime date={d} live={false} />);
    const el = document.querySelector("[data-slot='relative-time']");
    expect(el).toBeInTheDocument();
  });

  it("renders with tooltip title attribute", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    render(<RelativeTime date={d} live={false} withTooltip />);
    const el = screen.getByRole("time");
    expect(el).toHaveAttribute("title");
  });

  it("does not render tooltip when withTooltip is false", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    render(<RelativeTime date={d} live={false} withTooltip={false} />);
    const el = screen.getByRole("time");
    expect(el).not.toHaveAttribute("title");
  });

  it("accepts className", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    render(<RelativeTime date={d} live={false} className="custom-class" />);
    const el = screen.getByRole("time");
    expect(el.className).toContain("custom-class");
  });

  it("passes through HTML time attributes", () => {
    const d = new Date("2025-01-15T10:00:00Z");
    render(<RelativeTime date={d} live={false} id="my-time" lang="en" />);
    const el = screen.getByRole("time");
    expect(el).toHaveAttribute("id", "my-time");
    expect(el).toHaveAttribute("lang", "en");
  });
});
