// accordion.tsx — default static entry (no framer-motion on content)
import { AccordionBase, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion-base";
import type { AccordionProps } from "./types";

export function Accordion(props: AccordionProps) {
  return <AccordionBase {...props} />;
}

Accordion.displayName = "Accordion";

export { AccordionContent, AccordionItem, AccordionTrigger };
