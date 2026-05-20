import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";

export function AccordionExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Toggle between the live accordion and JSX using the same controls as
        other component previews.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`type · single, appearance · outline, size · sm`)}
<Accordion type="single" defaultValue="a" appearance="outline" size="sm">
  <AccordionItem value="a">
    <AccordionTrigger>First panel</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm text-slate-900 dark:text-slate-300">Content for the first item.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Second panel</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm text-slate-900 dark:text-slate-300">Content for the second item.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion
            type="single"
            defaultValue="a"
            appearance="outline"
            size="sm"
          >
            <AccordionItem value="a">
              <AccordionTrigger>First panel</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-slate-900 dark:text-slate-300">
                  Content for the first item.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Second panel</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-slate-900 dark:text-slate-300">
                  Content for the second item.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
