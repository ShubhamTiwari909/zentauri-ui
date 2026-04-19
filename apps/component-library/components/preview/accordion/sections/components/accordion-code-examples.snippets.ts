import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { AccordionTransition } from "@zentauri-ui/zentauri-components/ui/accordion";

import type {
  AccordionAppearance,
  AccordionDemoType,
  AccordionSize,
} from "./accordion-code-examples.types";

export function accordionSnippet(
  appearance: AccordionAppearance,
  size: AccordionSize,
  type: AccordionDemoType,
  transition: AccordionTransition,
): string {
  const typeLine =
    type === "single"
      ? 'type="single" defaultValue="a"'
      : 'type="multiple" defaultValues={["a"]}';
  return `import { Accordion, AccordionItem, AccordionTrigger } from "@zentauri-ui/zentauri-components/ui/accordion";
import { AccordionContentAnimated } from "@zentauri-ui/zentauri-components/ui/accordion/animated";

${variantLeadComment(`type · ${type}, appearance · ${appearance}, size · ${size}, transition · ${transition}`)}<Accordion ${typeLine} appearance="${appearance}" size="${size}" className="space-y-4">
  <AccordionItem value="a">
    <AccordionTrigger>First panel</AccordionTrigger>
    <AccordionContentAnimated transitionVariant="${transition}">
      <p className="text-sm">Content for the first item.</p>
    </AccordionContentAnimated>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Second panel</AccordionTrigger>
    <AccordionContentAnimated transitionVariant="${transition}">
      <p className="text-sm">Content for the second item.</p>
    </AccordionContentAnimated>
  </AccordionItem>
</Accordion>`;
}
