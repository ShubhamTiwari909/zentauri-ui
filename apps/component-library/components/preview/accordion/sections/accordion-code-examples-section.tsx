import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { AccordionDemo } from "./components/accordion-code-examples-demo";
import {
  ACCORDION_APPEARANCES,
  ACCORDION_CODE_EXAMPLES_SECTION_CLASS,
  ACCORDION_SIZES,
  ACCORDION_TRANSITIONS,
} from "./components/accordion-code-examples.data";
import { accordionSnippet } from "./components/accordion-code-examples.snippets";

export function AccordionCodeExamplesSection() {
  return (
    <section className={ACCORDION_CODE_EXAMPLES_SECTION_CLASS}>
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
            <p className="mb-5 text-xs md:text-sm font-semibold text-white">
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
            <p className="mb-5 text-xs md:text-sm font-semibold text-white">
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
          <p className="mb-5 text-xs md:text-sm font-semibold text-white">
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
          <p className="mb-5 text-xs md:text-sm font-semibold text-white">
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
            <p className="mb-5 text-xs md:text-sm font-semibold text-white">
              Transition:{" "}
              <span className="font-bold">{transition.toUpperCase()}</span>
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
