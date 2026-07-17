import { Calendar } from "@zentauri-ui/zentauri-components/ui/calendar";
import { CalendarAnimated } from "@zentauri-ui/zentauri-components/ui/calendar/animated";

import type { CalendarDemoProps } from "./types";

// Fixed dates keep the demo deterministic across server and client renders.
const DEMO_MONTH = new Date(2026, 6, 1);
const DEMO_TODAY = new Date(2026, 6, 7);

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
