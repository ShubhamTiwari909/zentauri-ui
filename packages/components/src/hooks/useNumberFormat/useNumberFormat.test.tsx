import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getCachedNumberFormat, useNumberFormat } from "./useNumberFormat";

describe("getCachedNumberFormat", () => {
  it("normalizes locale casing, arrays, option order and undefined fields", () => {
    const a = getCachedNumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
    const b = getCachedNumberFormat(["en-US"], {
      maximumFractionDigits: 2,
      currency: "USD",
      style: "currency",
      minimumIntegerDigits: undefined,
    });
    expect(a).toBe(b);
  });
  it("uses deterministic defaults and a final en-US fallback", () => {
    expect(getCachedNumberFormat().resolvedOptions().locale).toBe("en-US");
    expect(getCachedNumberFormat([])).toBe(getCachedNumberFormat());
    expect(getCachedNumberFormat("zz-ZZ").resolvedOptions().locale).toBe(
      "en-US",
    );
  });
  it("preserves locale preference ordering and meaningful option changes", () => {
    expect(
      getCachedNumberFormat(["de-DE", "en-IN"]).resolvedOptions().locale,
    ).toBe("de-DE");
    expect(
      getCachedNumberFormat(["en-IN", "de-DE"]).resolvedOptions().locale,
    ).toBe("en-IN");
    expect(getCachedNumberFormat("en-US", { useGrouping: true })).not.toBe(
      getCachedNumberFormat("en-US", { useGrouping: false }),
    );
  });
  it("bounds the cache to 50 formatter instances", () => {
    const options = {
      style: "unit",
      unit: "liter",
      minimumIntegerDigits: 21,
    } as const;
    const first = getCachedNumberFormat("en-US", options);
    for (let index = 0; index < 50; index++)
      getCachedNumberFormat("en-US", {
        notation: "scientific",
        minimumIntegerDigits: (index % 21) + 1,
        maximumSignificantDigits: Math.floor(index / 21) + 1,
      });
    expect(getCachedNumberFormat("en-US", options)).not.toBe(first);
  });
  it("retains native locale and option validation", () => {
    expect(() => getCachedNumberFormat("not_a_locale")).toThrow(RangeError);
    expect(() => getCachedNumberFormat("en-US", { style: "currency" })).toThrow(
      TypeError,
    );
    expect(() =>
      getCachedNumberFormat("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 2,
      }),
    ).toThrow(RangeError);
    expect(() =>
      getCachedNumberFormat("en-US", { maximumFractionDigits: NaN }),
    ).toThrow(RangeError);
  });
  it("handles inherited supported options without aliasing the default cache", () => {
    const options = Object.create({
      style: "currency",
      currency: "EUR",
    }) as Intl.NumberFormatOptions;
    expect(getCachedNumberFormat("de-DE", options).format(12)).toBe(
      new Intl.NumberFormat("de-DE", options).format(12),
    );
    expect(getCachedNumberFormat("de-DE", options)).not.toBe(
      getCachedNumberFormat("de-DE"),
    );
  });
  it("keeps unknown and nonprimitive option coercion under native Intl", () => {
    const options = {
      style: { toString: () => "currency" },
      currency: "USD",
    } as unknown as Intl.NumberFormatOptions;
    expect(getCachedNumberFormat("en-US", options).format(12)).toBe("$12.00");
    const future = {
      maximumFractionDigits: 0,
      roundingMode: "floor",
    } as Intl.NumberFormatOptions;
    expect(getCachedNumberFormat("en-US", future).format(1.9)).toBe(
      new Intl.NumberFormat("en-US", future).format(1.9),
    );
  });
});

describe("useNumberFormat", () => {
  it("formats en-US and en-IN grouping with no browser locale lookup", () => {
    const locale = vi
      .spyOn(navigator, "language", "get")
      .mockReturnValue("de-DE");
    try {
      const { result, rerender } = renderHook(
        ({ options }) => useNumberFormat(options),
        { initialProps: { options: { locale: "en-US" } } },
      );
      expect(result.current.format(1234567.89)).toBe("1,234,567.89");
      rerender({ options: { locale: "en-IN" } });
      expect(result.current.format(1234567.89)).toBe("12,34,567.89");
      const defaults = renderHook(() => useNumberFormat());
      expect(defaults.result.current.resolvedLocale).toBe("en-US");
      expect(defaults.result.current.format(1234.5)).toBe("1,234.5");
    } finally {
      locale.mockRestore();
    }
  });
  it("keeps callbacks stable for equivalent options and updates changed options", () => {
    const { result, rerender } = renderHook(
      ({ options }) => useNumberFormat(options),
      {
        initialProps: {
          options: {
            locale: "en-US",
            style: "currency" as const,
            currency: "USD",
          },
        },
      },
    );
    const previous = result.current;
    rerender({
      options: { currency: "USD", style: "currency", locale: "en-US" },
    });
    expect(result.current.format).toBe(previous.format);
    expect(result.current.formatToParts).toBe(previous.formatToParts);
    rerender({
      options: { locale: "en-US", style: "currency", currency: "JPY" },
    });
    expect(result.current.format(1234.5)).toBe("¥1,235");
    expect(result.current.format).not.toBe(previous.format);
  });
  it("preserves complete native parts, including localized spacing", () => {
    const { result } = renderHook(() =>
      useNumberFormat({ locale: "fr-FR", style: "currency", currency: "EUR" }),
    );
    expect(
      result.current
        .formatToParts(1234.56)
        .map((part) => part.value)
        .join(""),
    ).toBe(result.current.format(1234.56));
    expect(
      result.current
        .formatToParts(1234.56)
        .some((part) => part.type === "currency"),
    ).toBe(true);
  });
  it("supports bigint without converting it to a number", () => {
    const { result } = renderHook(() => useNumberFormat({ locale: "en-US" }));
    expect(result.current.format(9007199254740993123n)).toBe(
      "9,007,199,254,740,993,123",
    );
  });
  it("delegates rounding, negative zero, NaN and infinity to Intl", () => {
    const { result } = renderHook(() =>
      useNumberFormat({ locale: "en-US", maximumFractionDigits: 0 }),
    );
    for (const value of [2.5, -2.5, -0, NaN, Infinity, -Infinity])
      expect(result.current.format(value)).toBe(
        new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
          value,
        ),
      );
    expect(result.current.format(-0)).toBe("-0");
  });
  it("supports percentages, compact notation and units", () => {
    const percent = renderHook(() =>
      useNumberFormat({
        locale: "en-US",
        style: "percent",
        maximumFractionDigits: 1,
      }),
    );
    expect(percent.result.current.format(0.125)).toBe("12.5%");
    const compact = renderHook(() =>
      useNumberFormat({ locale: "en-US", notation: "compact" }),
    );
    expect(compact.result.current.format(1200000)).toBe("1.2M");
    const units = renderHook(() =>
      useNumberFormat({
        locale: "en-US",
        style: "unit",
        unit: "kilometer-per-hour",
      }),
    );
    expect(units.result.current.format(90)).toBe(
      new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "kilometer-per-hour",
      }).format(90),
    );
  });
  it("rejects numeric strings rather than silently coercing them", () => {
    const { result } = renderHook(() => useNumberFormat());
    expect(() => result.current.format("12" as unknown as number)).toThrow(
      TypeError,
    );
    expect(() =>
      result.current.formatToParts("12" as unknown as number),
    ).toThrow(TypeError);
  });
});
