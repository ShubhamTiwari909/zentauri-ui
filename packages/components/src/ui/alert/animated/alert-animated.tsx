import { motion } from "framer-motion";
import { AlertBase } from "../alert-base";
import { alertAnimationPresets } from "./animations";
import type { AlertAnimatedProps } from "./types";

export const AlertAnimated = ({
  animation = "none",
  ...props
}: AlertAnimatedProps) => {
  const motionProps = alertAnimationPresets[animation];

  return (
    <AlertBase
      as={motion.div}
      initial={animation === "none" ? false : undefined}
      {...motionProps}
      {...props}
    />
  );
};
