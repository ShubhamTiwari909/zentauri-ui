import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@zentauri-ui/zentauri-components/ui/accordion";

import type { AccordionDemoProps } from "./accordion-code-examples.types";

export function AccordionDemo({
  appearance,
  size,
  type,
  transition,
}: AccordionDemoProps) {
  const body = (
    <>
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
    </>
  );
  if (type === "single") {
    return (
      <Accordion
        type="single"
        defaultValue="a"
        appearance={appearance}
        size={size}
        transition={transition}
        className="space-y-4"
      >
        {body}
      </Accordion>
    );
  }
  return (
    <Accordion
      type="multiple"
      defaultValues={["a"]}
      appearance={appearance}
      size={size}
      transition={transition}
      className="space-y-4"
    >
      {body}
    </Accordion>
  );
}
