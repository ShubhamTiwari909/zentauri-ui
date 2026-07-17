import type { Ref } from "react";

import type { CalendarBaseProps } from "../types";
import type { CalendarAnimation } from "./animations";

export type { CalendarAnimation };

export type CalendarAnimatedProps = CalendarBaseProps & {
  animation?: CalendarAnimation;
  ref?: Ref<HTMLDivElement>;
};
