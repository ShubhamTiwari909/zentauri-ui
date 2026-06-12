import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TokenPlayground } from "./token-playground";

describe("TokenPlayground", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders the default preset and CSS variable output", () => {
    render(<TokenPlayground />);

    expect(screen.getByText("Ocean")).toBeInTheDocument();
    expect(screen.getByText("--zui-brand: #0ea5e9;")).toBeInTheDocument();
    expect(screen.getByText("--zui-brand-dark: #7dd3fc;")).toBeInTheDocument();
  });

  it("renders the expanded color preset options", () => {
    render(<TokenPlayground />);

    ["Sapphire", "Amber", "Plum", "Graphite"].forEach((presetName) => {
      expect(
        screen.getByRole("button", { name: `Select ${presetName}` }),
      ).toBeInTheDocument();
    });
  });

  it("updates the preview and copied CSS when a preset is selected", () => {
    render(<TokenPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Select Emerald" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS variables" }));

    expect(screen.getByText("--zui-brand: #059669;")).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("--zui-brand: #059669;"),
    );
  });

  it("renders token previews for the expanded component set", () => {
    render(<TokenPlayground />);

    [
      "Buttons",
      "Badge",
      "Avatar",
      "Checkbox",
      "Radio group",
      "Dropdown",
      "Kbd",
      "Progress",
      "Rating",
      "Skeleton",
      "Toast",
      "Toggle",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.queryByText("Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Spinner")).not.toBeInTheDocument();
  });

  it("uses the token palette for the rating preview", () => {
    const { container } = render(<TokenPlayground />);
    const ratingFill = container.querySelector(
      '[data-slot="rating-icon-fill"]',
    );
    const ratingClassName = ratingFill?.getAttribute("class") ?? "";

    expect(ratingClassName).toContain("--zui-rating-default-active");
    expect(ratingClassName).not.toContain("--zui-rating-amber-active");
  });
});
