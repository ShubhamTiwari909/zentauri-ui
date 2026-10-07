import type { ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResizablePanelsPlayground } from "./resizable-panels-playground";

vi.mock("@/components/code-showcase/PreviewCodeShowcase", () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
const handle = () =>
  screen.getByRole("separator", { name: "Navigation resize handle" });
const size = () => Number(handle().getAttribute("aria-valuenow"));

describe("Resizable Panels playground", () => {
  it("accepts full number drafts and commits bounds on blur or Enter", () => {
    render(<ResizablePanelsPlayground />);
    const min = screen.getByRole("spinbutton", {
      name: "Navigation minimum (%)",
    });
    const max = screen.getByRole("spinbutton", {
      name: "Navigation maximum (%)",
    });
    fireEvent.change(min, { target: { value: "1" } });
    fireEvent.change(min, { target: { value: "15" } });
    expect(min).toHaveValue(15);
    expect(handle()).toHaveAttribute("aria-valuemin", "0");
    expect(handle().previousElementSibling).toHaveAttribute(
      "data-min-size",
      "20",
    );
    fireEvent.blur(min);
    expect(handle().previousElementSibling).toHaveAttribute(
      "data-min-size",
      "15",
    );
    max.focus();
    fireEvent.change(max, { target: { value: "7" } });
    fireEvent.change(max, { target: { value: "75" } });
    expect(handle()).toHaveAttribute("aria-valuemax", "80");
    fireEvent.keyDown(max, { key: "Enter" });
    expect(handle()).toHaveAttribute("aria-valuemax", "75");
    fireEvent.change(min, { target: { value: "99" } });
    fireEvent.blur(min);
    expect(min).toHaveValue(45);
    expect(size()).toBe(45);
    fireEvent.change(min, { target: { value: "" } });
    fireEvent.blur(min);
    expect(min).toHaveValue(45);
  });
  it("shares the previous expanded size between button and keyboard restoration", () => {
    render(<ResizablePanelsPlayground />);
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(37);
    fireEvent.click(
      screen.getByRole("button", { name: "Collapse navigation" }),
    );
    expect(size()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Restore navigation" }));
    expect(size()).toBe(37);
    fireEvent.click(
      screen.getByRole("button", { name: "Collapse navigation" }),
    );
    fireEvent.keyDown(handle(), { key: "Enter" });
    expect(size()).toBe(37);
    fireEvent.keyDown(handle(), { key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: "Restore navigation" }));
    expect(size()).toBe(37);
  });
  it("resets drafts, limits, and remembered sizes together", () => {
    render(<ResizablePanelsPlayground />);
    const min = screen.getByRole("spinbutton", {
      name: "Navigation minimum (%)",
    });
    fireEvent.change(min, { target: { value: "40" } });
    fireEvent.blur(min);
    fireEvent.click(
      screen.getByRole("button", { name: "Collapse navigation" }),
    );
    fireEvent.change(min, { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(min).toHaveValue(20);
    expect(size()).toBe(35);
    fireEvent.click(
      screen.getByRole("button", { name: "Collapse navigation" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Restore navigation" }));
    expect(size()).toBe(35);
  });
});
