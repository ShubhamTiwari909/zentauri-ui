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

type MeasurementInputs<T extends HTMLElement> = {
  element: T | null;
  measurementKey?: unknown;
  lines?: number;
  axis?: UseTextOverflowOptions["axis"];
  tolerance?: number;
};
type MeasurementResult<T extends HTMLElement> = MeasurementInputs<T> & {
  isOverflowing: boolean;
  hasMeasured: boolean;
};

function matchesInputs<T extends HTMLElement>(
  value: MeasurementInputs<T>,
  inputs: MeasurementInputs<T>,
) {
  return (
    value.element === inputs.element &&
    Object.is(value.measurementKey, inputs.measurementKey) &&
    value.lines === inputs.lines &&
    value.axis === inputs.axis &&
    value.tolerance === inputs.tolerance
  );
}

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
  // Results remember their inputs so a stale measurement is never reported.
  const [result, setResult] = useState<MeasurementResult<T>>({
    element: null,
    isOverflowing: false,
    hasMeasured: false,
  });
  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);
  const remeasure = useCallback(() => {
    setRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!enabled || !element) {
      setResult((previous) =>
        previous.hasMeasured || previous.isOverflowing
          ? { ...previous, hasMeasured: false, isOverflowing: false }
          : previous,
      );
      return;
    }
    const doc = element.ownerDocument;
    const view = doc.defaultView;
    if (!view) return;
    let active = true;
    let frame: number | undefined;
    // Skip rebuilding the measurement copy when its inputs are unchanged.
    let lastSignature: string | undefined;
    const inputs = { element, measurementKey, lines, axis, tolerance };
    const useAnimationFrame = typeof view.requestAnimationFrame === "function";
    const measure = () => {
      frame = undefined;
      if (!active || !element.isConnected) return;
      const computed = view.getComputedStyle(element);
      if (
        computed.display === "none" ||
        element.getBoundingClientRect().width <= 0
      ) {
        lastSignature = undefined;
        setResult({ ...inputs, isOverflowing: false, hasMeasured: false });
        return;
      }
      // Snapshot computed styles conservatively: exclude only paint-only properties
      // and custom variables, whose resolved layout values are already included.
      // Animations and transitions are excluded so the clone keeps the captured
      // static layout values instead of restarting them.
      const measurementStyles =
        lines === undefined
          ? []
          : Array.from(computed)
              .filter(
                (property) =>
                  !/^(?:--|(?:.*-)?color$|background(?:-|$)|opacity$|(?:box|text)-shadow$|fill(?:-|$)|stroke(?:-|$)|caret(?:-|$)|outline(?:-|$)|cursor$|pointer-events$|animation(?:-|$)|transition(?:-|$))/.test(
                    property,
                  ),
              )
              .map(
                (property) =>
                  [property, computed.getPropertyValue(property)] as const,
              );
      const signatureBefore = lastSignature;
      let nextSignature: string | undefined;
      if (lines !== undefined) {
        nextSignature = JSON.stringify([
          element.textContent,
          ...measurementStyles,
        ]);
        if (nextSignature === signatureBefore) return;
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
          for (const [property, value] of measurementStyles) {
            copy.style.setProperty(property, value);
          }
          Object.assign(copy.style, {
            position: "fixed",
            inset: "0 auto auto 0",
            visibility: "hidden",
            pointerEvents: "none",
            animation: "none",
            transition: "none",
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
        lastSignature = nextSignature;
        setResult((previous) =>
          matchesInputs(previous, inputs) &&
          previous.hasMeasured &&
          previous.isOverflowing === isOverflowing
            ? previous
            : { ...inputs, isOverflowing, hasMeasured: true },
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
    const fontsChanged = () => {
      lastSignature = undefined;
      schedule();
    };
    doc.fonts?.addEventListener("loadingdone", fontsChanged);
    doc.fonts?.addEventListener("loadingerror", fontsChanged);
    void doc.fonts?.ready.then(fontsChanged);
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
      doc.fonts?.removeEventListener("loadingdone", fontsChanged);
      doc.fonts?.removeEventListener("loadingerror", fontsChanged);
    };
  }, [element, enabled, measurementKey, lines, axis, tolerance, revision]);

  const current =
    enabled &&
    matchesInputs(result, { element, measurementKey, lines, axis, tolerance });
  return {
    ref,
    remeasure,
    isOverflowing: current && result.isOverflowing,
    hasMeasured: current && result.hasMeasured,
  };
}
