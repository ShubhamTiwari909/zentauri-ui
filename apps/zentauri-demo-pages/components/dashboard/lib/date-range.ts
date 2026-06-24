export type DateRange = "7d" | "30d" | "90d" | "ytd";

export const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "ytd", label: "Year to date" },
];

/** Reference "today" for deterministic mock filtering. */
const REFERENCE = new Date("2026-06-21T12:00:00");

function cutoffForRange(range: DateRange): Date {
  const d = new Date(REFERENCE);
  switch (range) {
    case "7d":
      d.setDate(d.getDate() - 7);
      return d;
    case "30d":
      d.setDate(d.getDate() - 30);
      return d;
    case "90d":
      d.setDate(d.getDate() - 90);
      return d;
    case "ytd":
      return new Date(d.getFullYear(), 0, 1);
  }
}

export function filterByIsoDate<T extends { date: string }>(
  rows: readonly T[],
  range: DateRange,
): T[] {
  const cutoff = cutoffForRange(range);
  return rows.filter((row) => new Date(row.date) >= cutoff);
}

/** Slice a time series by range — longer ranges show more points. */
export function sliceSeries<T>(data: readonly T[], range: DateRange): T[] {
  const take =
    range === "7d"
      ? 2
      : range === "30d"
        ? 4
        : range === "90d"
          ? 6
          : data.length;
  return data.slice(-take);
}
