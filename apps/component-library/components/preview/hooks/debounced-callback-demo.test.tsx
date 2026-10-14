import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DebouncedCallbackDemo } from "./debounced-callback-demo";

describe("DebouncedCallbackDemo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps typing immediate and saves only the final draft after the pause", () => {
    render(<DebouncedCallbackDemo />);
    const input = screen.getByRole("textbox", { name: "Draft" });
    expect(screen.getByRole("button", { name: "Save now" })).toBeDisabled();
    fireEvent.change(input, { target: { value: "First" } });
    act(() => vi.advanceTimersByTime(500));
    fireEvent.change(input, { target: { value: "Final draft" } });
    expect(input).toHaveValue("Final draft");
    expect(screen.getByRole("status")).toHaveTextContent("Save scheduled");
    act(() => vi.advanceTimersByTime(599));
    expect(screen.getByText("Nothing saved yet")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(
      screen.getByText("Final draft", { selector: "dd" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Saved locally");
    expect(screen.getByRole("button", { name: "Save now" })).toBeDisabled();
  });

  it("flushes once through Save now and clears scheduled work", () => {
    const { container } = render(<DebouncedCallbackDemo />);
    fireEvent.change(screen.getByRole("textbox", { name: "Draft" }), {
      target: { value: "Save me" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save now" }));
    expect(screen.getByText("Save me", { selector: "dd" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(600));
    expect(
      container.querySelector('[data-demo="save-count"]'),
    ).toHaveTextContent("1");
  });

  it("cancels the pending save while retaining the editable draft", () => {
    render(<DebouncedCallbackDemo />);
    const input = screen.getByRole("textbox", { name: "Draft" });
    fireEvent.change(input, { target: { value: "Keep editing" } });
    fireEvent.click(
      screen.getByRole("button", { name: "Cancel pending save" }),
    );
    act(() => vi.advanceTimersByTime(600));
    expect(input).toHaveValue("Keep editing");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Pending save cancelled. Draft retained.",
    );
    expect(screen.getByText("Nothing saved yet")).toBeInTheDocument();
  });
});
