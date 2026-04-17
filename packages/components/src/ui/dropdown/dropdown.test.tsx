import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "./dropdown";

describe("Dropdown", () => {
  it("should show menu content when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="a">Alpha</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByText("Alpha")).toBeVisible();
  });

  it("should close the menu after selecting an item when multiSelect is false", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="a">Alpha</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );
    await user.click(screen.getByText("Alpha"));
    await waitFor(() => {
      expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    });
  });

  it("should keep the menu open after selecting when multiSelect is true", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown defaultOpen multiSelect>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="a">Alpha</DropdownItem>
          <DropdownItem value="b">Beta</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );
    await user.click(screen.getByText("Alpha"));
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("should invoke onSelect when an item is picked", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="a" onSelect={handleSelect}>
            Alpha
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );
    await user.click(screen.getByText("Alpha"));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("should close when clicking outside the menu", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown defaultOpen>
          <DropdownTrigger>Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownItem value="a">Alpha</DropdownItem>
          </DropdownContent>
        </Dropdown>
        <button type="button">Outside</button>
      </div>,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => {
      expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    });
  });

  it("should activate an item with Enter while focused", () => {
    const handleSelect = vi.fn();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="a" onSelect={handleSelect}>
            Alpha
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );
    const item = screen
      .getByText("Alpha")
      .closest('div[tabindex="0"]') as HTMLElement;
    item.focus();
    fireEvent.keyDown(item, { key: "Enter" });
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
