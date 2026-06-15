import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

function renderContextMenu(onSelect = vi.fn()) {
  render(
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div data-testid="surface">Right-click row</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Row actions</ContextMenuLabel>
          <ContextMenuItem onSelect={onSelect}>Copy</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More actions</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Archive</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <button type="button">Outside</button>
    </>,
  );
}

describe("ContextMenu", () => {
  it("should open at the pointer position from a context menu event", () => {
    renderContextMenu();

    fireEvent.contextMenu(screen.getByTestId("surface"), {
      clientX: 120,
      clientY: 80,
    });

    const menu = screen.getByRole("menu");
    expect(menu).toBeVisible();
    expect(menu).toHaveStyle({ left: "120px", top: "80px" });
    expect(screen.getByText("Row actions").tagName).toBe("P");
  });

  it("should open a cloned trigger with Enter and Space", async () => {
    const user = userEvent.setup();
    renderContextMenu();

    const trigger = screen.getByTestId("surface");
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("menu")).toBeVisible();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    await user.keyboard(" ");

    expect(screen.getByRole("menu")).toBeVisible();
  });

  it("should open the fallback trigger with Enter", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right-click row</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Right-click row" });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("menu")).toBeVisible();
  });

  it("should clamp using the rendered menu dimensions", async () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      bottom: 0,
      height: 300,
      left: 0,
      right: 0,
      top: 0,
      width: 320,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 768,
    });
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 800,
    });
    renderContextMenu();

    fireEvent.contextMenu(screen.getByTestId("surface"), {
      clientX: 760,
      clientY: 740,
    });

    await waitFor(() => {
      expect(screen.getByRole("menu")).toHaveStyle({
        left: "472px",
        top: "460px",
      });
    });
  });

  it("should invoke item selection and close the menu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderContextMenu(onSelect);

    fireEvent.contextMenu(screen.getByTestId("surface"));
    await user.click(screen.getByRole("menuitem", { name: "Copy" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("should close when clicking outside", async () => {
    const user = userEvent.setup();
    renderContextMenu();

    fireEvent.contextMenu(screen.getByTestId("surface"));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("should close on Escape and return focus to the trigger", async () => {
    const user = userEvent.setup();
    renderContextMenu();

    const trigger = screen.getByTestId("surface");
    fireEvent.contextMenu(trigger);
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it("should support controlled open state", () => {
    const onOpenChange = vi.fn();
    render(
      <ContextMenu open={false} onOpenChange={onOpenChange}>
        <ContextMenuTrigger>
          <div data-testid="surface">Right-click row</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByTestId("surface"));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should keep the menu open when closeOnSelect is false", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click row</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem closeOnSelect={false}>Pin</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    await user.click(screen.getByRole("menuitem", { name: "Pin" }));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("should reveal submenu content from the sub trigger", async () => {
    const user = userEvent.setup();
    renderContextMenu();

    fireEvent.contextMenu(screen.getByTestId("surface"));
    await user.hover(screen.getByRole("menuitem", { name: "More actions" }));

    expect(screen.getByRole("menuitem", { name: "Archive" })).toBeVisible();
  });

  it("should not invoke onSelect for a disabled item and keep the menu open", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu defaultOpen>
        <ContextMenuTrigger>Right-click row</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled onSelect={onSelect}>
            Copy
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const item = screen.getByRole("menuitem", { name: "Copy" });
    expect(item).toHaveAttribute("aria-disabled", "true");

    await user.click(item);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("should mark the submenu trigger with aria-haspopup menu", () => {
    renderContextMenu();
    fireEvent.contextMenu(screen.getByTestId("surface"));
    expect(
      screen.getByRole("menuitem", { name: "More actions" }),
    ).toHaveAttribute("aria-haspopup", "menu");
  });
});
