import { TimezoneSelect } from "@zentauri-ui/zentauri-components/ui/timezone-select";
import type { TimezoneSelectProps } from "@zentauri-ui/zentauri-components/ui/timezone-select";

export type TimezoneSelectDemoProps = {
  appearance: NonNullable<TimezoneSelectProps["appearance"]>;
  size: NonNullable<TimezoneSelectProps["size"]>;
  showTime: boolean;
  showOffset: boolean;
  groupByRegion: boolean;
};

export function TimezoneSelectDemo({
  appearance,
  size,
  showTime,
  showOffset,
  groupByRegion,
}: TimezoneSelectDemoProps) {
  return (
    <TimezoneSelect
      appearance={appearance}
      size={size}
      showTime={showTime}
      showOffset={showOffset}
      groupByRegion={groupByRegion}
      placeholder="Pick a timezone…"
    />
  );
}
