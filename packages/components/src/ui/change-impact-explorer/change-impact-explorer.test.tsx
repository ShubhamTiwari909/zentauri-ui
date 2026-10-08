import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  ChangeImpactExplorer,
  analyzeChangeImpact,
  buildChangeImpactGraph,
  getChangeImpactPath,
} from "./index";
import type {
  ChangeImpactExplorerProps,
  ChangeImpactNode,
  ChangeImpactEdge,
} from "./types";
import { zuiChangeImpactExplorerAppearances } from "../../design-system/change-impact-explorer";

const nodes: ChangeImpactNode[] = [
  {
    id: "a",
    label: "API schema",
    category: "Contract",
    priority: "high",
    description: "Public field",
    metadata: 0,
  },
  { id: "b", label: "Billing service", category: "Service" },
  { id: "c", label: "Client SDK", category: "Integration" },
  { id: "d", label: "Dashboard", category: "Application" },
  { id: "e", label: "Unrelated docs" },
];
const edges: ChangeImpactEdge[] = [
  { id: "ab", source: "a", target: "b", reason: "Reads schema" },
  { id: "ac", source: "a", target: "c", reason: "Generates client" },
  { id: "bd", source: "b", target: "d", reason: "Displays billing" },
  { id: "cd", source: "c", target: "d", reason: "Imports client" },
  { id: "da", source: "d", target: "a", reason: "Cycle" },
];
const changes = [
  {
    id: "rename",
    label: "Rename field",
    description: 0,
    nodeIds: ["a"],
    comparisons: [{ nodeId: "a", before: 0, after: "account_id" }],
  },
  { id: "docs", label: "Update docs", nodeIds: ["e"] },
];
function Example(props: Partial<ChangeImpactExplorerProps>) {
  return (
    <ChangeImpactExplorer
      nodes={nodes}
      edges={edges}
      changes={changes}
      {...props}
    />
  );
}
const details = () =>
  within(screen.getByRole("region", { name: "Item details" }));

describe("Change Impact graph", () => {
  it("deduplicates cyclic and diamond paths, preserving one shortest explanation", () => {
    const graph = buildChangeImpactGraph(nodes, edges);
    const result = analyzeChangeImpact(graph, ["a", "a"]);
    expect(result.entries.map((entry) => [entry.node.id, entry.depth])).toEqual(
      [
        ["a", 0],
        ["b", 1],
        ["c", 1],
        ["d", 2],
      ],
    );
    expect(
      getChangeImpactPath(result, "d").map((step) => step.node.id),
    ).toEqual(["a", "b", "d"]);
    expect(getChangeImpactPath(result, "d")[2]?.via?.reason).toBe(
      "Displays billing",
    );
    expect(getChangeImpactPath(result, "e")).toEqual([]);
  });
  it("indexes incoming dependencies for reverse traversal", () => {
    const result = analyzeChangeImpact(
      buildChangeImpactGraph(nodes, edges.slice(0, 4)),
      ["d"],
      { direction: "upstream" },
    );
    expect(result.entries.map((entry) => entry.node.id)).toEqual([
      "d",
      "b",
      "c",
      "a",
    ]);
    expect(
      getChangeImpactPath(result, "a").map((step) => step.node.id),
    ).toEqual(["d", "b", "a"]);
  });
  it("keeps all sources at depth zero and chooses shortest paths across sources", () => {
    const result = analyzeChangeImpact(buildChangeImpactGraph(nodes, edges), [
      "a",
      "d",
    ]);
    expect(result.entries.map((entry) => entry.node.id)).toEqual([
      "a",
      "d",
      "b",
      "c",
    ]);
    expect(result.byId.get("d")?.kind).toBe("changed");
    expect(getChangeImpactPath(result, "d")).toHaveLength(1);
  });
  it("reports missing seeds and dangling dependencies without inventing impact", () => {
    const graph = buildChangeImpactGraph(nodes, [
      ...edges,
      { id: "missing", source: "a", target: "missing" },
    ]);
    const result = analyzeChangeImpact(graph, ["missing", "missing"]);
    expect(result.ignoredNodeIds).toEqual(["missing"]);
    expect(graph.danglingEdges).toHaveLength(1);
    expect(result.entries).toEqual([]);
  });
  it.each([0, 1, -1, NaN])("bounds traversal at depth %s", (maxDepth) => {
    const result = analyzeChangeImpact(
      buildChangeImpactGraph(nodes, edges),
      ["a"],
      { maxDepth },
    );
    expect(result.truncated).toBe(true);
    expect(
      result.entries.every(
        (entry) =>
          entry.depth! <=
          (Number.isFinite(maxDepth) ? Math.max(0, maxDepth) : 0),
      ),
    ).toBe(true);
  });
  it("does not report truncation for cycles already visited or exhausted leaf nodes", () => {
    const graph = buildChangeImpactGraph(nodes, edges);
    expect(
      analyzeChangeImpact(graph, ["a", "b", "c", "d"], { maxDepth: 0 })
        .truncated,
    ).toBe(false);
    expect(analyzeChangeImpact(graph, ["e"], { maxDepth: 0 }).truncated).toBe(
      false,
    );
  });
  it.each(["node", "edge"])("rejects duplicate %s IDs", (kind) => {
    expect(() =>
      buildChangeImpactGraph(
        kind === "node" ? [...nodes, nodes[0]!] : nodes,
        kind === "edge" ? [...edges, edges[0]!] : edges,
      ),
    ).toThrow(/duplicate or empty/);
  });
  it("handles a 10,000-node chain iteratively with paths created on demand", () => {
    const large = Array.from({ length: 10_000 }, (_, i) => ({
      id: String(i),
      label: `Item ${i}`,
    }));
    const links = large.slice(1).map((node, i) => ({
      id: String(i),
      source: String(i),
      target: node.id,
    }));
    const result = analyzeChangeImpact(buildChangeImpactGraph(large, links), [
      "0",
    ]);
    expect(result.entries).toHaveLength(10_000);
    expect(result.byId.get("9999")?.depth).toBe(9999);
    expect(getChangeImpactPath(result, "9999")).toHaveLength(10_000);
  });
});

describe("Change Impact Explorer", () => {
  it("shows summaries, zero-valued comparisons, metadata, and the selected item", () => {
    const { container } = render(<Example />);
    expect(
      screen.getByRole("combobox", { name: "Proposed change" }),
    ).toHaveValue("rename");
    expect(
      screen
        .getAllByRole("option", { selected: true })
        .some((item) => item.textContent?.includes("API schema")),
    ).toBe(true);
    expect(
      container.querySelector('[data-slot="change-impact-explorer-before"]'),
    ).toHaveTextContent("0");
    expect(details().getByText("Public field")).toBeInTheDocument();
  });
  it.each(Object.keys(zuiChangeImpactExplorerAppearances))(
    "supports the %s appearance",
    (appearance) => {
      const { container } = render(
        <Example
          appearance={appearance as ChangeImpactExplorerProps["appearance"]}
        />,
      );
      expect(container.firstChild).toHaveAttribute(
        "data-slot",
        "change-impact-explorer",
      );
      expect((container.firstChild as HTMLElement).className).toContain(
        `--zui-change-impact-explorer-${appearance}-`,
      );
    },
  );
  it.each(["sm", "md", "lg"] as const)("supports the %s size", (size) => {
    const { container } = render(<Example size={size} />);
    expect((container.firstChild as HTMLElement).className).toContain(
      `font-size-${size}`,
    );
  });
  it("moves through results with arrows, Home/End, and typeahead", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const list = screen.getByRole("listbox", { name: "Impact results" });
    list.focus();
    await user.keyboard("{ArrowDown}");
    expect(
      details().getByRole("heading", { name: "Billing service" }),
    ).toBeInTheDocument();
    await user.keyboard("{End}");
    expect(
      details().getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(details().getByText("Displays billing")).toBeInTheDocument();
    await user.keyboard("{Home}c");
    expect(
      details().getByRole("heading", { name: "Client SDK" }),
    ).toBeInTheDocument();
    expect(list).toHaveFocus();
    expect(
      document.getElementById(list.getAttribute("aria-activedescendant")!),
    ).toBeInTheDocument();
  });
  it("resynchronizes keyboard navigation when controlled selection changes externally", () => {
    const select = vi.fn();
    const { rerender } = render(
      <Example selectedNodeId="a" onSelectedNodeIdChange={select} />,
    );
    const list = screen.getByRole("listbox");
    fireEvent.keyDown(list, { key: "End" });
    expect(select).toHaveBeenLastCalledWith("d", nodes[3]);
    rerender(<Example selectedNodeId="b" onSelectedNodeIdChange={select} />);
    expect(
      document.getElementById(list.getAttribute("aria-activedescendant")!),
    ).toHaveAttribute("aria-label", "Billing service, Direct");
    fireEvent.keyDown(list, { key: "ArrowUp" });
    expect(select).toHaveBeenLastCalledWith("a", nodes[0]);
  });
  it("keeps off-screen selections visible in lists below the virtualization threshold", () => {
    const items = Array.from({ length: 50 }, (_, index) => ({
      id: String(index),
      label: `Item ${index}`,
    }));
    render(
      <ChangeImpactExplorer
        nodes={items}
        edges={[]}
        changes={[
          {
            id: "all",
            label: "Review all",
            nodeIds: items.map((item) => item.id),
          },
        ]}
        showMap={false}
        listHeight={128}
      />,
    );
    const list = screen.getByRole("listbox");
    Object.defineProperty(list, "clientHeight", {
      configurable: true,
      value: 128,
    });
    expect(list).not.toHaveAttribute("data-virtualized");
    fireEvent.keyDown(list, { key: "End" });
    expect(list.scrollTop).toBe(50 * 64 - 128);
    expect(
      within(list).getByRole("option", { name: "Item 49, Changed" }),
    ).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(list, { key: "Home" });
    expect(list.scrollTop).toBe(0);
  });
  it("filters results by name, category, or priority without discarding selected details", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.type(screen.getByRole("searchbox"), "Service");
    const list = screen.getByRole("listbox");
    expect(within(list).getAllByRole("option")).toHaveLength(1);
    expect(
      details().getByRole("heading", { name: "API schema" }),
    ).toBeInTheDocument();
    await user.clear(screen.getByRole("searchbox"));
    await user.type(screen.getByRole("searchbox"), "missing");
    expect(screen.getByText("No items match your search.")).toBeInTheDocument();
  });
  it("selects map cards and calls the selection callback", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(<Example onSelectedNodeIdChange={change} />);
    await user.click(screen.getByRole("button", { name: /Dashboard/ }));
    expect(change).toHaveBeenCalledWith("d", nodes[3]);
    expect(details().getByText("Displays billing")).toBeInTheDocument();
  });
  it("supports controlled selection, proposal, and query callbacks", () => {
    const select = vi.fn(),
      change = vi.fn(),
      query = vi.fn();
    render(
      <Example
        selectedNodeId="a"
        changeId="rename"
        query=""
        onSelectedNodeIdChange={select}
        onChangeIdChange={change}
        onQueryChange={query}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /^Billing service/ }));
    expect(select).toHaveBeenCalledWith("b", nodes[1]);
    expect(
      details().getByRole("heading", { name: "API schema" }),
    ).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "docs" },
    });
    expect(change).toHaveBeenCalledWith("docs");
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "SDK" },
    });
    expect(query).toHaveBeenCalledWith("SDK");
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });
  it("switches proposals and restores a meaningful default selection", () => {
    render(<Example />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "docs" },
    });
    expect(
      details().getByRole("heading", { name: "Unrelated docs" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("listbox").querySelectorAll('[role="option"]'),
    ).toHaveLength(1);
  });
  it("exposes outside-analysis nodes without claiming a path exists", () => {
    render(<Example showOutsideAnalysis maxDepth={0} />);
    fireEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: /Dashboard/,
      }),
    );
    expect(
      details().getByText("No dependency path was found within this analysis."),
    ).toBeInTheDocument();
    expect(screen.getByText(/Depth limit reached/)).toBeInTheDocument();
  });
  it("provides lazy detail rendering and noninteractive custom node content", () => {
    render(
      <Example
        renderNode={(entry) => <span>Node: {entry.node.label}</span>}
        renderDetails={(context) => (
          <p>
            {context.path.length} path steps for {context.node.label}
          </p>
        )}
      />,
    );
    expect(screen.getByText("1 path steps for API schema")).toBeInTheDocument();
    expect(screen.getAllByText("Node: API schema")).toHaveLength(2);
  });
  it.each(["loading", "error", "empty"])("renders the %s state", (state) => {
    render(
      <Example
        loading={state === "loading"}
        error={state === "error" ? 0 : undefined}
        nodes={state === "empty" ? [] : nodes}
        emptyContent="No graph yet"
      />,
    );
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(
      state === "loading"
        ? screen.getByRole("status")
        : state === "error"
          ? screen.getByRole("alert")
          : screen.getByText("No graph yet"),
    ).toBeInTheDocument();
  });
  it("keeps IDs unique across instances and forwards root props/ref", () => {
    const ref = vi.fn();
    const { container } = render(
      <>
        <Example
          ref={ref}
          className="custom"
          dir="rtl"
          aria-label="Release impact"
        />
        <Example />
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(screen.getByRole("region", { name: "Release impact" })).toHaveClass(
      "custom",
    );
    expect(ref).toHaveBeenCalled();
  });
  it("bounds map and result DOM for 10,000 impacted nodes and reaches the last row by keyboard", async () => {
    const large = Array.from({ length: 10_000 }, (_, i) => ({
      id: String(i),
      label: `Item ${i}`,
    }));
    const links = large
      .slice(1)
      .map((node) => ({ id: node.id, source: "0", target: node.id }));
    const user = userEvent.setup();
    const { container } = render(
      <Example
        nodes={large}
        edges={links}
        changes={[{ id: "large", label: "Large graph", nodeIds: ["0"] }]}
        mapNodeLimit={12}
      />,
    );
    expect(
      container.querySelectorAll(
        '[data-slot="change-impact-explorer-map-node"]',
      ),
    ).toHaveLength(12);
    expect(screen.getAllByRole("option").length).toBeLessThan(30);
    const list = screen.getByRole("listbox");
    list.focus();
    await user.keyboard("{End}");
    expect(
      details().getByRole("heading", { name: "Item 9999" }),
    ).toBeInTheDocument();
    expect(
      within(list).getByRole("option", { name: /Item 9999,/ }),
    ).toHaveAttribute("aria-posinset", "10000");
    expect(
      document.getElementById(list.getAttribute("aria-activedescendant")!),
    ).toBeInTheDocument();
  });
});
