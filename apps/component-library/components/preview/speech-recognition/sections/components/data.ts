import type { SpeechRecognitionProps } from "@zentauri-ui/zentauri-components/ui/speech-recognition";
import type { SpeechRecognitionAnimation } from "@zentauri-ui/zentauri-components/ui/speech-recognition/animated";

export const SPEECH_RECOGNITION_APPEARANCES = [
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
  SpeechRecognitionProps["appearance"]
>[];

export const SPEECH_RECOGNITION_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SpeechRecognitionProps["size"]>[];

export const SPEECH_RECOGNITION_ANIMATIONS = [
  "none",
  "pulse",
  "wave",
  "glow",
] as const satisfies readonly SpeechRecognitionAnimation[];
