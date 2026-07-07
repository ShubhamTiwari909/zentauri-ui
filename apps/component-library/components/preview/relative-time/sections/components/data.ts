import type { RelativeTimeProps } from "@zentauri-ui/zentauri-components/ui/relative-time";

export const RELATIVE_TIME_APPEARANCES = [
  "default",
  "primary",
  "secondary",
  "badge",
  "blue",
  "green",
  "red",
  "outline",
  "ghost",
] as const satisfies readonly NonNullable<RelativeTimeProps["appearance"]>[];

export const RELATIVE_TIME_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<RelativeTimeProps["size"]>[];
