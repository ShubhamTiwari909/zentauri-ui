"use client";

import { NumberInput } from "@zentauri-ui/zentauri-components/ui/number-input";
import type {
  FormAppearance,
  FormSize,
} from "@/components/preview/form-fields/appearance-controls";
export type NumberInputDemoProps = {
  appearance: FormAppearance;
  size: FormSize;
};
export function NumberInputDemo({ appearance, size }: NumberInputDemoProps) {
  return (
    <NumberInput
      appearance={appearance}
      size={size}
      aria-label="Quantity"
      defaultValue={2}
      min={0}
      max={10}
      step={0.5}
    />
  );
}
