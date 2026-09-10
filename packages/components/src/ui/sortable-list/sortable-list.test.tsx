import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SortableList } from "./sortable-list";

const items = ["Alpha", "Beta", "Gamma"];

describe("SortableList", () => {
  it("renders items and exposes slots", () => {
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        label="Tasks"
      />,
    );
    expect(screen.getByRole("list", { name: "Tasks" })).toHaveAttribute(
      "data-slot",
      "sortable-list",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("moves items with accessible controls", () => {
    const onItemsChange = vi.fn();
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        onItemsChange={onItemsChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Move item 2 up" }));
    expect(onItemsChange).toHaveBeenCalledWith(["Beta", "Alpha", "Gamma"]);
  });

  it("forwards className and supports native dragging", () => {
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        className="custom-list"
      />,
    );
    expect(screen.getByRole("list")).toHaveClass("custom-list");
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute(
      "draggable",
      "true",
    );
  });
});
