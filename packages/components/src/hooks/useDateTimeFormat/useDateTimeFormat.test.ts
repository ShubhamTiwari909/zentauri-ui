import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  getCachedDateTimeFormat,
  useDateTimeFormat,
} from "./useDateTimeFormat";

const FIXED_DATE = new Date(2024, 5, 15, 14, 30, 45);

describe("getCachedDateTimeFormat", () => {
  it("returns the same instance for identical key", () => {
    const a = getCachedDateTimeFormat("en-US", { dateStyle: "full" });
    const b = getCachedDateTimeFormat("en-US", { dateStyle: "full" });
    expect(a).toBe(b);
  });

  it("returns different instances for different keys", () => {
    const a = getCachedDateTimeFormat("en-US", { dateStyle: "full" });
    const b = getCachedDateTimeFormat("en-US", { dateStyle: "long" });
    expect(a).not.toBe(b);
  });

  it("caches by locale too", () => {
    const a = getCachedDateTimeFormat("en-US", { dateStyle: "full" });
    const b = getCachedDateTimeFormat("fr-FR", { dateStyle: "full" });
    expect(a).not.toBe(b);
  });
});

describe("useDateTimeFormat", () => {
  it("formats a date for en-US", () => {
    const { result } = renderHook(() =>
      useDateTimeFormat({
        locale: "en-US",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
    expect(result.current.format(FIXED_DATE)).toBe("June 15, 2024");
  });

  it("formats a date for fr-FR", () => {
    const { result } = renderHook(() =>
      useDateTimeFormat({
        locale: "fr-FR",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
    expect(result.current.format(FIXED_DATE)).toMatch(/15.*juin.*2024/);
  });

  it("formatRange returns a range string", () => {
    const { result } = renderHook(() =>
      useDateTimeFormat({
        locale: "en-US",
        month: "short",
        day: "numeric",
      }),
    );
    const start = new Date(2024, 5, 15);
    const end = new Date(2024, 5, 17);
    const range = result.current.formatRange(start, end);
    expect(range).toContain("Jun 15");
    expect(range).toContain("17");
  });

  it("formatToParts returns parts array", () => {
    const { result } = renderHook(() =>
      useDateTimeFormat({
        locale: "en-US",
        year: "numeric",
      }),
    );
    const parts = result.current.formatToParts(FIXED_DATE);
    expect(parts.length).toBeGreaterThan(0);
    expect(parts.some((p) => p.type === "year")).toBe(true);
  });

  it("resolvedLocale matches the requested locale", () => {
    const { result } = renderHook(() => useDateTimeFormat({ locale: "en-IN" }));
    expect(result.current.resolvedLocale).toBe("en-IN");
  });

  it("format is stable across renders", () => {
    const { result, rerender } = renderHook(() =>
      useDateTimeFormat({
        locale: "en-US",
        year: "numeric",
      }),
    );
    const f1 = result.current.format;
    rerender();
    const f2 = result.current.format;
    expect(f1).toBe(f2);
  });
});
