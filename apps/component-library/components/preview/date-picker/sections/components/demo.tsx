import { DatePicker } from "@zentauri-ui/zentauri-components/ui/date-picker";
import { DatePickerAnimated } from "@zentauri-ui/zentauri-components/ui/date-picker/animated";

import type { DatePickerDemoProps } from "./types";

// Fixed "today" keeps the demo deterministic across server and client renders.
const DEMO_TODAY = new Date(2026, 6, 7);

export function DatePickerDemo({
  mode,
  appearance,
  size,
  clearable = false,
  animation = "none",
}: DatePickerDemoProps) {
  const shared = {
    appearance,
    size,
    clearable,
    today: DEMO_TODAY,
    locale: "en-US",
  } as const;

  if (animation !== "none") {
    if (mode === "range") {
      return (
        <div className="w-72">
          <DatePickerAnimated {...shared} mode="range" animation={animation} />
        </div>
      );
    }
    return (
      <div className="w-56">
        <DatePickerAnimated {...shared} animation={animation} />
      </div>
    );
  }

  if (mode === "range") {
    return (
      <div className="w-72">
        <DatePicker {...shared} mode="range" />
      </div>
    );
  }
  return (
    <div className="w-56">
      <DatePicker {...shared} />
    </div>
  );
}
