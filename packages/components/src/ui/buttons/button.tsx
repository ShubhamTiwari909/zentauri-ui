// button.tsx — default static entry (no framer-motion)
import { ButtonBase } from "./button-base";
import type { ButtonProps } from "./types";

export const Button = (props: ButtonProps) => {
  return <ButtonBase {...props} />;
};

Button.displayName = "Button";
