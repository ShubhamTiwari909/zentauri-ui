import { Calendar } from "@zentauri-ui/zentauri-components/ui/calendar";
import { CalendarAnimated } from "@zentauri-ui/zentauri-components/ui/calendar/animated";

import { DEMO_MONTH, DEMO_TODAY } from "./demo-dates";
import type { CalendarDemoProps } from "./types";

export function CalendarDemo({
  mode,
  appearance,
  size,
  captionLayout = "label",
  showWeekNumbers = false,
  animation = "none",
}: CalendarDemoProps) {
  const shared = {
    appearance,
    size,
    captionLayout,
    showWeekNumbers,
    defaultMonth: DEMO_MONTH,
    today: DEMO_TODAY,
    locale: "en-US",
  } as const;

  if (animation !== "none") {
    if (mode === "multiple") {
      return (
        <CalendarAnimated {...shared} mode="multiple" animation={animation} />
      );
    }
    if (mode === "range") {
      return (
        <CalendarAnimated {...shared} mode="range" animation={animation} />
      );
    }
    return <CalendarAnimated {...shared} animation={animation} />;
  }

  if (mode === "multiple") {
    return <Calendar {...shared} mode="multiple" />;
  }
  if (mode === "range") {
    return <Calendar {...shared} mode="range" />;
  }
  return <Calendar {...shared} />;
}
