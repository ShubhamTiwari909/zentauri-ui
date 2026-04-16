import type { AlertProps } from "@zentauri-ui/zentauri-components/ui/alert";

export const ALERT_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const ALERT_APPEARANCES = [
  "default",
  "success",
  "warning",
  "error",
  "info",
  "ghost",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "gray",
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
] as const satisfies readonly NonNullable<AlertProps["appearance"]>[];

export const ALERT_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  AlertProps["size"]
>[];
