import { WorldClock } from "@zentauri-ui/zentauri-components/ui/world-clock";
import type {
  WorldClockProps,
  WorldClockCardVariantProps,
} from "@zentauri-ui/zentauri-components/ui/world-clock";

export type WorldClockDemoProps = {
  cardAppearance: NonNullable<WorldClockCardVariantProps["appearance"]>;
  cardSize: NonNullable<WorldClockCardVariantProps["size"]>;
  layout: NonNullable<WorldClockProps["layout"]>;
  showDate: boolean;
  showSeconds: boolean;
  showDayNight: boolean;
  showOffsetFromLocal: boolean;
};

export function WorldClockDemo({
  cardAppearance,
  cardSize,
  layout,
  showDate,
  showSeconds,
  showDayNight,
  showOffsetFromLocal,
}: WorldClockDemoProps) {
  return (
    <WorldClock
      zones={["America/New_York", "Europe/London", "Asia/Tokyo"]}
      cardAppearance={cardAppearance}
      cardSize={cardSize}
      layout={layout}
      showDate={showDate}
      showSeconds={showSeconds}
      showDayNight={showDayNight}
      showOffsetFromLocal={showOffsetFromLocal}
    />
  );
}
