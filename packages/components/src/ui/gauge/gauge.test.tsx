import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Gauge } from "./gauge";

describe("Gauge", () => {
  it("exposes its display name", () => {
    expect(Gauge.displayName).toBe("Gauge");
  });

  it("renders an accessible meter with the default value", () => {
    render(<Gauge />);
    const gauge = screen.getByRole("meter", { name: "Gauge" });
    expect(gauge).toHaveAttribute("aria-valuemin", "0");
    expect(gauge).toHaveAttribute("aria-valuemax", "100");
    expect(gauge).toHaveAttribute("aria-valuenow", "0");
    expect(gauge).toHaveAttribute("aria-valuetext", "0%");
  });

  it("stamps data slots on each visual part", () => {
    render(<Gauge value={42} label="Storage" />);
    expect(document.querySelector('[data-slot="gauge"]')).toBeTruthy();
    expect(document.querySelector('[data-slot="gauge-svg"]')).toBeTruthy();
    expect(document.querySelector('[data-slot="gauge-track"]')).toBeTruthy();
    expect(
      document.querySelector('[data-slot="gauge-indicator"]'),
    ).toBeTruthy();
    expect(
      document.querySelector('[data-slot="gauge-value"]'),
    ).toHaveTextContent("42%");
    expect(
      document.querySelector('[data-slot="gauge-label"]'),
    ).toHaveTextContent("Storage");
  });

  it("clamps values to the supplied range", () => {
    render(<Gauge value={250} min={50} max={200} label="Capacity" />);
    const gauge = screen.getByRole("meter", { name: "Capacity" });
    expect(gauge).toHaveAttribute("aria-valuenow", "200");
    expect(gauge).toHaveAttribute("aria-valuetext", "100%");
  });

  it("normalizes a reversed range", () => {
    render(<Gauge value={50} min={100} max={0} />);
    const gauge = screen.getByRole("meter");
    expect(gauge).toHaveAttribute("aria-valuemin", "0");
    expect(gauge).toHaveAttribute("aria-valuemax", "100");
    expect(gauge).toHaveAttribute("aria-valuenow", "50");
  });

  it("supports custom value formatting", () => {
    render(
      <Gauge value={3} max={4} formatValue={(value) => `${value} of 4`} />,
    );
    expect(
      document.querySelector('[data-slot="gauge-value"]'),
    ).toHaveTextContent("3 of 4");
    expect(screen.getByRole("meter")).toHaveAttribute(
      "aria-valuetext",
      "3 of 4",
    );
  });

  it("can hide the default value", () => {
    render(<Gauge value={30} showValue={false} />);
    expect(document.querySelector('[data-slot="gauge-value"]')).toBeNull();
  });

  it("accepts custom center content", () => {
    render(<Gauge value={75}>Three quarters</Gauge>);
    expect(screen.getByText("Three quarters")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="gauge-value"]')).toBeNull();
  });

  it("renders the dial as a partial rounded arc", () => {
    render(<Gauge value={50} variant="dial" />);
    const track = document.querySelector('[data-slot="gauge-track"]');
    expect(track).toHaveAttribute("stroke-linecap", "round");
    expect(track?.getAttribute("transform")).toContain("rotate(135");
  });

  it("forwards ref and className to the root", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Gauge ref={ref} className="custom-gauge" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("custom-gauge");
    expect(ref.current).toHaveAttribute("data-slot", "gauge");
  });
});
