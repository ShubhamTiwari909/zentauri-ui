import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ImageCompare } from "./image-compare";

const media = {
  before: <img src="before.jpg" alt="Before scene" />,
  after: <img src="after.jpg" alt="After scene" />,
};

function mockBounds(element: HTMLDivElement, left = 0, width = 100) {
  element.setPointerCapture = vi.fn();
  element.releasePointerCapture = vi.fn();
  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    left,
    width,
    right: left + width,
    top: 0,
    bottom: 100,
    height: 100,
    x: left,
    y: 0,
    toJSON: () => ({}),
  });
}

describe("ImageCompare", () => {
  it("exposes displayName", () => {
    expect(ImageCompare.displayName).toBe("ImageCompare");
  });

  it("renders both media layers and slot markers", () => {
    render(<ImageCompare {...media} />);
    expect(screen.getByAltText("Before scene")).toBeInTheDocument();
    expect(screen.getByAltText("After scene")).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="image-compare"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="image-compare-before"]'),
    ).toBeInTheDocument();
  });

  it("uses a 50 percent default position", () => {
    render(<ImageCompare {...media} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
  });

  it("clamps initial positions", () => {
    render(<ImageCompare {...media} defaultPosition={140} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "100");
  });

  it("supports keyboard changes using the configured step", () => {
    const onPositionChange = vi.fn();
    render(
      <ImageCompare
        {...media}
        defaultPosition={40}
        step={5}
        onPositionChange={onPositionChange}
      />,
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "45");
    expect(onPositionChange).toHaveBeenLastCalledWith(45);

    fireEvent.keyDown(slider, { key: "End" });
    expect(slider).toHaveAttribute("aria-valuenow", "100");
  });

  it("updates from pointer position", () => {
    const onPositionChange = vi.fn();
    const { container } = render(
      <ImageCompare {...media} onPositionChange={onPositionChange} />,
    );
    const root = container.firstElementChild as HTMLDivElement;
    mockBounds(root, 10, 200);

    const allowedDefault = fireEvent.pointerDown(root, {
      clientX: 160,
      pointerId: 1,
      pointerType: "mouse",
      button: 0,
    });
    expect(allowedDefault).toBe(false);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
    expect(screen.getByRole("slider")).toHaveFocus();
    expect(onPositionChange).toHaveBeenLastCalledWith(75);
  });

  it("keeps the original pointer active when another touch starts", () => {
    const onPositionChange = vi.fn();
    const { container } = render(
      <ImageCompare {...media} onPositionChange={onPositionChange} />,
    );
    const root = container.firstElementChild as HTMLDivElement;
    mockBounds(root);

    fireEvent.pointerDown(root, {
      clientX: 20,
      pointerId: 1,
      pointerType: "touch",
    });
    fireEvent.pointerDown(root, {
      clientX: 80,
      pointerId: 2,
      pointerType: "touch",
    });
    fireEvent.pointerMove(root, {
      clientX: 40,
      pointerId: 1,
      pointerType: "touch",
    });

    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "40");
    expect(onPositionChange.mock.calls.map(([value]) => value)).toEqual([
      20, 40,
    ]);
  });

  it("uses the position CSS variable for clipping and divider placement", () => {
    render(<ImageCompare {...media} position={35} />);
    const root = document.querySelector<HTMLElement>(
      '[data-slot="image-compare"]',
    );
    const before = document.querySelector<HTMLElement>(
      '[data-slot="image-compare-before"]',
    );
    const divider = screen.getByRole("slider");

    expect(root?.style.getPropertyValue("--image-compare-position")).toBe(
      "35%",
    );
    expect(before?.style.clipPath).toContain("--image-compare-position");
    expect(divider.style.left).toBe("var(--image-compare-position)");
  });

  it("respects controlled position", () => {
    const onPositionChange = vi.fn();
    render(
      <ImageCompare
        {...media}
        position={25}
        onPositionChange={onPositionChange}
      />,
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "25");
    expect(onPositionChange).toHaveBeenCalledWith(26);
  });

  it("renders custom labels and accessible name", () => {
    render(
      <ImageCompare
        {...media}
        beforeLabel="Original"
        afterLabel="Retouched"
        separatorLabel="Reveal retouched image"
      />,
    );
    expect(screen.getByText("Original")).toBeInTheDocument();
    expect(screen.getByText("Retouched")).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Reveal retouched image" }),
    ).toBeInTheDocument();
  });

  it("disables pointer and keyboard interaction", () => {
    const onPositionChange = vi.fn();
    render(
      <ImageCompare {...media} disabled onPositionChange={onPositionChange} />,
    );
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("tabindex", "-1");
    expect(slider).toHaveAttribute("aria-disabled", "true");
    expect(slider).not.toHaveClass("cursor-ew-resize");
    expect(onPositionChange).not.toHaveBeenCalled();
  });

  it("forwards ref and className", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ImageCompare {...media} ref={ref} className="custom-class" />);
    expect(ref.current).toHaveAttribute("data-slot", "image-compare");
    expect(ref.current).toHaveClass("custom-class");
  });
});
