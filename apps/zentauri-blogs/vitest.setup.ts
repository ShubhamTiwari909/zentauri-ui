import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

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
