import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
import { AccordionContentAnimated } from "@zentauri-ui/zentauri-components/ui/accordion/animated";

import type { AccordionDemoProps } from "./accordion-code-examples.types";

function accordionDemoItems(transition: AccordionDemoProps["transition"]) {
  return (
    <>
      <AccordionItem value="a">
        <AccordionTrigger>First panel</AccordionTrigger>
        <AccordionContentAnimated transitionVariant={transition}>
          <p className="text-sm">Content for the first item.</p>
        </AccordionContentAnimated>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second panel</AccordionTrigger>
        <AccordionContentAnimated transitionVariant={transition}>
          <p className="text-sm">Content for the second item.</p>
        </AccordionContentAnimated>
      </AccordionItem>
    </>
  );
}

export function AccordionDemo({
  appearance,
  size,
  type,
  transition,
}: AccordionDemoProps) {
  if (type === "single") {
    return (
      <Accordion
        type="single"
        defaultValue="a"
        appearance={appearance}
        size={size}
        className="space-y-4"
      >
        {accordionDemoItems(transition)}
      </Accordion>
    );
  }
  return (
    <Accordion
      type="multiple"
      defaultValues={["a"]}
      appearance={appearance}
      size={size}
      className="space-y-4"
    >
      {accordionDemoItems(transition)}
    </Accordion>
  );
}
