import { Combobox as ComboboxBase } from "./combobox-base";
import type { ComboboxProps } from "./types";

export const Combobox = (props: ComboboxProps) => {
  return <ComboboxBase {...props} />;
};

Combobox.displayName = "Combobox";
