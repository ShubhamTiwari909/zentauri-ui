import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorldClock } from "./index";

describe("WorldClock", () => {
  const zones = ["UTC", "America/New_York", "Asia/Tokyo"];

  it("renders a card for each zone", () => {
    const { container } = render(<WorldClock zones={zones} />);
    const cards = container.querySelectorAll("[data-slot='world-clock-zone']");
    expect(cards.length).toBe(3);
  });

  it("has data-slot on the root", () => {
    const { container } = render(<WorldClock zones={zones} />);
    const root = container.querySelector("[data-slot='world-clock']");
    expect(root).toBeInTheDocument();
  });

  it("renders zone labels", () => {
    render(
      <WorldClock
        zones={[{ timeZone: "UTC", label: "Coordinated Universal Time" }]}
      />,
    );
    expect(screen.getByText("Coordinated Universal Time")).toBeInTheDocument();
  });

  it("renders <time> elements with dateTime", () => {
    const { container } = render(<WorldClock zones={["UTC"]} />);
    const timeEl = container.querySelector("time");
    expect(timeEl).toBeInTheDocument();
    expect(timeEl).toHaveAttribute("datetime");
  });

  it("accepts className", () => {
    const { container } = render(
      <WorldClock zones={zones} className="custom-class" />,
    );
    const root = container.querySelector("[data-slot='world-clock']");
    expect(root?.className).toContain("custom-class");
  });

  it("renders WorldClockZone with displayName", () => {
    expect(WorldClock.displayName).toBe("WorldClock");
  });

  it("tolerates empty zones", () => {
    const { container } = render(<WorldClock zones={[]} />);
    const cards = container.querySelectorAll("[data-slot='world-clock-zone']");
    expect(cards.length).toBe(0);
  });
});
