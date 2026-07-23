"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import { cn } from "../../../lib/utils";
import { useWizard } from "../wizard-base";
import { wizardContentVariants } from "../variants";

import {
  wizardContentAnimationPresets,
  type WizardAnimation,
} from "./animations";
import type { WizardContentAnimatedProps } from "./types";

export function WizardContentAnimated({
  className,
  children,
  animation = "slide",
  ref,
  ...rest
}: WizardContentAnimatedProps) {
  const { currentStep } = useWizard();

  const presets = useMemo(
    () => wizardContentAnimationPresets[animation],
    [animation],
  );
  const motionless = animation === "none";

  return (
    <div
      ref={ref}
      data-slot="wizard-content"
      className={cn(
        wizardContentVariants(),
        "relative overflow-hidden",
        className,
      )}
      {...rest}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          data-slot="wizard-content-inner"
          className={cn(motionless ? "" : "w-full")}
          initial={motionless ? false : "exit"}
          animate="enter"
          exit="exit"
          variants={presets.variants}
          transition={presets.transition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

WizardContentAnimated.displayName = "WizardContentAnimated";
