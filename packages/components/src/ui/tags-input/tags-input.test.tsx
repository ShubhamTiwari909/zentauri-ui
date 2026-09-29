import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TagsInput } from "./index";

describe("TagsInput", () => {
  it("adds, removes, and submits tags", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <TagsInput aria-label="Tags" name="tags" onValueChange={onValueChange} />,
    );
    const input = screen.getByRole("textbox", { name: "Tags" });
    fireEvent.change(input, { target: { value: "alpha" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(container.querySelector('input[type="hidden"]')).toHaveValue(
      "alpha",
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove alpha" }));
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });
  it("rejects duplicates and enforces the limit", () => {
    const onInvalidTag = vi.fn();
    render(
      <TagsInput
        aria-label="Tags"
        defaultValue={["alpha"]}
        maxTags={1}
        onInvalidTag={onInvalidTag}
      />,
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "ALPHA" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onInvalidTag).toHaveBeenCalledWith("ALPHA", "duplicate");
    fireEvent.change(input, { target: { value: "beta" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onInvalidTag).toHaveBeenCalledWith("beta", "limit");
  });
  it("removes the last tag with Backspace and respects disabled", () => {
    render(<TagsInput aria-label="Tags" defaultValue={["alpha", "beta"]} />);
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(screen.queryByText("beta")).not.toBeInTheDocument();
  });
  it("adds pasted tags while preserving a draft prefix", () => {
    const onValueChange = vi.fn();
    render(<TagsInput aria-label="Tags" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "pre" } });
    fireEvent.paste(input, {
      clipboardData: { getData: () => "fix,second" },
    });
    expect(onValueChange).toHaveBeenCalledWith(["prefix", "second"]);
    expect(screen.getByText("prefix")).toBeInTheDocument();
  });
  it("keeps invalid drafts available for correction", () => {
    const onInvalidTag = vi.fn();
    render(
      <TagsInput
        aria-label="Tags"
        validateTag={(tag) => tag.length >= 4}
        onInvalidTag={onInvalidTag}
      />,
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input).toHaveValue("abc");
    expect(onInvalidTag).toHaveBeenCalledWith("abc", "invalid");
  });
});
