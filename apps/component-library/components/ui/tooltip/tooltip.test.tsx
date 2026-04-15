import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

describe("Tooltip", () => {
  it("should show tooltip content after pointer hover with zero delay", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>
          <button type="button">Target</button>
        </TooltipTrigger>
        <TooltipContent>Helpful hint</TooltipContent>
      </Tooltip>,
    );
    await user.hover(screen.getByRole("button", { name: "Target" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful hint");
  });

  it("should hide tooltip content when pointer leaves the trigger", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>
          <button type="button">Target</button>
        </TooltipTrigger>
        <TooltipContent>Hint</TooltipContent>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Target" });
    await user.hover(trigger);
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("should open on focus and close on blur", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>
          <button type="button">Focus me</button>
        </TooltipTrigger>
        <TooltipContent>Keyboard tip</TooltipContent>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Focus me" });
    await user.click(trigger);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Keyboard tip");
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("should close on Escape while the trigger is focused", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>
          <button type="button">Trap</button>
        </TooltipTrigger>
        <TooltipContent>Press Esc</TooltipContent>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Trap" });
    trigger.focus();
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });
});
