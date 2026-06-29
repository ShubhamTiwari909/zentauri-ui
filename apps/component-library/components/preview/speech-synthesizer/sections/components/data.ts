import type { SpeechSynthesizerProps } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer";
import type { SpeechSynthesizerAnimation } from "@zentauri-ui/zentauri-components/ui/speech-synthesizer/animated";

export const SPEECH_SYNTHESIZER_APPEARANCES = [
  "default",
  "subtle",
  "muted",
  "primary",
  "blue",
  "cyan",
  "green",
  "lime",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gray",
  "zinc",
] as const satisfies readonly NonNullable<
  SpeechSynthesizerProps["appearance"]
>[];

export const SPEECH_SYNTHESIZER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SpeechSynthesizerProps["size"]>[];

export const SPEECH_SYNTHESIZER_ANIMATIONS = [
  "none",
  "pulse",
  "wave",
  "glow",
] as const satisfies readonly SpeechSynthesizerAnimation[];
