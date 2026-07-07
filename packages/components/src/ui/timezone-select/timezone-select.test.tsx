import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TimezoneSelect } from "./index";

describe("TimezoneSelect", () => {
  it("renders with placeholder text", () => {
    render(<TimezoneSelect placeholder="Pick a zone..." />);
    expect(screen.getByText("Pick a zone...")).toBeInTheDocument();
  });

  it("opens dropdown on trigger button click", () => {
    render(<TimezoneSelect />);
    const trigger = screen.getByText("Search timezone...");
    fireEvent.click(trigger);
    const dropdown = document.querySelector(
      "[data-slot='timezone-select-dropdown']",
    );
    expect(dropdown).toBeInTheDocument();
  });

  it("closes dropdown on second trigger click", () => {
    render(<TimezoneSelect />);
    const trigger = screen.getByText("Search timezone...");
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    const dropdown = document.querySelector(
      "[data-slot='timezone-select-dropdown']",
    );
    expect(dropdown).not.toBeInTheDocument();
  });

  it("renders disabled state", () => {
    render(<TimezoneSelect disabled />);
    const root = document.querySelector("[data-slot='timezone-select']");
    expect(root).toHaveAttribute("tabindex", "-1");
  });

  it("has data-slot attribute", () => {
    render(<TimezoneSelect />);
    const root = document.querySelector("[data-slot='timezone-select']");
    expect(root).toBeInTheDocument();
  });

  it("accepts className", () => {
    render(<TimezoneSelect className="custom-class" />);
    const root = document.querySelector("[data-slot='timezone-select']");
    expect(root?.className).toContain("custom-class");
  });
});
