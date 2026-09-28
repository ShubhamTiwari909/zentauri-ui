import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  collectNeuralGraph,
  NeuralGraphBase,
  ZuiCluster,
  ZuiEdge,
  ZuiNode,
} from "./neural-graph-base";
import {
  clampNeuralZoom,
  initialNeuralCamera,
  projectNeuralPoint,
} from "./geometry";
import { zuiNeuralGraphAppearances } from "../../design-system/neural-graph";

describe("ZuiNeuralGraph", () => {
  it("shows an empty state and preserves caller classes", () => {
    render(<NeuralGraphBase className="custom-graph" />);
    expect(
      screen.getByText("Add nodes to explore the graph"),
    ).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveClass("custom-graph");
  });

  it("collects nested clusters and ignores edges to missing nodes", () => {
    const graph = collectNeuralGraph(
      <>
        <ZuiCluster id="encoder" label="Encoder">
          <ZuiNode id="a" position={[0, 0, 0]} label="Input" />
        </ZuiCluster>
        <ZuiNode id="b" position={[2, 0, 1]} />
        <ZuiEdge from="a" to="b" animated />
        <ZuiEdge from="a" to="missing" />
      </>,
    );
    expect(graph.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "a", cluster: "encoder" }),
      ]),
    );
    expect(graph.edges).toEqual([{ from: "a", to: "b", animated: true }]);
    expect(graph.clusters).toEqual([{ id: "encoder", label: "Encoder" }]);
  });

  it("supports keyboard selection and controlled selection", () => {
    const onSelectionChange = vi.fn();
    const nodes = [
      { id: "a", position: [0, 0, 0] as const, label: "Alpha" },
      { id: "b", position: [1, 0, 0] as const, label: "Beta" },
    ];
    const { rerender } = render(
      <NeuralGraphBase nodes={nodes} onSelectionChange={onSelectionChange} />,
    );
    const region = screen.getByRole("region");
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(onSelectionChange).toHaveBeenCalledWith("a");
    expect(screen.getByText("Selected: Alpha")).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByText("Selected: Beta")).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "Escape" });
    expect(onSelectionChange).toHaveBeenLastCalledWith(null);
    rerender(
      <NeuralGraphBase
        nodes={nodes}
        selectedId="a"
        onSelectionChange={onSelectionChange}
      />,
    );
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(onSelectionChange).toHaveBeenLastCalledWith("b");
    expect(screen.getByText("Selected: Alpha")).toBeInTheDocument();
  });

  it("starts backward keyboard selection at the last node", () => {
    const onSelectionChange = vi.fn();
    const nodes = [
      { id: "a", position: [0, 0, 0] as const },
      { id: "b", position: [1, 0, 0] as const },
    ];
    const { rerender } = render(
      <NeuralGraphBase nodes={nodes} onSelectionChange={onSelectionChange} />,
    );
    fireEvent.keyDown(screen.getByRole("region"), { key: "ArrowLeft" });
    expect(onSelectionChange).toHaveBeenLastCalledWith("b");

    rerender(
      <NeuralGraphBase
        nodes={nodes.slice(0, 1)}
        selectedId={null}
        onSelectionChange={onSelectionChange}
      />,
    );
    fireEvent.keyDown(screen.getByRole("region"), { key: "ArrowUp" });
    expect(onSelectionChange).toHaveBeenLastCalledWith("a");
  });

  it("prevents page scrolling only while wheel zoom is interactive", () => {
    const { container, rerender } = render(
      <NeuralGraphBase nodes={[{ id: "a", position: [0, 0, 0] }]} />,
    );
    const canvas = container.querySelector("canvas")!;
    const zoomEvent = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      deltaY: -100,
    });
    canvas.dispatchEvent(zoomEvent);
    expect(zoomEvent.defaultPrevented).toBe(true);

    rerender(
      <NeuralGraphBase
        nodes={[{ id: "a", position: [0, 0, 0] }]}
        interactive={false}
      />,
    );
    const scrollEvent = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      deltaY: -100,
    });
    canvas.dispatchEvent(scrollEvent);
    expect(scrollEvent.defaultPrevented).toBe(false);
  });

  it("exposes every palette through the variant map", () => {
    expect(Object.keys(zuiNeuralGraphAppearances)).toHaveLength(18);
    for (const appearance of Object.keys(
      zuiNeuralGraphAppearances,
    ) as (keyof typeof zuiNeuralGraphAppearances)[]) {
      const { unmount } = render(
        <NeuralGraphBase
          appearance={appearance}
          nodes={[{ id: "a", position: [0, 0, 0] }]}
        />,
      );
      expect(screen.getByRole("region").className).toContain(
        `--zui-neural-graph-${appearance}-node`,
      );
      unmount();
    }
  });

  it("projects depth and clamps zoom", () => {
    const near = projectNeuralPoint(
      [0, 0, 2],
      { ...initialNeuralCamera, yaw: 0, pitch: 0 },
      400,
      300,
    );
    const far = projectNeuralPoint(
      [0, 0, -2],
      { ...initialNeuralCamera, yaw: 0, pitch: 0 },
      400,
      300,
    );
    expect(near.scale).toBeGreaterThan(far.scale);
    expect(clampNeuralZoom(0.1)).toBe(0.35);
    expect(clampNeuralZoom(10)).toBe(4);
  });
});
