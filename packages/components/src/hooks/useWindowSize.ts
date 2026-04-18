"use client";

import { useEffect, useState } from "react";

export type WindowSize = {
  width: number;
  height: number;
};

const defaultSize: WindowSize = { width: 0, height: 0 };

/**
 * Tracks the viewport size using `window.innerWidth` / `innerHeight` and a `resize` listener.
 *
 * Initializes to `{ width: 0, height: 0 }` on the server; after mount, size updates to the real viewport and on every resize.
 *
 * @returns Latest `{ width, height }` in CSS pixels.
 */
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === "undefined") {
      return defaultSize;
    }
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}
