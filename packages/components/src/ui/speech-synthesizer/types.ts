import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, Ref } from "react";

import type {
  speechSynthesizerBtnVariants,
  speechSynthesizerVariants,
} from "./variants";

export type SpeechSynthesizerVariantProps = VariantProps<
  typeof speechSynthesizerBtnVariants
>;

export type SpeechSynthesizerState = "idle" | "speaking" | "paused";

export type SpeechSynthesizerBaseProps = VariantProps<
  typeof speechSynthesizerVariants
> &
  VariantProps<typeof speechSynthesizerBtnVariants> &
  ComponentPropsWithRef<"div"> & {
    text?: string;
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    autoSpeak?: boolean;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: string) => void;
    onStateChange?: (state: SpeechSynthesizerState) => void;
    renderPlay?: (props: {
      isSpeaking: boolean;
      isPaused: boolean;
      state: SpeechSynthesizerState;
    }) => React.ReactNode;
    renderPause?: (props: {
      isSpeaking: boolean;
      isPaused: boolean;
      state: SpeechSynthesizerState;
    }) => React.ReactNode;
    renderStop?: (props: {
      isSpeaking: boolean;
      isPaused: boolean;
      state: SpeechSynthesizerState;
    }) => React.ReactNode;
    showProgress?: boolean;
    children?: React.ReactNode;
  };

export type SpeechSynthesizerProps = SpeechSynthesizerBaseProps;

export type SpeechSynthesizerRef = {
  speak: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  state: SpeechSynthesizerState;
};
