"use client";

import { useRef, type ComponentType } from "react";

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
  // `calendarComponent` selects the React component type DatePickerBase
  // renders — its IDENTITY must stay stable across renders, or DatePickerBase
  // unmounts/remounts the whole calendar (losing month/selection state) every
  // time `animation` changes. A ref-created, once-only component reads the
  // latest `animation` through a ref instead of closing over the prop value.
  const animationRef = useRef(animation);
  animationRef.current = animation;

  const calendarComponentRef =
    useRef<ComponentType<CalendarBaseProps>>(undefined);
  if (!calendarComponentRef.current) {
    function AnimatedCalendarSlot(calendarProps: CalendarBaseProps) {
      return (
        <CalendarAnimated {...calendarProps} animation={animationRef.current} />
      );
    }
    calendarComponentRef.current = AnimatedCalendarSlot;
  }

  return (
    <DatePickerBase
      {...props}
      calendarComponent={calendarComponentRef.current}
    />
  );
};

DatePickerAnimated.displayName = "DatePickerAnimated";
