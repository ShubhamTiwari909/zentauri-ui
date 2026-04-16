import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type {
  AccordionAppearance,
  AccordionDemoType,
  AccordionSize,
  AccordionTransition,
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
  return `${variantLeadComment(`type · ${type}, appearance · ${appearance}, size · ${size}, transition · ${transition}`)}<Accordion ${typeLine} appearance="${appearance}" size="${size}" transition="${transition}" className="space-y-4">
  <AccordionItem value="a">
    <AccordionTrigger>First panel</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm">Content for the first item.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Second panel</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm">Content for the second item.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`;
}
