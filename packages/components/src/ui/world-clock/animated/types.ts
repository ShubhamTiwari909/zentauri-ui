import type { WorldClockBaseProps } from "../types";
import type { WorldClockAnimation } from "./animations";

export interface WorldClockAnimatedProps extends WorldClockBaseProps {
  animation?: WorldClockAnimation;
}
