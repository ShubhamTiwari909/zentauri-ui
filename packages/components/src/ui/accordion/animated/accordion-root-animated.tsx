"use client";

import { AccordionBase } from "../accordion-base";
import type { AccordionAnimatedProps } from "./types";

export function Accordion(props: AccordionAnimatedProps) {
  return <AccordionBase {...props} />;
}

Accordion.displayName = "Accordion";
