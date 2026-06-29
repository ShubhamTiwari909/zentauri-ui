import type { Ref } from "react";

import type { SpeechRecognitionBaseProps } from "../types";
import type { SpeechRecognitionAnimation } from "./animations";

export type { SpeechRecognitionAnimation };

export type SpeechRecognitionAnimatedProps = SpeechRecognitionBaseProps & {
  animation?: SpeechRecognitionAnimation;
  ref?: Ref<HTMLDivElement>;
};
