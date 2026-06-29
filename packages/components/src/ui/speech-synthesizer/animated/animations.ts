import type {
  SpeechRecognitionAnimation as SpeechSynthesizerAnimation,
  SpeechRecognitionAnimationPresets as SpeechSynthesizerAnimationPresets,
} from "../../speech-recognition/animated/animations";
import { speechRecognitionAnimationPresets } from "../../speech-recognition/animated/animations";

export type { SpeechSynthesizerAnimation, SpeechSynthesizerAnimationPresets };

export const speechSynthesizerAnimationPresets: SpeechSynthesizerAnimationPresets =
  speechRecognitionAnimationPresets;
