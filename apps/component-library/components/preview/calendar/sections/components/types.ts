import type { CalendarProps } from "@zentauri-ui/zentauri-components/ui/calendar";
import type { CalendarAnimation } from "@zentauri-ui/zentauri-components/ui/calendar/animated";

export type CalendarAppearance = NonNullable<CalendarProps["appearance"]>;
export type CalendarSize = NonNullable<CalendarProps["size"]>;
export type CalendarMode = NonNullable<CalendarProps["mode"]>;
export type CalendarCaptionLayout = NonNullable<CalendarProps["captionLayout"]>;

export type CalendarDemoProps = {
  mode: CalendarMode;
  appearance: CalendarAppearance;
  size: CalendarSize;
  captionLayout?: CalendarCaptionLayout;
  showWeekNumbers?: boolean;
  animation?: CalendarAnimation;
};
