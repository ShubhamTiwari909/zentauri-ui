import type { CommandContentProps } from "@zentauri-ui/zentauri-components/ui/command";

export const COMMAND_APPEARANCES = [
  "default",
  "glass",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
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
] as const satisfies readonly NonNullable<CommandContentProps["appearance"]>[];

export const COMMAND_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CommandContentProps["size"]>[];
