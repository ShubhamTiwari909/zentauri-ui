"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";

export type UseEventListenerTarget =
  | EventTarget
  | RefObject<EventTarget | null>
  | null;

function resolveTarget(
  target: UseEventListenerTarget | undefined,
): EventTarget | null {
  if (target == null) {
    return typeof window === "undefined" ? null : window;
  }
  if (target instanceof EventTarget) {
    return target;
  }
  return target.current;
}

/**
 * Attaches a DOM event listener with automatic cleanup and a stable wrapper around the latest handler.
 *
 * - Defaults to `window`; pass an element, `document`, or a React ref object as `target`.
 * - The handler is kept in a ref, so passing a new inline function each render does not re-subscribe.
 * - Ref targets are resolved when the effect runs (after mount); if the ref is retargeted later,
 *   re-render with a state-backed node (or key the component) to re-subscribe.
 *
 * @param eventName - DOM event name (typed against `WindowEventMap` / `DocumentEventMap` / `HTMLElementEventMap`).
 * @param handler - Listener invoked with the native event.
 * @param target - Event target, React ref to one, or `undefined` for `window`.
 * @param options - Standard `addEventListener` options (memoize object options to avoid re-subscribing).
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  target?: Window | null,
  options?: boolean | AddEventListenerOptions,
): void;
export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  target: Document | RefObject<Document | null>,
  options?: boolean | AddEventListenerOptions,
): void;
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  target: T | RefObject<T | null> | null,
  options?: boolean | AddEventListenerOptions,
): void;
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  target?: UseEventListenerTarget,
  options?: boolean | AddEventListenerOptions,
): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const node = resolveTarget(target);
    if (node == null) {
      return;
    }
    const listener = (event: Event) => {
      handlerRef.current(event);
    };
    node.addEventListener(eventName, listener, options);
    return () => {
      node.removeEventListener(eventName, listener, options);
    };
  }, [eventName, target, options]);
}
