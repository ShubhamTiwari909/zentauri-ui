import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDurationFormat } from "./useDurationFormat";

describe("useDurationFormat", () => {
  it("formats 1h 24m 30s in narrow style", () => {
    const ms = 1 * 3_600_000 + 24 * 60_000 + 30 * 1000;
    const { result } = renderHook(() =>
      useDurationFormat({ locale: "en-US", style: "narrow" }),
    );
    const output = result.current.format(ms);
    expect(output).toBe("1h 24m 30s");
  });

  it("formats in short style", () => {
    const ms = 2 * 3_600_000 + 15 * 60_000;
    const { result } = renderHook(() =>
      useDurationFormat({ locale: "en-US", style: "short" }),
    );
    const output = result.current.format(ms);
    expect(output).toContain("2 hr");
    expect(output).toContain("15 min");
  });

  it("formats in long style", () => {
    const ms = 1 * 3_600_000 + 5 * 60_000;
    const { result } = renderHook(() =>
      useDurationFormat({ locale: "en-US", style: "long" }),
    );
    const output = result.current.format(ms);
    expect(output).toContain("1 hour");
    expect(output).toContain("5 minutes");
  });

  it("respects maxUnits", () => {
    const ms = 2 * 3_600_000 + 30 * 60_000 + 15 * 1000;
    const { result } = renderHook(() =>
      useDurationFormat({ locale: "en-US", style: "narrow", maxUnits: 2 }),
    );
    const output = result.current.format(ms);
    expect(output).toBe("2h 30m");
  });

  it("omits zero units by default", () => {
    const ms = 30 * 60_000;
    const { result } = renderHook(() =>
      useDurationFormat({ locale: "en-US", style: "narrow" }),
    );
    const output = result.current.format(ms);
    expect(output).toBe("30m");
  });

  it("includes zero units when showZeroUnits is true", () => {
    const ms = 30 * 60_000;
    const { result } = renderHook(() =>
      useDurationFormat({
        locale: "en-US",
        style: "narrow",
        showZeroUnits: true,
      }),
    );
    const output = result.current.format(ms);
    expect(output).toContain("0s");
  });

  it("returns formatParts with correct structure", () => {
    const ms = 1 * 3_600_000 + 15 * 60_000;
    const { result } = renderHook(() =>
      useDurationFormat({ locale: "en-US", style: "narrow" }),
    );
    const parts = result.current.formatParts(ms);
    expect(parts.length).toBe(2);
    expect(parts[0]!.unit).toBe("hour");
    expect(parts[0]!.value).toBe(1);
    expect(parts[1]!.unit).toBe("minute");
    expect(parts[1]!.value).toBe(15);
  });

  it("handles day unit", () => {
    const ms = 2 * 86_400_000 + 12 * 3_600_000;
    const { result } = renderHook(() =>
      useDurationFormat({
        locale: "en-US",
        style: "narrow",
        units: ["day", "hour"],
      }),
    );
    const output = result.current.format(ms);
    expect(output).toBe("2d 12h");
  });

  it("handles millisecond unit", () => {
    const ms = 5000 + 500;
    const { result } = renderHook(() =>
      useDurationFormat({
        locale: "en-US",
        style: "narrow",
        units: ["second", "millisecond"],
      }),
    );
    const output = result.current.format(ms);
    expect(output).toContain("5s");
  });
});
