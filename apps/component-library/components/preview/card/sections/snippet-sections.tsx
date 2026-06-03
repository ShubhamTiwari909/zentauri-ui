import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { CardDemo } from "./components/demo";
import { CARD_APPEARANCES, CARD_ROUNDED, CARD_SIZES } from "./components/data";
import { cardSnippet } from "./components/snippets";

export function CardCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Card variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Appearance, size, and rounded radius tokens with a minimal header
        layout. Code blocks start with Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CARD_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={cardSnippet({ appearance, size: "md", rounded: "md" })}
          >
            <CardDemo appearance={appearance} size="md" rounded="md" />
          </PreviewCodeShowcase>
        ))}
        {CARD_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={cardSnippet({ appearance: "glass", size, rounded: "md" })}
          >
            <CardDemo appearance="glass" size={size} rounded="md" />
          </PreviewCodeShowcase>
        ))}
        {CARD_ROUNDED.map((rounded) => (
          <PreviewCodeShowcase
            key={`rounded-${rounded}`}
            code={cardSnippet({ appearance: "outline", size: "md", rounded })}
          >
            <CardDemo appearance="outline" size="md" rounded={rounded} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
