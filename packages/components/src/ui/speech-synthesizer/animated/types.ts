import type { Ref } from "react";

import type { SpeechSynthesizerBaseProps } from "../types";
import type { SpeechSynthesizerAnimation } from "./animations";

export type { SpeechSynthesizerAnimation };

export type SpeechSynthesizerAnimatedProps = SpeechSynthesizerBaseProps & {
  animation?: SpeechSynthesizerAnimation;
  ref?: Ref<HTMLDivElement>;
};
