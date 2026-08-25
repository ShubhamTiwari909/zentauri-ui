import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SlideToComplete } from "./slide-to-complete";

describe("SlideToComplete", () => {
  beforeEach(() => {
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  it("should set displayName", () => {
    expect(SlideToComplete.displayName).toBe("SlideToComplete");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<SlideToComplete />);
    const root = container.querySelector('[data-slot="slide-to-complete"]');
    expect(root).toBeTruthy();
  });

  it("should render default track and thumb", () => {
    const { container } = render(<SlideToComplete />);
    const track = container.querySelector(
      '[data-slot="slide-to-complete-track"]',
    );
    expect(track).toBeTruthy();
    const thumb = container.querySelector(
      '[data-slot="slide-to-complete-thumb"]',
    );
    expect(thumb).toBeTruthy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<SlideToComplete ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("slide-to-complete");
  });

  it("should apply custom className", () => {
    const { container } = render(<SlideToComplete className="custom-class" />);
    const root = container.querySelector('[data-slot="slide-to-complete"]');
    expect(root?.className).toMatch(/custom-class/);
  });

  it("should have default threshold of 0.9", () => {
    const { container } = render(<SlideToComplete />);
    const root = container.querySelector('[data-slot="slide-to-complete"]');
    expect(root).toHaveStyle({ "--slide-threshold": "0.9" });
  });

  it("should render the shorthand label prop", () => {
    render(<SlideToComplete label="Slide to approve" />);
    expect(screen.getByText("Slide to approve")).toBeTruthy();
  });

  it("should expose compound primitives", () => {
    const { container } = render(
      <SlideToComplete.Root>
        <SlideToComplete.Track>
          <SlideToComplete.Progress />
          <SlideToComplete.Label>Confirm</SlideToComplete.Label>
          <SlideToComplete.Thumb>
            <SlideToComplete.Icon>go</SlideToComplete.Icon>
          </SlideToComplete.Thumb>
        </SlideToComplete.Track>
      </SlideToComplete.Root>,
    );

    expect(
      container.querySelector('[data-slot="slide-to-complete-progress"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="slide-to-complete-icon"]'),
    ).toHaveTextContent("go");
  });

  it("should complete from the keyboard", async () => {
    const onComplete = vi.fn();
    const onValueChange = vi.fn();

    render(
      <SlideToComplete
        label="Slide to verify"
        onComplete={onComplete}
        onValueChange={onValueChange}
      />,
    );

    fireEvent.keyDown(
      screen.getByRole("button", { name: /slide to verify/i }),
      {
        key: "Enter",
      },
    );

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-state",
      "completed",
    );
  });

  it("should respect controlled completion state", () => {
    const { container, rerender } = render(
      <SlideToComplete value={false} label="Slide to unlock" />,
    );

    const root = container.querySelector('[data-slot="slide-to-complete"]');
    expect(root).toHaveAttribute("data-state", "idle");

    rerender(<SlideToComplete value label="Slide to unlock" />);
    expect(root).toHaveAttribute("data-state", "completed");
    expect(root).toHaveStyle({ "--slide-progress": "1" });
  });

  it("should complete when pointer progress reaches the threshold", async () => {
    const onComplete = vi.fn();
    const onProgressChange = vi.fn();

    const { container } = render(
      <SlideToComplete
        label="Slide to submit"
        threshold={0.75}
        onComplete={onComplete}
        onProgressChange={onProgressChange}
      />,
    );

    const track = container.querySelector(
      '[data-slot="slide-to-complete-track"]',
    ) as HTMLElement;
    const thumb = screen.getByRole("button", { name: /slide to submit/i });

    track.getBoundingClientRect = vi.fn(() => ({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 56,
      width: 200,
      height: 56,
      toJSON: () => ({}),
    }));
    thumb.getBoundingClientRect = vi.fn(() => ({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 48,
      bottom: 48,
      width: 48,
      height: 48,
      toJSON: () => ({}),
    }));

    fireEvent.pointerDown(thumb, { clientX: 24, pointerId: 1 });
    fireEvent.pointerMove(thumb, { clientX: 170, pointerId: 1 });
    fireEvent.pointerUp(thumb, { clientX: 170, pointerId: 1 });

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    expect(onProgressChange).toHaveBeenCalled();
  });
});
