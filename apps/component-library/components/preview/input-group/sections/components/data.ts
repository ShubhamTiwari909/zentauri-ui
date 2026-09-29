import { FORM_APPEARANCES } from "@/components/preview/form-fields/appearance-controls";
import type { InputGroupProps } from "@zentauri-ui/zentauri-components/ui/input-group";

export const INPUTGROUP_APPEARANCES =
  FORM_APPEARANCES satisfies readonly NonNullable<
    InputGroupProps["appearance"]
  >[];
export const INPUTGROUP_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<InputGroupProps["size"]>[];
