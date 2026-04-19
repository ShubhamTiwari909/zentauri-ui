import { InputBase } from "./input-base";
import type { InputProps } from "./types";

export const Input = (props: InputProps) => {
  return <InputBase {...props} />;
};

Input.displayName = "Input";
