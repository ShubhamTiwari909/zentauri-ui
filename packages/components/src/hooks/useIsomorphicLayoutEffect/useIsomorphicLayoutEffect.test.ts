import { useRef } from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

describe("useIsomorphicLayoutEffect", () => {
  it("should run effect in jsdom without throwing", () => {
    const order: string[] = [];
    renderHook(() => {
      const ref = useRef(false);
      useIsomorphicLayoutEffect(() => {
        order.push("effect");
        ref.current = true;
      }, []);
    });
    expect(order).toEqual(["effect"]);
  });
});
