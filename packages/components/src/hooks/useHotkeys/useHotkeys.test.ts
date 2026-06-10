import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useHotkeys } from "./useHotkeys";

function dispatchKeydown(
  key: string,
  init: KeyboardEventInit = {},
  target: EventTarget = window,
) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
    ...init,
  });
  target.dispatchEvent(event);
  return event;
}

describe("useHotkeys", () => {
  it("should fire a plain key binding", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ escape: handler }));
    dispatchKeydown("Escape");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should require all listed modifiers", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "ctrl+shift+k": handler }));
    dispatchKeydown("k", { ctrlKey: true });
    expect(handler).not.toHaveBeenCalled();
    dispatchKeydown("k", { ctrlKey: true, shiftKey: true });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should reject extra modifiers", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ k: handler }));
    dispatchKeydown("k", { ctrlKey: true });
    expect(handler).not.toHaveBeenCalled();
  });

  it("should match mod against ctrl or meta", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ "mod+k": handler }));
    dispatchKeydown("k", { ctrlKey: true });
    dispatchKeydown("k", { metaKey: true });
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("should prevent default on match by default", () => {
    renderHook(() => useHotkeys({ "mod+k": vi.fn() }));
    const event = dispatchKeydown("k", { metaKey: true });
    expect(event.defaultPrevented).toBe(true);
  });

  it("should skip events from editable targets unless allowed", () => {
    const handler = vi.fn();
    const input = document.createElement("input");
    document.body.appendChild(input);
    const { rerender } = renderHook(
      ({ allowInInputs }: { allowInInputs: boolean }) =>
        useHotkeys({ escape: handler }, { allowInInputs }),
      { initialProps: { allowInInputs: false } },
    );
    dispatchKeydown("Escape", {}, input);
    expect(handler).not.toHaveBeenCalled();
    rerender({ allowInInputs: true });
    dispatchKeydown("Escape", {}, input);
    expect(handler).toHaveBeenCalledTimes(1);
    input.remove();
  });

  it("should do nothing when disabled", () => {
    const handler = vi.fn();
    renderHook(() => useHotkeys({ escape: handler }, { enabled: false }));
    dispatchKeydown("Escape");
    expect(handler).not.toHaveBeenCalled();
  });
});
