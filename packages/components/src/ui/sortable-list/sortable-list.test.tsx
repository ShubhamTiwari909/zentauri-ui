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

  it("reorders through the native drag lifecycle", () => {
    // The button path was covered, but drag-to-reorder is the headline
    // behaviour and could regress with the suite still green.
    const onItemsChange = vi.fn();
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        onItemsChange={onItemsChange}
      />,
    );

    const [first, , third] = screen.getAllByRole("listitem");
    fireEvent.dragStart(first as HTMLElement);
    expect(first).toHaveAttribute("aria-grabbed", "true");

    fireEvent.dragOver(third as HTMLElement);
    fireEvent.dragEnd(third as HTMLElement);

    expect(onItemsChange).toHaveBeenLastCalledWith(["Beta", "Gamma", "Alpha"]);
    // textContent also carries the drag handle and the move buttons, so match
    // the rendered label rather than the whole row.
    expect(
      screen
        .getAllByRole("listitem")
        .map((item) => item.textContent?.replace(/[⋮↑↓]/g, "")),
    ).toEqual(["Beta", "Gamma", "Alpha"]);
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute(
      "aria-grabbed",
      "false",
    );
  });

  it("reorders from the keyboard even without the move buttons", () => {
    // Native drag-and-drop is pointer-only, so hiding the buttons would
    // otherwise leave keyboard users with no way to reorder at all.
    const onItemsChange = vi.fn();
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        onItemsChange={onItemsChange}
        showMoveButtons={false}
      />,
    );

    expect(screen.queryByRole("button", { name: /move item/i })).toBeNull();

    const [, second] = screen.getAllByRole("listitem");
    expect(second).toHaveAttribute("tabindex", "0");

    fireEvent.keyDown(second as HTMLElement, { key: "ArrowUp", altKey: true });

    expect(onItemsChange).toHaveBeenCalledWith(["Beta", "Alpha", "Gamma"]);
  });

  it("ignores unmodified arrow keys so the list stays scrollable", () => {
    const onItemsChange = vi.fn();
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        onItemsChange={onItemsChange}
      />,
    );

    const [, second] = screen.getAllByRole("listitem");
    fireEvent.keyDown(second as HTMLElement, { key: "ArrowUp" });

    expect(onItemsChange).not.toHaveBeenCalled();
  });

  it("moves an item whose value is undefined", () => {
    // Regression: the reorder used the spliced value as its failure sentinel,
    // so a legitimately `undefined` item could never be moved.
    const onItemsChange = vi.fn();
    const sparse: (string | undefined)[] = ["Alpha", undefined, "Gamma"];
    render(
      <SortableList
        items={sparse}
        getItemId={(_item, index) => `item-${index}`}
        renderItem={(item) => item ?? "(empty)"}
        onItemsChange={onItemsChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Move item 2 up" }));

    expect(onItemsChange).toHaveBeenCalledWith([undefined, "Alpha", "Gamma"]);
  });

  it("does not reorder when disabled", () => {
    const onItemsChange = vi.fn();
    render(
      <SortableList
        items={items}
        getItemId={(item) => item}
        renderItem={(item) => item}
        onItemsChange={onItemsChange}
        disabled
      />,
    );

    const [, second] = screen.getAllByRole("listitem");
    expect(second).toHaveAttribute("tabindex", "-1");
    fireEvent.keyDown(second as HTMLElement, { key: "ArrowUp", altKey: true });
    fireEvent.dragStart(second as HTMLElement);
    fireEvent.dragOver(screen.getAllByRole("listitem")[0] as HTMLElement);

    expect(onItemsChange).not.toHaveBeenCalled();
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
