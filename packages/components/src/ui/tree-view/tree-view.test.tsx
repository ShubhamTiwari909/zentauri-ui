import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TreeView } from "./tree-view";
import type { TreeNode } from "./types";

const data: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [{ id: "button", label: "button.tsx" }],
      },
      { id: "index", label: "index.ts" },
    ],
  },
  { id: "readme", label: "README.md" },
  { id: "locked", label: "locked.ts", disabled: true },
];

describe("TreeView", () => {
  it("should expose displayName", () => {
    expect(TreeView.displayName).toBe("TreeView");
  });

  it("should render a tree role with collapsed branches hidden", () => {
    render(<TreeView data={data} aria-label="Files" />);
    const tree = screen.getByRole("tree", { name: "Files" });
    expect(tree).toBeTruthy();
    expect(tree.getAttribute("data-slot")).toBe("tree-view");
    // src, readme, locked are visible; nested children are not
    expect(screen.getAllByRole("treeitem")).toHaveLength(3);
    expect(screen.queryByText("index.ts")).not.toBeInTheDocument();
  });

  it("should mark parent nodes with aria-expanded and aria-level", () => {
    render(<TreeView data={data} />);
    const src = screen.getByText("src").closest('[role="treeitem"]');
    expect(src).toHaveAttribute("aria-expanded", "false");
    expect(src).toHaveAttribute("aria-level", "1");
  });

  it("should reveal children when a branch is clicked", async () => {
    const user = userEvent.setup();
    render(<TreeView data={data} />);
    await user.click(screen.getByText("src"));
    expect(
      screen.getByText("src").closest('[role="treeitem"]'),
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("index.ts")).toBeInTheDocument();
    expect(screen.getByText("components")).toBeInTheDocument();
  });

  it("should select a node and call onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TreeView data={data} onSelect={onSelect} />);
    await user.click(screen.getByText("README.md"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "readme" }),
    );
    expect(
      screen.getByText("README.md").closest('[role="treeitem"]'),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("should not select disabled nodes", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TreeView data={data} onSelect={onSelect} />);
    const locked = screen.getByText("locked.ts").closest('[role="treeitem"]')!;
    expect(locked).toHaveAttribute("aria-disabled", "true");
    await user.click(locked);
    expect(onSelect).not.toHaveBeenCalled();
    expect(locked).toHaveAttribute("aria-selected", "false");
  });

  it("should expand with ArrowRight and move into children", async () => {
    const user = userEvent.setup();
    render(<TreeView data={data} />);
    const src = screen.getByText("src").closest('[role="treeitem"]') as HTMLElement;
    src.focus();
    await user.keyboard("{ArrowRight}");
    expect(src).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement?.getAttribute("data-node-id")).toBe(
      "components",
    );
  });

  it("should collapse with ArrowLeft on an expanded branch", async () => {
    const user = userEvent.setup();
    render(<TreeView data={data} defaultExpanded={["src"]} />);
    const src = screen.getByText("src").closest('[role="treeitem"]') as HTMLElement;
    src.focus();
    await user.keyboard("{ArrowLeft}");
    expect(src).toHaveAttribute("aria-expanded", "false");
  });

  it("should support controlled expansion", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    function Controlled() {
      const [expanded, setExpanded] = useState<string[]>([]);
      return (
        <TreeView
          data={data}
          expanded={expanded}
          onExpandedChange={(ids) => {
            onExpandedChange(ids);
            setExpanded(ids);
          }}
        />
      );
    }
    render(<Controlled />);
    await user.click(screen.getByText("src"));
    expect(onExpandedChange).toHaveBeenCalledWith(["src"]);
    expect(screen.getByText("index.ts")).toBeInTheDocument();
  });

  it("should use a custom renderNode", () => {
    render(
      <TreeView
        data={data}
        renderNode={({ node }) => <span>node:{node.id}</span>}
      />,
    );
    expect(screen.getByText("node:readme")).toBeInTheDocument();
  });
});
