import { CheckboxBase } from "./checkbox-base";
import type { CheckboxProps } from "./types";

export function Checkbox(props: CheckboxProps) {
  return <CheckboxBase {...props} />;
}

Checkbox.displayName = "Checkbox";
