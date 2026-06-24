import type { Ref } from "react";

import type { TypingIndicatorBaseProps } from "../types";
import type { TypingIndicatorAnimation } from "./animations";

export type { TypingIndicatorAnimation };

export type TypingIndicatorAnimatedProps = TypingIndicatorBaseProps & {
  animation?: TypingIndicatorAnimation;
  ref?: Ref<HTMLSpanElement>;
};
