import type { ModalContentProps } from "@zentauri-ui/zentauri-components/ui/modal";

export const MODAL_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const MODAL_TRIGGER_CLASS = "rounded-lg px-3 py-1.5 text-sm";

export const MODAL_SIZES = [
  "sm",
  "md",
  "lg",
  "xl",
  "full",
] as const satisfies readonly NonNullable<ModalContentProps["size"]>[];

export const MODAL_POSITIONS = [
  "center",
  "top",
  "bottom",
] as const satisfies readonly NonNullable<ModalContentProps["position"]>[];

export const MODAL_APPEARANCES = [
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
  "gradient-orange",
] as const satisfies readonly NonNullable<ModalContentProps["appearance"]>[];

export const MODAL_ANIMATIONS = [
  "none",
  "fade",
  "scale",
  "slide-up",
  "slide-down",
] as const satisfies readonly NonNullable<ModalContentProps["animation"]>[];
