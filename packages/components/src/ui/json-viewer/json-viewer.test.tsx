import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JsonViewer } from "./json-viewer";
import {
  collectExpandablePaths,
  formatJsonPrimitive,
  jsonContainerSummary,
  jsonValueKind,
} from "./json-viewer-base";

const SAMPLE = {
  name: "Ada",
  active: true,
  score: 42,
  tags: ["alpha", "beta"],
  meta: null,
};

describe("JsonViewer", () => {
  it("should set displayName", () => {
    expect(JsonViewer.displayName).toBe("JsonViewer");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<JsonViewer data={SAMPLE} />);
    expect(container.querySelector('[data-slot="json-viewer"]')).toBeTruthy();
    expect(
      container.querySelector('[data-slot="json-viewer-tree"]'),
    ).toBeTruthy();
  });

  it("should render keys and colored values", () => {
    const { container } = render(<JsonViewer data={SAMPLE} />);
    const keys = [
      ...container.querySelectorAll('[data-slot="json-viewer-key"]'),
    ];
    expect(keys.some((k) => k.textContent === '"name"')).toBe(true);
    const values = [
      ...container.querySelectorAll('[data-slot="json-viewer-value"]'),
    ];
    expect(values.some((v) => v.textContent === '"Ada"')).toBe(true);
    expect(values.some((v) => v.getAttribute("data-kind") === "boolean")).toBe(
      true,
    );
    expect(values.some((v) => v.getAttribute("data-kind") === "null")).toBe(
      true,
    );
  });

  it("should render the toolbar by default and hide it when disabled", () => {
    const { container, rerender } = render(<JsonViewer data={SAMPLE} />);
    expect(
      container.querySelector('[data-slot="json-viewer-toolbar"]'),
    ).toBeTruthy();
    rerender(<JsonViewer data={SAMPLE} showToolbar={false} />);
    expect(
      container.querySelector('[data-slot="json-viewer-toolbar"]'),
    ).toBeFalsy();
  });

  it("should collapse a container when its toggle is clicked", () => {
    const { container } = render(<JsonViewer data={SAMPLE} />);
    const tagsKey = [
      ...container.querySelectorAll('[data-slot="json-viewer-key"]'),
    ].find((k) => k.textContent === '"tags"');
    expect(tagsKey?.textContent).toBe('"tags"');
    // initially expanded: array items are visible
    expect(container.textContent).toContain('"alpha"');
    const toggle = tagsKey
      ?.closest('[data-slot="json-viewer-node"]')
      ?.querySelector('[data-slot="json-viewer-toggle"]') as HTMLButtonElement;
    fireEvent.click(toggle);
    expect(container.textContent).not.toContain('"alpha"');
  });

  it("should collapse all to root via the toolbar", () => {
    const { container } = render(<JsonViewer data={SAMPLE} />);
    const collapseAll = container.querySelector(
      '[data-slot="json-viewer-collapse-all"]',
    ) as HTMLButtonElement;
    fireEvent.click(collapseAll);
    // nested array content is hidden, but the root keys remain
    expect(container.textContent).not.toContain('"alpha"');
    expect(container.textContent).toContain('"name"');
  });

  it("should seed collapsed state from defaultExpandedDepth", () => {
    const { container } = render(
      <JsonViewer data={SAMPLE} defaultExpandedDepth={1} />,
    );
    // depth-1 containers (tags) are collapsed, so their items are hidden
    expect(container.textContent).not.toContain('"alpha"');
    expect(container.textContent).toContain('"name"');
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<JsonViewer data={SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("json-viewer");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <JsonViewer data={SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="json-viewer"]');
    expect(root?.className).toMatch(/custom-class/);
  });

  it("should render a primitive root value", () => {
    const { container } = render(<JsonViewer data={"hello"} />);
    const value = container.querySelector('[data-slot="json-viewer-value"]');
    expect(value?.textContent).toBe('"hello"');
  });
});

describe("json-viewer helpers", () => {
  it("classifies values", () => {
    expect(jsonValueKind("x")).toBe("string");
    expect(jsonValueKind(1)).toBe("number");
    expect(jsonValueKind(true)).toBe("boolean");
    expect(jsonValueKind(null)).toBe("null");
    expect(jsonValueKind([])).toBe("array");
    expect(jsonValueKind({})).toBe("object");
  });

  it("formats primitives", () => {
    expect(formatJsonPrimitive("a")).toBe('"a"');
    expect(formatJsonPrimitive("a", false)).toBe("a");
    expect(formatJsonPrimitive(3)).toBe("3");
    expect(formatJsonPrimitive(null)).toBe("null");
  });

  it("summarizes containers", () => {
    expect(jsonContainerSummary([1, 2])).toBe("2 items");
    expect(jsonContainerSummary({ a: 1 })).toBe("1 key");
  });

  it("collects expandable paths with depth", () => {
    const paths = collectExpandablePaths(SAMPLE);
    expect(paths[0]).toEqual({ path: "$", depth: 0 });
    expect(paths.some((p) => p.depth === 1)).toBe(true);
  });
});
