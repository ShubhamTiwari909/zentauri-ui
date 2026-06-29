import { cva } from "class-variance-authority";

import {
  zuiSpeechRecognitionAppearances,
  zuiSpeechRecognitionBase,
  zuiSpeechRecognitionBtnActive,
  zuiSpeechRecognitionBtnBase,
  zuiSpeechRecognitionBtnSizes,
  zuiSpeechRecognitionSizes,
  zuiSpeechRecognitionStatusBase,
  zuiSpeechRecognitionTranscriptBase,
} from "../../design-system/speech-recognition";

export const speechRecognitionVariants = cva(
  zuiSpeechRecognitionBase.join(" "),
  {
    variants: {
      size: zuiSpeechRecognitionSizes,
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const speechRecognitionBtnVariants = cva(
  zuiSpeechRecognitionBtnBase.join(" "),
  {
    variants: {
      appearance: zuiSpeechRecognitionAppearances,
      size: zuiSpeechRecognitionBtnSizes,
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);

export const speechRecognitionStatusClasses =
  zuiSpeechRecognitionStatusBase.join(" ");

export const speechRecognitionTranscriptClasses =
  zuiSpeechRecognitionTranscriptBase.join(" ");

export const speechRecognitionBtnActiveClasses =
  zuiSpeechRecognitionBtnActive.join(" ");
