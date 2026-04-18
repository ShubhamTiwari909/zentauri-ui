"use client";

import type { RefCallback } from "react";
import { useCallback, useEffect, useState } from "react";

/**
 * Tracks pointer hover state for a single DOM node using `pointerenter` / `pointerleave`.
 *
 * @typeParam T - HTMLElement subtype for the ref callback (e.g. `HTMLDivElement`).
 * @returns A tuple `[setRef, hovered]` where `setRef` is a callback ref to attach to the target element
 *          and `hovered` is `true` while the pointer is over that element (primary button agnostic).
 */
export function useHover<T extends HTMLElement>(): [RefCallback<T>, boolean] {
  const [element, setElement] = useState<T | null>(null);
  const [hovered, setHovered] = useState(false);

  const setRef = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (element == null) {
      setHovered(false);
      return;
    }
    const onEnter = () => {
      setHovered(true);
    };
    const onLeave = () => {
      setHovered(false);
    };
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [element]);

  return [setRef, hovered];
}
