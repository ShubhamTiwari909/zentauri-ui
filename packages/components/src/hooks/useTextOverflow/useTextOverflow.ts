"use client";

import { useCallback, useEffect, useState, type RefCallback } from "react";

export type UseTextOverflowOptions = {
  enabled?: boolean;
  /** Changing this value schedules a measurement (for example, text or font settings). */
  measurementKey?: unknown;
  /** Measure a noninteractive text-only copy with these collapsed constraints. */
  lines?: number;
  axis?: "horizontal" | "vertical" | "both";
  /** Ignore differences of this many CSS pixels; default 1. */
  tolerance?: number;
};
export type TextOverflowResult<T extends HTMLElement> = {
  ref: RefCallback<T>;
  isOverflowing: boolean;
  hasMeasured: boolean;
  remeasure: () => void;
};

/** Measures after mount; initial output is always unmeasured and does not read layout. */
export function useTextOverflow<T extends HTMLElement = HTMLElement>({
  enabled = true,
  measurementKey,
  lines,
  axis = "both",
  tolerance = 1,
}: UseTextOverflowOptions = {}): TextOverflowResult<T> {
  if (lines !== undefined && (!Number.isInteger(lines) || lines < 1))
    throw new RangeError("lines must be a positive integer");
  if (!Number.isFinite(tolerance) || tolerance < 0)
    throw new RangeError("tolerance must be a nonnegative finite number");
  const [element, setElement] = useState<T | null>(null);
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<{
    element: T | null;
    isOverflowing: boolean;
    hasMeasured: boolean;
  }>({ element: null, isOverflowing: false, hasMeasured: false });
  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);
  const remeasure = useCallback(() => {
    setRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!enabled || !element) return;
    const doc = element.ownerDocument;
    const view = doc.defaultView;
    if (!view) return;
    let active = true;
    let frame: number | undefined;
    const useAnimationFrame = typeof view.requestAnimationFrame === "function";
    const measure = () => {
      frame = undefined;
      if (!active || !element.isConnected) return;
      const computed = view.getComputedStyle(element);
      if (
        computed.display === "none" ||
        element.getBoundingClientRect().width <= 0
      ) {
        setResult({ element, isOverflowing: false, hasMeasured: false });
        return;
      }
      let target: HTMLElement = element;
      let copy: HTMLDivElement | undefined;
      try {
        if (lines !== undefined) {
          // Do not clone IDs, attributes, descendants or interactive children.
          copy = doc.createElement("div");
          copy.setAttribute("aria-hidden", "true");
          copy.inert = true;
          copy.textContent = element.textContent;
          for (let index = 0; index < computed.length; index++) {
            const property = computed.item(index);
            copy.style.setProperty(
              property,
              computed.getPropertyValue(property),
            );
          }
          Object.assign(copy.style, {
            position: "fixed",
            inset: "0 auto auto 0",
            visibility: "hidden",
            pointerEvents: "none",
            transform: "none",
            margin: "0",
            width: computed.width,
            minWidth: "0",
            maxWidth: "none",
            height: "auto",
            minHeight: "0",
            maxHeight: "none",
            overflow: "hidden",
            contain: "layout style paint",
            display: lines === 1 ? "block" : "-webkit-box",
            whiteSpace: lines === 1 ? "nowrap" : computed.whiteSpace,
            webkitBoxOrient: "vertical",
            webkitLineClamp: lines === 1 ? "none" : String(lines),
          });
          doc.body.append(copy);
          target = copy;
        }
        const horizontal = target.scrollWidth - target.clientWidth > tolerance;
        const vertical = target.scrollHeight - target.clientHeight > tolerance;
        const isOverflowing =
          axis === "horizontal"
            ? horizontal
            : axis === "vertical"
              ? vertical
              : horizontal || vertical;
        setResult((previous) =>
          previous.element === element &&
          previous.hasMeasured &&
          previous.isOverflowing === isOverflowing
            ? previous
            : { element, isOverflowing, hasMeasured: true },
        );
      } finally {
        copy?.remove();
      }
    };
    const schedule = () => {
      if (!active || frame !== undefined) return;
      frame = useAnimationFrame
        ? view.requestAnimationFrame(measure)
        : view.setTimeout(measure, 0);
    };
    const observer =
      typeof view.ResizeObserver === "function"
        ? new view.ResizeObserver(schedule)
        : undefined;
    observer?.observe(element);
    const mutations =
      typeof view.MutationObserver === "function"
        ? new view.MutationObserver(schedule)
        : undefined;
    mutations?.observe(element, {
      subtree: true,
      characterData: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "style", "dir"],
    });
    for (
      let parent = element.parentElement;
      parent;
      parent = parent.parentElement
    )
      mutations?.observe(parent, {
        attributes: true,
        attributeFilter: ["class", "style", "data-theme", "dir"],
      });
    view.addEventListener("resize", schedule);
    doc.fonts?.addEventListener("loadingdone", schedule);
    doc.fonts?.addEventListener("loadingerror", schedule);
    void doc.fonts?.ready.then(schedule);
    schedule();
    return () => {
      active = false;
      if (frame !== undefined) {
        if (useAnimationFrame) view.cancelAnimationFrame(frame);
        else view.clearTimeout(frame);
      }
      observer?.disconnect();
      mutations?.disconnect();
      view.removeEventListener("resize", schedule);
      doc.fonts?.removeEventListener("loadingdone", schedule);
      doc.fonts?.removeEventListener("loadingerror", schedule);
    };
  }, [element, enabled, measurementKey, lines, axis, tolerance, revision]);

  return {
    ref,
    remeasure,
    isOverflowing:
      enabled && result.element === element && result.isOverflowing,
    hasMeasured: enabled && result.element === element && result.hasMeasured,
  };
}
