import { cva } from "class-variance-authority";

import {
  zuiSpeechSynthesizerAppearances,
  zuiSpeechSynthesizerBase,
  zuiSpeechSynthesizerBtnActive,
  zuiSpeechSynthesizerBtnBase,
  zuiSpeechSynthesizerBtnSizes,
  zuiSpeechSynthesizerControlsBase,
  zuiSpeechSynthesizerProgressBarBase,
  zuiSpeechSynthesizerProgressBase,
  zuiSpeechSynthesizerSizes,
  zuiSpeechSynthesizerTextBase,
} from "../../design-system/speech-synthesizer";

export const speechSynthesizerVariants = cva(
  zuiSpeechSynthesizerBase.join(" "),
  {
    variants: {
      size: zuiSpeechSynthesizerSizes,
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const speechSynthesizerBtnVariants = cva(
  zuiSpeechSynthesizerBtnBase.join(" "),
  {
    variants: {
      appearance: zuiSpeechSynthesizerAppearances,
      size: zuiSpeechSynthesizerBtnSizes,
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
);

export const speechSynthesizerTextClasses =
  zuiSpeechSynthesizerTextBase.join(" ");

export const speechSynthesizerControlsClasses =
  zuiSpeechSynthesizerControlsBase.join(" ");

export const speechSynthesizerBtnActiveClasses =
  zuiSpeechSynthesizerBtnActive.join(" ");

export const speechSynthesizerProgressClasses =
  zuiSpeechSynthesizerProgressBase.join(" ");

export const speechSynthesizerProgressBarClasses =
  zuiSpeechSynthesizerProgressBarBase.join(" ");
