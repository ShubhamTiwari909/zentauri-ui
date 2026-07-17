"use client";

import { useCallback } from "react";

import { CalendarAnimated } from "../../calendar/animated/calendar-animated";
import type { CalendarBaseProps } from "../../calendar/types";
import { DatePickerBase } from "../date-picker-base";
import type { DatePickerAnimatedProps } from "./types";

/**
 * Date picker whose embedded calendar animates month navigation with
 * framer-motion (`slide` by default). Everything else matches the static entry.
 */
export const DatePickerAnimated = ({
  animation = "slide",
  ...props
}: DatePickerAnimatedProps) => {
  const AnimatedCalendar = useCallback(
    (calendarProps: CalendarBaseProps) => (
      <CalendarAnimated {...calendarProps} animation={animation} />
    ),
    [animation],
  );

  return <DatePickerBase {...props} calendarComponent={AnimatedCalendar} />;
};

DatePickerAnimated.displayName = "DatePickerAnimated";
