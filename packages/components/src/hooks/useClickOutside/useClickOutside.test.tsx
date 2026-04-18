import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  it("should call setOpen false on mousedown outside ref", () => {
    const setOpen = vi.fn();
    const ref = createRef<HTMLDivElement>();
    function Single() {
      useClickOutside({ ref, setOpen });
      return <div ref={ref} data-testid="inside" />;
    }
    render(
      <div>
        <Single />
        <span data-testid="outside">x</span>
      </div>,
    );
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it("should not call setOpen when mousedown is inside ref", () => {
    const setOpen = vi.fn();
    const ref = createRef<HTMLDivElement>();
    function Single() {
      useClickOutside({ ref, setOpen });
      return <div ref={ref} data-testid="inside" />;
    }
    render(<Single />);
    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(setOpen).not.toHaveBeenCalled();
  });

  it("should register multiple event types when listenEvents provided", () => {
    const setOpen = vi.fn();
    const ref = createRef<HTMLDivElement>();
    function Multi() {
      useClickOutside({
        ref,
        setOpen,
        listenEvents: ["pointerdown", "touchstart"],
      });
      return <div ref={ref} data-testid="inside" />;
    }
    render(
      <div>
        <Multi />
        <span data-testid="outside">x</span>
      </div>,
    );
    fireEvent.pointerDown(screen.getByTestId("outside"));
    expect(setOpen).toHaveBeenCalledTimes(1);
    setOpen.mockClear();
    fireEvent.touchStart(screen.getByTestId("outside"));
    expect(setOpen).toHaveBeenCalledTimes(1);
  });
});
