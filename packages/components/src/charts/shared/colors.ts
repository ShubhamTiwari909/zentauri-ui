import type { ChartColor, ChartSeries } from "./types";
import { chartPalette } from "./variants";

export function resolveColor(
  color: ChartColor | string | undefined,
  index: number,
) {
  if (color && color in chartPalette) {
    return chartPalette[color as ChartColor];
  }
  if (color) {
    return { stroke: color, fill: color };
  }

  const paletteValues = Object.values(chartPalette);
  return paletteValues[index % paletteValues.length] ?? chartPalette.cyan;
}

export function getSeriesFill(
  series: ChartSeries,
  index: number,
  opacity = 0.18,
) {
  const color = resolveColor(series.color, index);
  return (
    series.fill ??
    `${color.fill}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`
  );
}
