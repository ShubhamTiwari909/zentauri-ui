"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
} from "@/components/ui/accordion";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const ACCORDION_APPEARANCES = [
  "default",
  "outline",
  "ghost",
  "card",
  "separated",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
] as const satisfies readonly NonNullable<AccordionProps["appearance"]>[];

const ACCORDION_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<AccordionProps["size"]>[];

const ACCORDION_TRANSITIONS = [
  "none",
  "default",
  "smooth",
  "slow",
] as const satisfies readonly NonNullable<AccordionProps["transition"]>[];

function accordionSnippet(
  appearance: NonNullable<AccordionProps["appearance"]>,
  size: NonNullable<AccordionProps["size"]>,
  type: "single" | "multiple",
  transition: NonNullable<AccordionProps["transition"]>,
) {
  const typeLine =
    type === "single"
      ? 'type="single" defaultValue="a"'
      : 'type="multiple" defaultValues={["a"]}';
  return `${variantLeadComment(`type · ${type}, appearance · ${appearance}, size · ${size}, transition · ${transition}`)}<Accordion ${typeLine} appearance="${appearance}" size="${size}" transition="${transition}" className="space-y-4">
  <AccordionItem value="a">
    <AccordionTrigger>First panel</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm text-slate-300">Content for the first item.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Second panel</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm text-slate-300">Content for the second item.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`;
}

function AccordionDemo({
  appearance,
  size,
  type,
  transition,
}: {
  appearance: NonNullable<AccordionProps["appearance"]>;
  size: NonNullable<AccordionProps["size"]>;
  type: "single" | "multiple";
  transition: NonNullable<AccordionProps["transition"]>;
}) {
  const body = (
    <>
      <AccordionItem value="a">
        <AccordionTrigger>First panel</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-slate-300">Content for the first item.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second panel</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-slate-300">Content for the second item.</p>
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

export function AccordionCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Accordion variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {ACCORDION_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={accordionSnippet(appearance, "md", "single", "default")}
          >
            <p className="mb-5 text-xs font-semibold text-white">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <AccordionDemo
              appearance={appearance}
              size="md"
              type="single"
              transition="default"
            />
          </PreviewCodeShowcase>
        ))}
        {ACCORDION_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={accordionSnippet("default", size, "single", "default")}
          >
            <p className="mb-5 text-xs font-semibold text-white">
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <AccordionDemo
              appearance="default"
              size={size}
              type="single"
              transition="default"
            />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="type-single"
          code={accordionSnippet("outline", "md", "single", "default")}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Type: <span className="font-bold">Single</span>
          </p>
          <AccordionDemo
            appearance="outline"
            size="md"
            type="single"
            transition="default"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="type-multiple"
          code={accordionSnippet("outline", "md", "multiple", "default")}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Type: <span className="font-bold">Multiple</span>
          </p>
          <AccordionDemo
            appearance="outline"
            size="md"
            type="multiple"
            transition="default"
          />
        </PreviewCodeShowcase>
        {ACCORDION_TRANSITIONS.map((transition) => (
          <PreviewCodeShowcase
            key={`trans-${transition}`}
            code={accordionSnippet("ghost", "md", "single", transition)}
          >
            <p className="mb-5 text-xs font-semibold text-white">
              Transition: <span className="font-bold">{transition.toUpperCase()}</span>
            </p>
            <AccordionDemo
              appearance="ghost"
              size="md"
              type="single"
              transition={transition}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
