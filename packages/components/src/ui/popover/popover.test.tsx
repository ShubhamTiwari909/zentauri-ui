import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { popoverContentVariants } from "./variants";

describe("Popover", () => {
  it("should open and close popover content from the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>
          <button type="button">Open panel</button>
        </PopoverTrigger>
        <PopoverContent>Interactive panel</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Open panel" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toHaveTextContent("Interactive panel");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close when clicking outside the popover", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button">Open panel</button>
          </PopoverTrigger>
          <PopoverContent>Panel body</PopoverContent>
        </Popover>
        <button type="button">Outside</button>
      </>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should close on Escape and return focus to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button type="button">Focus trigger</button>
        </PopoverTrigger>
        <PopoverContent>Escape closes me</PopoverContent>
      </Popover>,
    );

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: "Focus trigger" })).toHaveFocus();
  });

  it("should support controlled open state", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Popover open={false} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <button type="button">Controlled</button>
        </PopoverTrigger>
        <PopoverContent>Controlled body</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Controlled" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Popover appearance variants", () => {
  it("uses opaque surface backgrounds for color variants", () => {
    expect(popoverContentVariants({ variant: "indigo" })).toContain(
      "--zui-popover-indigo-bg,var(--zui-surface-muted,#ffffff)",
    );
    expect(popoverContentVariants({ variant: "purple" })).toContain(
      "--zui-popover-purple-bg,var(--zui-surface-muted,#ffffff)",
    );
    expect(popoverContentVariants({ variant: "indigo" })).not.toContain(
      "transparent",
    );
  });
});
