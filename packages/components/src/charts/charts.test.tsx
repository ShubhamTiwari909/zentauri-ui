import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FunnelChart } from "./funnel";
import { PieChart } from "./pie";
import { RadarChart } from "./radar";
import { ScatterChart } from "./scatter";
import { StackedBarChart } from "./stacked-bar";

const emptySeries = [{ dataKey: "value", name: "Value" }];

describe("chart entries", () => {
  it("should expose display names for new chart components", () => {
    expect(FunnelChart.displayName).toBe("FunnelChart");
    expect(RadarChart.displayName).toBe("RadarChart");
    expect(ScatterChart.displayName).toBe("ScatterChart");
    expect(StackedBarChart.displayName).toBe("StackedBarChart");
  });

  it("should render RadarChart empty state", () => {
    render(
      <RadarChart
        data={[]}
        xKey="axis"
        series={emptySeries}
        emptyState="No radar data"
      />,
    );
    expect(screen.getByText("No radar data")).toBeInTheDocument();
  });

  it("should render ScatterChart empty state", () => {
    render(
      <ScatterChart
        data={[]}
        xKey="x"
        series={emptySeries}
        emptyState="No scatter data"
      />,
    );
    expect(screen.getByText("No scatter data")).toBeInTheDocument();
  });

  it("should render StackedBarChart empty state", () => {
    render(
      <StackedBarChart
        data={[]}
        xKey="month"
        series={emptySeries}
        emptyState="No stacked bars"
      />,
    );
    expect(screen.getByText("No stacked bars")).toBeInTheDocument();
  });

  it("should render FunnelChart empty state", () => {
    render(
      <FunnelChart
        data={[]}
        dataKey="value"
        nameKey="stage"
        emptyState="No funnel data"
      />,
    );
    expect(screen.getByText("No funnel data")).toBeInTheDocument();
  });

  it("should render PieChart center content for donut charts", () => {
    render(
      <PieChart
        data={[{ segment: "Desktop", value: 44, color: "#0891b2" }]}
        dataKey="value"
        nameKey="segment"
        innerRadius="50%"
        center={<span>Total share</span>}
      />,
    );
    expect(screen.getByText("Total share")).toBeInTheDocument();
  });
});
