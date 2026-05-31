import type { CopyButtonProps } from "@zentauri-ui/zentauri-components/ui/copy-button";

export const COPY_BUTTON_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "glass",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<CopyButtonProps["appearance"]>[];

export const COPY_BUTTON_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CopyButtonProps["size"]>[];
