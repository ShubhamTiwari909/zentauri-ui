import { cva } from "class-variance-authority";

import {
  zuiCalendarBase,
  zuiCalendarCaption,
  zuiCalendarDayAppearances,
  zuiCalendarDayBase,
  zuiCalendarDayCell,
  zuiCalendarDaySizes,
  zuiCalendarDropdown,
  zuiCalendarGrid,
  zuiCalendarHeader,
  zuiCalendarMonth,
  zuiCalendarMonths,
  zuiCalendarNavButton,
  zuiCalendarSizes,
  zuiCalendarWeekNumber,
  zuiCalendarWeekday,
} from "../../design-system/calendar";

export const calendarVariants = cva([...zuiCalendarBase], {
  variants: {
    size: zuiCalendarSizes,
  },
  defaultVariants: {
    size: "md",
  },
});

export const calendarDayVariants = cva([...zuiCalendarDayBase], {
  variants: {
    appearance: zuiCalendarDayAppearances,
    size: zuiCalendarDaySizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const calendarNavButtonVariants = cva(zuiCalendarNavButton);

export const calendarCaptionVariants = cva(zuiCalendarCaption);

export const calendarDropdownVariants = cva(zuiCalendarDropdown);

export const calendarGridVariants = cva(zuiCalendarGrid);

export const calendarWeekdayVariants = cva(zuiCalendarWeekday);

export const calendarWeekNumberVariants = cva(zuiCalendarWeekNumber);

export const calendarDayCellVariants = cva(zuiCalendarDayCell);

export const calendarMonthsVariants = cva(zuiCalendarMonths);

export const calendarMonthVariants = cva(zuiCalendarMonth);

export const calendarHeaderVariants = cva(zuiCalendarHeader);
