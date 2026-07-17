"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { useControllableState } from "../../../hooks/useControllableState";

import { CalendarBase } from "../calendar-base";
import { startOfMonth } from "../date-utils";
import type { CalendarSelectionValue } from "../types";
import type { CalendarAnimatedProps } from "./types";
import { calendarAnimationPresets } from "./animations";

function selectionMonthAnchor(value: CalendarSelectionValue): Date | undefined {
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value[0];
  if (value && value.from instanceof Date) return value.from;
  return undefined;
}

/**
 * Animated calendar: controls the visible month itself so month navigation can
 * be animated with AnimatePresence, keyed by the visible year-month.
 */
export const CalendarAnimated = ({
  animation = "slide",
  month,
  defaultMonth,
  onMonthChange,
  ref,
  ...props
}: CalendarAnimatedProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Computed once (lazy) so render bodies stay deterministic.
  const [fallbackMonth] = useState(() => startOfMonth(new Date()));
  const [visibleMonth, setVisibleMonth] = useControllableState<Date>({
    value: month ? startOfMonth(month) : undefined,
    defaultValue: startOfMonth(
      defaultMonth ??
        selectionMonthAnchor(props.defaultValue ?? props.value) ??
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
          <CalendarBase
            {...props}
            month={visibleMonth}
            onMonthChange={setVisibleMonth}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

CalendarAnimated.displayName = "CalendarAnimated";
