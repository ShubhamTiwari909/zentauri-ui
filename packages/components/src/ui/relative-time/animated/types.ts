import type { RelativeTimeBaseProps } from "../types";
import type { RelativeTimeAnimation } from "./animations";

export interface RelativeTimeAnimatedProps extends RelativeTimeBaseProps {
  animation?: RelativeTimeAnimation;
}
