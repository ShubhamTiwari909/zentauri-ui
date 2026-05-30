import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  RATING_APPEARANCES,
  RATING_ICONS,
  RATING_SIZES,
} from "./components/rating-code-examples.data";
import {
  RatingCustomIconDemo,
  RatingDemo,
  RatingValidationDemo,
} from "./components/rating-code-examples-demo";
import {
  ratingCustomIconSnippet,
  ratingSnippet,
  ratingValidationSnippet,
} from "./components/rating-code-examples.snippets";

export function RatingCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Rating variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {RATING_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={ratingSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> |
              Size: <span className="font-bold">MD</span>
            </p>
            <RatingDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {RATING_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={ratingSnippet({ appearance: "amber", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">AMBER</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <RatingDemo appearance="amber" size={size} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="half-clear"
          code={ratingSnippet({
            allowClear: true,
            allowHalf: true,
            appearance: "glass",
            size: "md",
          })}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Behavior: <span className="font-bold">HALF + CLEAR</span>
          </p>
          <RatingDemo allowClear allowHalf appearance="glass" size="md" />
        </PreviewCodeShowcase>
        {RATING_ICONS.map((icon) => (
          <PreviewCodeShowcase
            key={`icon-${icon}`}
            code={ratingSnippet({
              appearance: icon === "heart" ? "rose" : "amber",
              icon,
              size: "md",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Icon:{" "}
              <span className="font-bold">{String(icon).toUpperCase()}</span>
            </p>
            <RatingDemo
              appearance={icon === "heart" ? "rose" : "amber"}
              icon={icon}
              size="md"
            />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase key="custom-icon" code={ratingCustomIconSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Icon: <span className="font-bold">CUSTOM REACT ICON</span>
          </p>
          <RatingCustomIconDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="validation" code={ratingValidationSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            State: <span className="font-bold">VALIDATION</span>
          </p>
          <RatingValidationDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
