import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { BadgeDemo } from "./components/badge-code-examples-demo";
import {
  BADGE_APPEARANCES,
  BADGE_CODE_EXAMPLES_SECTION_CLASS,
  BADGE_SHAPES,
  BADGE_SIZES,
} from "./components/badge-code-examples.data";
import { badgeSnippet } from "./components/badge-code-examples.snippets";

export function BadgeCodeExamplesSection() {
  return (
    <section className={BADGE_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Badge variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Appearance tokens (pill, medium), then sizes, then shapes including dot.
        Each snippet begins with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {BADGE_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={badgeSnippet({ appearance, size: "md", shape: "pill" })}
          >
            <BadgeDemo appearance={appearance} size="md" shape="pill" />
          </PreviewCodeShowcase>
        ))}
        {BADGE_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={badgeSnippet({
              appearance: "gradient-indigo",
              size,
              shape: "pill",
            })}
          >
            <BadgeDemo appearance="gradient-indigo" size={size} shape="pill" />
          </PreviewCodeShowcase>
        ))}
        {BADGE_SHAPES.map((shape) => (
          <PreviewCodeShowcase
            key={`shape-${shape}`}
            code={badgeSnippet({ appearance: "emerald", size: "md", shape })}
          >
            <BadgeDemo appearance="emerald" size="md" shape={shape} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
