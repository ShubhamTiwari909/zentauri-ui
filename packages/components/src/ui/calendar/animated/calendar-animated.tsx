"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { useControllableState } from "../../../hooks/useControllableState";

import { CalendarBase } from "../calendar-base";
import { selectionMonthAnchor, startOfMonth } from "../date-utils";
import type { CalendarBaseProps, CalendarSelectionValue } from "../types";
import type { CalendarAnimatedProps } from "./types";
import { calendarAnimationPresets } from "./animations";

/**
 * Animated calendar: controls the visible month itself so month navigation can
 * be animated with AnimatePresence, keyed by the visible year-month.
 *
 * The selection value is ALSO lifted here (not left to `CalendarBase`'s own
 * internal state): `AnimatePresence`'s `key={monthKey}` remounts the inner
 * `CalendarBase` on every month change, which would reset an uncontrolled
 * selection back to its `defaultValue`. Tracking `value` at this stable
 * outer layer and always passing it down means the remounted instance
 * receives its current selection as a controlled prop instead of losing it.
 */
export const CalendarAnimated = ({
  animation = "slide",
  month,
  defaultMonth,
  onMonthChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  ref,
  ...props
}: CalendarAnimatedProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Computed once (lazy) so render bodies stay deterministic.
  const [fallbackMonth] = useState(() => startOfMonth(new Date()));

  const [value, setValue] = useControllableState<CalendarSelectionValue>({
    value: valueProp,
    defaultValue: defaultValue as CalendarSelectionValue,
    onChange: onValueChange as
      | ((next: CalendarSelectionValue) => void)
      | undefined,
  });

  const [visibleMonth, setVisibleMonth] = useControllableState<Date>({
    value: month ? startOfMonth(month) : undefined,
    defaultValue: startOfMonth(
      defaultMonth ??
        selectionMonthAnchor(defaultValue ?? valueProp) ??
        props.today ??
        fallbackMonth,
    ),
    onChange: onMonthChange,
  });
  const directionRef = useRef(1);
  const previousMonthRef = useRef(visibleMonth);

  if (visibleMonth.getTime() !== previousMonthRef.current.getTime()) {
    directionRef.current =
      visibleMonth.getTime() > previousMonthRef.current.getTime() ? 1 : -1;
    previousMonthRef.current = visibleMonth;
  }

  const preset =
    calendarAnimationPresets[prefersReducedMotion ? "none" : animation];
  const monthKey = `${visibleMonth.getFullYear()}-${visibleMonth.getMonth()}`;

  // `value`/`onValueChange` are re-typed generically above (mirroring the
  // same discriminated-union cast `CalendarBase` and `DatePickerBase` use
  // internally) so this component doesn't need one branch per `mode`.
  const calendarProps = {
    ...props,
    value,
    defaultValue,
    onValueChange: setValue,
    month: visibleMonth,
    onMonthChange: setVisibleMonth,
  } as CalendarBaseProps;

  return (
    <div ref={ref} data-slot="calendar-animated" className="relative">
      <AnimatePresence
        mode="popLayout"
        initial={false}
        custom={directionRef.current}
      >
        <motion.div
          key={monthKey}
          custom={directionRef.current}
          variants={preset.variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={
            prefersReducedMotion ? { duration: 0 } : preset.transition
          }
        >
          <CalendarBase {...calendarProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

CalendarAnimated.displayName = "CalendarAnimated";
