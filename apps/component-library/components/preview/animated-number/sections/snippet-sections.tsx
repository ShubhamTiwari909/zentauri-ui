import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";

import { AnimatedNumberDemo } from "./components/demo";
import {
  ANIMATED_NUMBER_APPEARANCES,
  ANIMATED_NUMBER_SIZES,
  ANIMATED_NUMBER_TYPES,
} from "./components/data";
import { animatedNumberSnippet } from "./components/snippets";

export function AnimatedNumberCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Animated Number variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {ANIMATED_NUMBER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={animatedNumberSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <AnimatedNumberDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {ANIMATED_NUMBER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={animatedNumberSnippet({ appearance: "default", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <AnimatedNumberDemo appearance="default" size={size} />
          </PreviewCodeShowcase>
        ))}
        {ANIMATED_NUMBER_TYPES.map((type) => (
          <PreviewCodeShowcase
            key={`type-${type}`}
            code={animatedNumberSnippet({
              appearance: "indigo",
              size: "md",
              type,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
              Animation: <span className="font-bold">{type.toUpperCase()}</span>
            </p>
            <AnimatedNumberDemo appearance="indigo" size="md" type={type} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="counter"
          code={animatedNumberSnippet({
            appearance: "orange",
            size: "lg",
            counter: true,
          })}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
            Counter: <span className="font-bold">COUNT UP</span>
          </p>
          <AnimatedNumberDemo appearance="orange" size="lg" counter />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
