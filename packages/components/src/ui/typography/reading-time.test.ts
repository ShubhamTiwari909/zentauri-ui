import { describe, expect, it } from "vitest";
import { estimateReadingTime } from "./reading-time";

describe("estimateReadingTime", () => {
  it("returns zero for empty, whitespace, punctuation and emoji-only input", () => {
    for (const text of ["", " \n\t", "... — !", "🙂👨‍👩‍👧‍👦"])
      expect(estimateReadingTime(text, { mode: "approximate" })).toEqual({
        wordCount: 0,
        minutes: 0,
        seconds: 0,
        method: "approximate",
      });
  });
  it("counts Unicode letter/number runs, combining marks and contractions approximately", () => {
    expect(
      estimateReadingTime("Hello café é 世界 123 don't l’amour", {
        mode: "approximate",
      }).wordCount,
    ).toBe(7);
  });
  it("uses native word-like segmentation for non-space-separated languages", () => {
    const text = "你好世界。今日は晴れです。";
    const locale = "ja-JP";
    const words = [
      ...new Intl.Segmenter(locale, { granularity: "word" }).segment(text),
    ].filter((part) => part.isWordLike).length;
    expect(
      estimateReadingTime(text, { locale, mode: "segmenter" }).wordCount,
    ).toBe(words);
    expect(
      estimateReadingTime(text, { locale, mode: "segmenter" }).method,
    ).toBe("segmenter");
  });
  it("uses configurable reading speed and rounded-up presentation units", () => {
    const text = Array.from({ length: 201 }, () => "word").join(" ");
    expect(estimateReadingTime(text, { mode: "approximate" })).toEqual({
      wordCount: 201,
      minutes: 2,
      seconds: 61,
      method: "approximate",
    });
    expect(
      estimateReadingTime(text, { wordsPerMinute: 100, mode: "approximate" }),
    ).toEqual({
      wordCount: 201,
      minutes: 3,
      seconds: 121,
      method: "approximate",
    });
    expect(estimateReadingTime("one", { mode: "approximate" }).seconds).toBe(1);
  });
  it("falls back when Segmenter is unavailable and explicit mode reports the missing feature", () => {
    const original = Intl.Segmenter;
    Reflect.set(Intl, "Segmenter", undefined);
    try {
      expect(estimateReadingTime("One two three")).toEqual({
        wordCount: 3,
        minutes: 1,
        seconds: 1,
        method: "approximate",
      });
      expect(() => estimateReadingTime("Text", { mode: "segmenter" })).toThrow(
        "unavailable",
      );
    } finally {
      Reflect.set(Intl, "Segmenter", original);
    }
  });
  it("keeps approximate output independent of Segmenter availability", () => {
    const text = "Word 世界 emoji 🙂";
    const before = estimateReadingTime(text, { mode: "approximate" });
    const original = Intl.Segmenter;
    Reflect.set(Intl, "Segmenter", undefined);
    try {
      expect(estimateReadingTime(text, { mode: "approximate" })).toEqual(
        before,
      );
    } finally {
      Reflect.set(Intl, "Segmenter", original);
    }
  });
  it("is deterministic for identical inputs and does not rewrite plain text", () => {
    const text = "‘Quoted prose’ — readable, with references.";
    expect(
      estimateReadingTime(text, { mode: "approximate", wordsPerMinute: 180 }),
    ).toEqual(
      estimateReadingTime(text, { mode: "approximate", wordsPerMinute: 180 }),
    );
    expect(text).toBe("‘Quoted prose’ — readable, with references.");
  });
  it("rejects invalid rates, locale syntax, modes and non-string input", () => {
    for (const wordsPerMinute of [0, -1, Infinity, NaN])
      expect(() => estimateReadingTime("Text", { wordsPerMinute })).toThrow(
        RangeError,
      );
    expect(() =>
      estimateReadingTime("Text", { wordsPerMinute: Number.MIN_VALUE }),
    ).toThrow(RangeError);
    expect(() =>
      estimateReadingTime("Text", { locale: "not_a_locale" }),
    ).toThrow(RangeError);
    expect(() =>
      estimateReadingTime("Text", { mode: "other" as "auto" }),
    ).toThrow(RangeError);
    expect(() => estimateReadingTime(12 as unknown as string)).toThrow(
      TypeError,
    );
  });
});
