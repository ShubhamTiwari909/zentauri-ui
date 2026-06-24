import type { TypingIndicatorProps } from "@zentauri-ui/zentauri-components/ui/typing-indicator";

export const TYPING_INDICATOR_APPEARANCES = [
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
  "gradient-blue",
  "gradient-green",
  "gradient-purple",
] as const satisfies readonly NonNullable<TypingIndicatorProps["appearance"]>[];

export const TYPING_INDICATOR_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TypingIndicatorProps["size"]>[];

export const TYPING_INDICATOR_ANIMATIONS = [
  "none",
  "bounce",
  "pulse",
  "wave",
] as const;
