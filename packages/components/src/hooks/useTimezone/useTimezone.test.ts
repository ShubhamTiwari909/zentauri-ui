import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTimezone } from "./useTimezone";

describe("useTimezone", () => {
  it("returns a localTimezone string", () => {
    const { result } = renderHook(() => useTimezone());
    expect(typeof result.current.localTimezone).toBe("string");
    expect(result.current.localTimezone.length).toBeGreaterThan(0);
  });

  it("formatInZone returns a formatted time string", () => {
    const { result } = renderHook(() => useTimezone({ locale: "en-US" }));
    const date = new Date("2024-06-15T12:00:00Z");
    const formatted = result.current.formatInZone(date, "UTC", {
      hour: "numeric",
      minute: "numeric",
    });
    expect(formatted).toContain("12");
  });

  it("formatInZone works with America/New_York", () => {
    const { result } = renderHook(() => useTimezone({ locale: "en-US" }));
    const date = new Date("2024-01-15T12:00:00Z");
    const formatted = result.current.formatInZone(date, "America/New_York", {
      hour: "numeric",
      timeZoneName: "short",
    });
    expect(formatted).toContain("7");
  });

  it("supported may be false in some runtimes", () => {
    const { result } = renderHook(() => useTimezone());
    expect(typeof result.current.supported).toBe("boolean");
  });

  it("offsetFromLocal returns a number", () => {
    const { result } = renderHook(() => useTimezone());
    const offset = result.current.offsetFromLocal("UTC");
    expect(typeof offset).toBe("number");
  });

  it("getTimezoneInfo returns info for a known zone", () => {
    const { result } = renderHook(() => useTimezone({ locale: "en-US" }));
    if (result.current.supported) {
      const info = result.current.getTimezoneInfo("America/New_York");
      expect(info).not.toBeNull();
      expect(info!.id).toBe("America/New_York");
      expect(info!.region).toBe("America");
      expect(typeof info!.offsetMinutes).toBe("number");
      expect(typeof info!.offsetLabel).toBe("string");
    }
  });
});
