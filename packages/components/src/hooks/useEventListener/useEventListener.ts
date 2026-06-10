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
  if (target === undefined) {
    // No target specified — default to window.
    return typeof window === "undefined" ? null : window;
  }
  if (target === null) {
    // Explicit null — caller opts out; do not attach any listener.
    return null;
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
 * - Pass explicit `null` as `target` to skip attaching (useful for conditional subscriptions).
 * - The handler is kept in a ref, so passing a new inline function each render does not re-subscribe.
 * - Ref targets are resolved when the effect runs (after mount); if the ref is retargeted later,
 *   re-render with a state-backed node (or key the component) to re-subscribe.
 * - Pass `options` as individual booleans or a stable object reference to avoid re-subscribing on
 *   every render. Internally, `capture`, `passive`, and `once` are compared individually.
 *
 * @param eventName - DOM event name (typed against `WindowEventMap` / `DocumentEventMap` / `HTMLElementEventMap`).
 * @param handler - Listener invoked with the native event.
 * @param target - Event target, React ref to one, `undefined` for `window`, or `null` to skip.
 * @param options - Standard `addEventListener` options.
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

  // Destructure options to stable primitives so an inline `{ passive: true }` object literal
  // passed by callers does not cause the listener to be removed and re-added on every render.
  const capture =
    typeof options === "boolean" ? options : (options?.capture ?? false);
  const passive = typeof options === "object" ? (options?.passive ?? false) : false;
  const once = typeof options === "object" ? (options?.once ?? false) : false;

  useEffect(() => {
    const node = resolveTarget(target);
    if (node == null) {
      return;
    }
    const listenerOptions = { capture, passive, once };
    const listener = (event: Event) => {
      handlerRef.current(event);
    };
    node.addEventListener(eventName, listener, listenerOptions);
    return () => {
      node.removeEventListener(eventName, listener, listenerOptions);
    };
  }, [eventName, target, capture, passive, once]);
}
