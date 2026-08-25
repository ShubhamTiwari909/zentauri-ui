import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

function createMatchMediaList(query: string, matches: boolean): MediaQueryList {
  const listeners = new Map<string, (event: MediaQueryListEvent) => void>();
  return {
    get media() {
      return query;
    },
    matches,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (type: string, listener: EventListener) => {
      listeners.set(type, listener as (event: MediaQueryListEvent) => void);
    },
    removeEventListener: (type: string) => {
      listeners.delete(type);
    },
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: vi
    .fn()
    .mockImplementation((query: string) => createMatchMediaList(query, true)),
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  constructor(_callback: IntersectionObserverCallback) {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// jsdom does not implement PointerEvent, so pointer-driven components (e.g.
// slide-to-complete) need a small polyfill for pointer interaction tests.
if (typeof window.PointerEvent === "undefined") {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    width: number;
    height: number;
    pressure: number;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.pointerType = params.pointerType ?? "mouse";
      this.isPrimary = params.isPrimary ?? true;
      this.width = params.width ?? 1;
      this.height = params.height ?? 1;
      this.pressure = params.pressure ?? 0;
    }
  }

  Object.defineProperty(window, "PointerEvent", {
    writable: true,
    configurable: true,
    value: PointerEventPolyfill,
  });
  Object.defineProperty(globalThis, "PointerEvent", {
    writable: true,
    configurable: true,
    value: PointerEventPolyfill,
  });
}
