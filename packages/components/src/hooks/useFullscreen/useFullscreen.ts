"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useEventListener } from "../useEventListener";

export interface UseFullscreenOptions {
  /** Passed to `requestFullscreen`. Default: `{ navigationUI: "auto" }`. */
  requestOptions?: FullscreenOptions;
  onEnter?: (element: Element) => void;
  onExit?: () => void;
  /** Request/exit rejections land here (and in the returned promise). */
  onError?: (error: Error) => void;
}

export interface UseFullscreenReturn {
  /** True while the resolved target is the document's fullscreen element. */
  isFullscreen: boolean;
  /**
   * Whether the Fullscreen API is available for element fullscreen in this
   * runtime (`document.fullscreenEnabled`, including the WebKit-prefixed check).
   * Always false during SSR/pre-mount.
   */
  isSupported: boolean;
  /** Enter fullscreen on the target. Resolves after the request settles. */
  enter: () => Promise<void>;
  /** Exit fullscreen if the target (or anything) is fullscreen. */
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
  /** The element currently fullscreen document-wide, or null (any element, not just the target). */
  fullscreenElement: Element | null;
}

export type UseFullscreenTarget<T extends HTMLElement> =
  | RefObject<T | null>
  | T
  | null;

interface DocumentWithWebkit extends Document {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void> | void;
}

interface ElementWithWebkit extends HTMLElement {
  webkitRequestFullscreen?: (
    options?: FullscreenOptions,
  ) => Promise<void> | void;
}

const UNSUPPORTED_ERROR_MESSAGE =
  "Fullscreen API is not supported in this runtime.";

function getFullscreenElement(): Element | null {
  if (typeof document === "undefined") {
    return null;
  }
  const doc = document as DocumentWithWebkit;
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

function isFullscreenEnabled(): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  const doc = document as DocumentWithWebkit;
  return Boolean(doc.fullscreenEnabled ?? doc.webkitFullscreenEnabled ?? false);
}

function requestFullscreenOn(
  element: ElementWithWebkit,
  requestOptions: FullscreenOptions | undefined,
): Promise<void> {
  if (element.requestFullscreen) {
    return element.requestFullscreen(requestOptions);
  }
  if (element.webkitRequestFullscreen) {
    // Older WebKit returns undefined instead of a Promise.
    return Promise.resolve(element.webkitRequestFullscreen(requestOptions));
  }
  return Promise.reject(new Error(UNSUPPORTED_ERROR_MESSAGE));
}

function exitFullscreenOn(doc: DocumentWithWebkit): Promise<void> {
  if (doc.exitFullscreen) {
    return doc.exitFullscreen();
  }
  if (doc.webkitExitFullscreen) {
    return Promise.resolve(doc.webkitExitFullscreen());
  }
  return Promise.reject(new Error(UNSUPPORTED_ERROR_MESSAGE));
}

function resolveTarget<T extends HTMLElement>(
  target: UseFullscreenTarget<T> | undefined,
): HTMLElement | null {
  if (typeof document === "undefined") {
    return null;
  }
  if (target === undefined || target === null) {
    return document.documentElement;
  }
  if (typeof HTMLElement !== "undefined" && target instanceof HTMLElement) {
    return target;
  }
  // A ref whose element hasn't mounted (or has unmounted) resolves to `null`
  // rather than falling back to the whole page — the caller asked for a
  // specific element, not "whatever's available."
  return (target as RefObject<T | null>).current;
}

function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

/**
 * Cross-browser Fullscreen API wrapper: WebKit prefixes, event-driven state
 * (so Esc-key exits are reflected correctly), and promise-based enter/exit/toggle.
 *
 * - Without a target, the whole page (`document.documentElement`) goes fullscreen.
 *   With a ref (the common case), that element does.
 * - `isFullscreen` is derived from the `fullscreenchange` event, not from calling
 *   `enter`/`exit` — the user can exit via Esc or browser UI without calling `exit()`.
 * - `isSupported` is `false` during SSR and on iOS Safari (no element fullscreen there;
 *   only `<video>` supports it via a separate, video-specific API).
 * - Never auto-exits fullscreen on unmount — the browser already does that when the
 *   element leaves the DOM.
 *
 * @param target - Ref, direct element, or omitted/null for the whole page.
 * @param options - {@link UseFullscreenOptions}
 * @returns {@link UseFullscreenReturn}
 */
export function useFullscreen<T extends HTMLElement = HTMLElement>(
  target?: UseFullscreenTarget<T>,
  options: UseFullscreenOptions = {},
): UseFullscreenReturn {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const targetRef = useRef(target);
  targetRef.current = target;

  const [isSupported, setIsSupported] = useState(false);
  const [fullscreenElement, setFullscreenElement] = useState<Element | null>(
    null,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsSupported(isFullscreenEnabled());
  }, []);

  const handleChange = useCallback(() => {
    const fsElement = getFullscreenElement();
    setFullscreenElement(fsElement);
    const resolved = resolveTarget(targetRef.current);
    setIsFullscreen(fsElement !== null && fsElement === resolved);
  }, []);

  // `onEnter`/`onExit` are fired here, not from inside the `setIsFullscreen`
  // updater above — state updater functions can be invoked more than once per
  // commit (React Strict Mode), which would double-fire a side effect placed
  // there. This effect only reacts to the state actually committing.
  const previousIsFullscreenRef = useRef(isFullscreen);
  useEffect(() => {
    if (previousIsFullscreenRef.current === isFullscreen) {
      return;
    }
    previousIsFullscreenRef.current = isFullscreen;
    if (isFullscreen) {
      optionsRef.current.onEnter?.(fullscreenElement as Element);
    } else {
      optionsRef.current.onExit?.();
    }
  }, [isFullscreen, fullscreenElement]);

  // Guards against `onError` firing twice for one failure: the browser fires
  // `fullscreenerror` for the same failure that rejects the request/exit
  // promise. Armed right before calling the browser API; whichever of the
  // event or the promise rejection is observed first reports and disarms it.
  const pendingErrorRef = useRef(false);

  const handleError = useCallback(() => {
    pendingErrorRef.current = false;
    optionsRef.current.onError?.(new Error("Fullscreen request failed."));
  }, []);

  // `document` must not be referenced as a bare identifier during SSR — unlike
  // `typeof document`, doing so throws ReferenceError in Node. `useEventListener`
  // resolves a null target to a no-op subscription, so the cast is runtime-safe.
  const documentTarget = (
    typeof document === "undefined" ? null : document
  ) as Document;

  useEventListener("fullscreenchange", handleChange, documentTarget);
  useEventListener(
    "webkitfullscreenchange" as keyof DocumentEventMap,
    handleChange,
    documentTarget,
  );
  useEventListener("fullscreenerror", handleError, documentTarget);
  useEventListener(
    "webkitfullscreenerror" as keyof DocumentEventMap,
    handleError,
    documentTarget,
  );

  const enter = useCallback((): Promise<void> => {
    if (!isFullscreenEnabled()) {
      const error = new Error(UNSUPPORTED_ERROR_MESSAGE);
      optionsRef.current.onError?.(error);
      return Promise.reject(error);
    }
    const element = resolveTarget<T>(
      targetRef.current,
    ) as ElementWithWebkit | null;
    if (!element) {
      const error = new Error("Target element is not mounted.");
      optionsRef.current.onError?.(error);
      return Promise.reject(error);
    }
    pendingErrorRef.current = true;
    return requestFullscreenOn(
      element,
      optionsRef.current.requestOptions ?? { navigationUI: "auto" },
    ).then(
      () => {
        pendingErrorRef.current = false;
      },
      (cause: unknown) => {
        const error = toError(cause);
        // Only report here if `handleError` hasn't already reported this
        // same failure via the `fullscreenerror` event.
        if (pendingErrorRef.current) {
          pendingErrorRef.current = false;
          optionsRef.current.onError?.(error);
        }
        throw error;
      },
    );
  }, []);

  const exit = useCallback((): Promise<void> => {
    if (typeof document === "undefined") {
      const error = new Error(UNSUPPORTED_ERROR_MESSAGE);
      optionsRef.current.onError?.(error);
      return Promise.reject(error);
    }
    if (getFullscreenElement() === null) {
      return Promise.resolve();
    }
    pendingErrorRef.current = true;
    return exitFullscreenOn(document as DocumentWithWebkit).then(
      () => {
        pendingErrorRef.current = false;
      },
      (cause: unknown) => {
        const error = toError(cause);
        if (pendingErrorRef.current) {
          pendingErrorRef.current = false;
          optionsRef.current.onError?.(error);
        }
        throw error;
      },
    );
  }, []);

  const toggle = useCallback((): Promise<void> => {
    const resolved = resolveTarget<T>(targetRef.current);
    const fsElement = getFullscreenElement();
    return fsElement !== null && fsElement === resolved ? exit() : enter();
  }, [enter, exit]);

  return { isFullscreen, isSupported, enter, exit, toggle, fullscreenElement };
}
