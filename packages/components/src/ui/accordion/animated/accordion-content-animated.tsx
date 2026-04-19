"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import { accordionContentTransitionPresets } from "./animations";
import { useAccordionContext, useAccordionItemValue } from "../accordion-base";
import { accordionContentVariants } from "../variants";
import { AccordionContentAnimatedProps } from "./types";

export function AccordionContentAnimated({
  className,
  children,
  transitionVariant = "default",
  ref,
}: AccordionContentAnimatedProps) {
  const itemValue = useAccordionItemValue("AccordionContent");
  const {
    isOpen,
    size,
  } = useAccordionContext("AccordionContent");
  const open = isOpen(itemValue);
  const panelId = `${itemValue}-panel`;
  const transitionConfig = accordionContentTransitionPresets[transitionVariant];
  const motionless = transitionVariant === "none";

  return open ? (
    <motion.div
      key={itemValue}
      ref={ref}
      id={panelId}
      role="region"
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ size }), className)}
      initial={motionless ? false : { opacity: 0 }}
      animate={motionless ? undefined : { opacity: 1 }}
      exit={motionless ? undefined : { opacity: 0 }}
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  ) : null;
}

AccordionContentAnimated.displayName = "AccordionContentAnimated";
