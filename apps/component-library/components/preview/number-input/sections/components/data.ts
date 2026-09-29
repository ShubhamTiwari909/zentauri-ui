import { FORM_APPEARANCES } from "@/components/preview/form-fields/appearance-controls";
import type { NumberInputProps } from "@zentauri-ui/zentauri-components/ui/number-input";

export const NUMBERINPUT_APPEARANCES =
  FORM_APPEARANCES satisfies readonly NonNullable<
    NumberInputProps["appearance"]
  >[];
export const NUMBERINPUT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<NumberInputProps["size"]>[];
