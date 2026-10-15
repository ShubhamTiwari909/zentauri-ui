export type ReadingTimeOptions = {
  /** Product estimate, not a universal reading speed; default 200. */
  wordsPerMinute?: number;
  locale?: string | string[];
  /** Pin approximate to avoid Segmenter-availability differences across runtimes. */
  mode?: "auto" | "segmenter" | "approximate";
};
export type ReadingTimeEstimate = {
  wordCount: number;
  minutes: number;
  seconds: number;
  method: "segmenter" | "approximate";
};

/** Estimates from plain text; does not parse HTML, Markdown or React children. */
export function estimateReadingTime(
  text: string,
  {
    wordsPerMinute = 200,
    locale = "en-US",
    mode = "auto",
  }: ReadingTimeOptions = {},
): ReadingTimeEstimate {
  if (typeof text !== "string")
    throw new TypeError("Reading-time input must be plain text");
  if (!Number.isFinite(wordsPerMinute) || wordsPerMinute <= 0)
    throw new RangeError("wordsPerMinute must be a positive finite number");
  if (!["auto", "segmenter", "approximate"].includes(mode))
    throw new RangeError("Unknown reading-time mode");
  const locales = Intl.getCanonicalLocales(locale);
  if (!locales.includes("en-US")) locales.push("en-US");
  const supported = typeof Intl.Segmenter === "function";
  if (mode === "segmenter" && !supported)
    throw new Error(
      "Intl.Segmenter is unavailable; use auto or approximate mode",
    );
  const method =
    mode !== "approximate" && supported ? "segmenter" : "approximate";
  let wordCount = 0;
  if (method === "segmenter") {
    const segmenter = new Intl.Segmenter(locales, { granularity: "word" });
    for (const part of segmenter.segment(text))
      if (part.isWordLike) wordCount++;
  } else {
    // Letter/number runs with combining marks and internal apostrophes.
    const words =
      /[\p{L}\p{N}][\p{L}\p{N}\p{M}]*(?:['’][\p{L}\p{N}][\p{L}\p{N}\p{M}]*)*/gu;
    for (const ignored of text.matchAll(words)) {
      void ignored;
      wordCount++;
    }
  }
  const duration = wordCount / wordsPerMinute;
  if (!Number.isFinite(duration * 60))
    throw new RangeError("Reading estimate exceeds the supported duration");
  return {
    wordCount,
    minutes: Math.ceil(duration),
    seconds: Math.ceil(duration * 60),
    method,
  };
}
