import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, Ref } from "react";

import type {
  speechRecognitionBtnVariants,
  speechRecognitionVariants,
} from "./variants";

export type SpeechRecognitionVariantProps = VariantProps<
  typeof speechRecognitionBtnVariants
>;

export type SpeechRecognitionState =
  | "idle"
  | "listening"
  | "processing"
  | "error";

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export type SpeechRecognitionBaseProps = VariantProps<
  typeof speechRecognitionVariants
> &
  VariantProps<typeof speechRecognitionBtnVariants> &
  ComponentPropsWithRef<"div"> & {
    lang?: string;
    continuous?: boolean;
    interimResults?: boolean;
    autoStart?: boolean;
    onResult?: (result: SpeechRecognitionResult) => void;
    onError?: (error: string) => void;
    onStateChange?: (state: SpeechRecognitionState) => void;
    renderMic?: (props: {
      isListening: boolean;
      state: SpeechRecognitionState;
    }) => React.ReactNode;
    children?: React.ReactNode;
  };

export type SpeechRecognitionProps = SpeechRecognitionBaseProps;

export type SpeechRecognitionRef = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  state: SpeechRecognitionState;
};
