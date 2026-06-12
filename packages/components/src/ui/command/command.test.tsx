import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Command } from "./command";
import {
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandTrigger,
} from "./command-base";
import { commandContentVariants } from "./variants";

function Palette({
  open,
  onOpenChange,
  onSelectHome,
}: {
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  onSelectHome?: (value: string) => void;
} = {}) {
  return (
    <Command open={open} onOpenChange={onOpenChange}>
      <CommandTrigger>Open palette</CommandTrigger>
      <CommandContent>
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem value="home" onSelect={onSelectHome}>
              Home
            </CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="new-project">Create project</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandContent>
    </Command>
  );
}

describe("Command", () => {
  it("should open from the trigger and render a dialog", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should respect controlled open state", async () => {
    const { rerender } = render(<Palette open={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(<Palette open />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
  });

  it("should filter items as the user types", async () => {
    const user = userEvent.setup();
    render(<Palette open />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.type(screen.getByRole("combobox"), "settings");
    await waitFor(() => {
      expect(screen.getByText("Settings")).toBeVisible();
      expect(
        screen.getByText("Home").closest("[data-slot=command-item]"),
      ).toHaveAttribute("hidden");
    });
  });

  it("should show the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Palette open />);
    await user.type(screen.getByRole("combobox"), "zzzzzz");
    await waitFor(() =>
      expect(screen.getByText("No results found.")).toBeInTheDocument(),
    );
  });

  it("should select the active item with arrow keys and Enter", async () => {
    const user = userEvent.setup();
    const onSelectHome = vi.fn();
    render(<Palette open onSelectHome={onSelectHome} />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{Enter}");
    expect(onSelectHome).toHaveBeenCalledWith("home");
  });

  it("should close when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Palette open onOpenChange={onOpenChange} />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await user.keyboard("{Escape}");
    await waitFor(() => expect(onOpenChange).toHaveBeenLastCalledWith(false));
  });

  it("should render group headings and a separator", async () => {
    render(<Palette open />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="command-separator"]'),
    ).toBeTruthy();
  });
});

describe("Command appearance variants", () => {
  it("uses surface-backed backgrounds for light color appearances", () => {
    expect(commandContentVariants({ appearance: "sky" })).toContain(
      "var(--zui-surface-muted,#ffffff)",
    );
    expect(commandContentVariants({ appearance: "red" })).toContain(
      "var(--zui-surface-muted,#ffffff)",
    );
    expect(commandContentVariants({ appearance: "red" })).not.toContain(
      "color-mix",
    );
  });
});
