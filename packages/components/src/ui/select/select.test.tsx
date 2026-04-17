import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

describe("Select", () => {
  it("should render the trigger as a type button control", () => {
    render(
      <Select defaultValue={["a"]}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("type", "button");
  });

  it("should show placeholder when nothing is selected", () => {
    render(
      <Select defaultValue={[]}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(
      screen.getByRole("button", { name: /pick one/i }),
    ).toBeInTheDocument();
  });

  it("should open the panel and list options when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Select defaultValue={[]}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole("button", { name: /pick/i }));
    expect(screen.getByRole("option", { name: /alpha/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /beta/i })).toBeInTheDocument();
  });

  it("should support multi-select and show comma-separated labels", async () => {
    const user = userEvent.setup();
    render(
      <Select multiple defaultValue={["a"]}>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole("button", { name: /pick/i }));
    await screen.findByRole("button", { name: /alpha/i });
    await user.click(screen.getByRole("option", { name: /beta/i }));
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveTextContent("Alpha");
    expect(trigger).toHaveTextContent("Beta");
  });

  it("should close the panel after picking one value when multiple is false", async () => {
    const user = userEvent.setup();
    render(
      <Select multiple={false} defaultValue={["a"]}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole("button"));
    await screen.findByRole("button", { name: /alpha/i });
    expect(screen.getByRole("option", { name: /beta/i })).toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: /beta/i }));
    expect(
      screen.queryByRole("option", { name: /beta/i }),
    ).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /^beta$/i }),
    ).toBeInTheDocument();
  });

  it("should mark selected options with aria-selected true", async () => {
    const user = userEvent.setup();
    render(
      <Select defaultValue={["a"]}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>,
    );
    await user.click(screen.getByRole("button"));
    const alpha = await screen.findByRole("option", { name: /alpha/i });
    const beta = screen.getByRole("option", { name: /beta/i });
    expect(alpha).toHaveAttribute("aria-selected", "true");
    expect(beta).toHaveAttribute("aria-selected", "false");
  });
});
