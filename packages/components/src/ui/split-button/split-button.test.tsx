import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SplitButton } from "./split-button";

const items = [
  { id: "save-as", label: "Save As", onSelect: vi.fn() },
  { id: "export", label: "Export", onSelect: vi.fn() },
];

describe("SplitButton", () => {
  it("should render the primary label and menu trigger", () => {
    render(<SplitButton label="Save" items={items} />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /more save actions/i }),
    ).toHaveAttribute("aria-haspopup", "menu");
  });

  it("should call onClick from the primary button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SplitButton label="Save" items={items} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should open the menu and call an item onSelect", async () => {
    const user = userEvent.setup();
    const handleExport = vi.fn();
    render(
      <SplitButton
        label="Save"
        items={[
          { id: "save-as", label: "Save As" },
          { id: "export", label: "Export", onSelect: handleExport },
        ]}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /more save actions/i }),
    );
    await user.click(await screen.findByRole("menuitem", { name: "Export" }));

    expect(handleExport).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole("menuitem", { name: "Export" })).toBeNull();
    });
  });

  it("should not open or call actions while disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <SplitButton
        disabled
        label="Save"
        items={[{ id: "export", label: "Export" }]}
        onClick={onClick}
      />,
    );

    const [primary, trigger] = screen.getAllByRole("button");

    expect(primary).toBeDisabled();
    expect(trigger).toBeDisabled();
    await user.click(primary);
    await user.click(trigger);

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("should show a spinner and disable both buttons while loading", async () => {
    const user = userEvent.setup();
    render(
      <SplitButton
        loading
        label="Saving"
        items={[{ id: "export", label: "Export" }]}
      />,
    );

    expect(
      screen.getByRole("status", { name: /loading/i }),
    ).toBeInTheDocument();
    for (const button of screen.getAllByRole("button")) {
      expect(button).toBeDisabled();
    }

    await user.click(
      screen.getByRole("button", { name: /more saving actions/i }),
    );
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("should support controlled open state", () => {
    const onOpenChange = vi.fn();
    render(
      <SplitButton
        open
        onOpenChange={onOpenChange}
        label="Save"
        items={[{ id: "export", label: "Export" }]}
      />,
    );

    expect(screen.getByRole("menuitem", { name: "Export" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: /more save actions/i }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("should render start and item icons", async () => {
    const user = userEvent.setup();
    render(
      <SplitButton
        label="Save"
        startIcon={<span data-testid="start-icon" />}
        items={[
          {
            id: "export",
            label: "Export",
            icon: <span data-testid="item-icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /more save actions/i }),
    );
    expect(screen.getByTestId("item-icon")).toBeInTheDocument();
  });

  it("should apply variant aliases and fullWidth layout", () => {
    render(
      <SplitButton
        fullWidth
        label="Save"
        variant="danger"
        items={[{ id: "export", label: "Export" }]}
      />,
    );

    expect(document.querySelector('[data-slot="split-button"]')).toHaveClass(
      "w-full",
    );
    expect(screen.getByRole("button", { name: "Save" }).className).toMatch(
      /--zui-button-destructive-bg/,
    );
  });

  it("should forward ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<SplitButton ref={ref} label="Save" items={items} />);

    expect(ref.current?.getAttribute("data-slot")).toBe("split-button");
  });

  it("should open the menu on hover and close on mouse leave when triggerOn is hover", async () => {
    const user = userEvent.setup();
    render(
      <SplitButton
        triggerOn="hover"
        label="Save"
        items={[{ id: "export", label: "Export" }]}
      />,
    );

    const trigger = screen.getByRole("button", { name: /more save actions/i });
    await user.hover(trigger);
    expect(
      await screen.findByRole("menuitem", { name: "Export" }),
    ).toBeVisible();

    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByRole("menuitem", { name: "Export" })).toBeNull();
    });
  });

  it("should not open on hover when disabled with triggerOn hover", async () => {
    const user = userEvent.setup();
    render(
      <SplitButton
        triggerOn="hover"
        disabled
        label="Save"
        items={[{ id: "export", label: "Export" }]}
      />,
    );

    await user.hover(
      screen.getByRole("button", { name: /more save actions/i }),
    );
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
