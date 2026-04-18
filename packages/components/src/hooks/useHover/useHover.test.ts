import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useHover } from "./useHover";

describe("useHover", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("should report hovered true on pointerenter and false on pointerleave", () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());
    const node = document.createElement("div");
    document.body.appendChild(node);
    act(() => {
      result.current[0](node);
    });
    expect(result.current[1]).toBe(false);
    act(() => {
      node.dispatchEvent(new Event("pointerenter", { bubbles: true }));
    });
    expect(result.current[1]).toBe(true);
    act(() => {
      node.dispatchEvent(new Event("pointerleave", { bubbles: true }));
    });
    expect(result.current[1]).toBe(false);
  });

  it("should clear hover when ref target is cleared", () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());
    const node = document.createElement("div");
    document.body.appendChild(node);
    act(() => {
      result.current[0](node);
    });
    act(() => {
      node.dispatchEvent(new Event("pointerenter", { bubbles: true }));
    });
    expect(result.current[1]).toBe(true);
    act(() => {
      result.current[0](null);
    });
    expect(result.current[1]).toBe(false);
  });
});
