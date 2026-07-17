import type { Ref } from "react";

import type { DatePickerBaseProps } from "../types";
import type { DatePickerAnimation } from "./animations";

export type { DatePickerAnimation };

export type DatePickerAnimatedProps = DatePickerBaseProps & {
  /** Month-navigation animation for the embedded calendar. */
  animation?: DatePickerAnimation;
  ref?: Ref<HTMLButtonElement>;
};
