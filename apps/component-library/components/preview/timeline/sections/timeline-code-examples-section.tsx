import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { TimelineDemo } from "./components/timeline-code-examples-demo";
import {
  TIMELINE_APPEARANCES,
  TIMELINE_SIZES,
  TIMELINE_TRANSITIONS,
} from "./components/timeline-code-examples.data";
import { timelineSnippet } from "./components/timeline-code-examples.snippets";

export function TimelineCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Timeline variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TIMELINE_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={timelineSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <TimelineDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {TIMELINE_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={timelineSnippet({ appearance: "default", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <TimelineDemo appearance="default" size={size} />
          </PreviewCodeShowcase>
        ))}
        {TIMELINE_TRANSITIONS.map((transition) => (
          <PreviewCodeShowcase
            key={`trans-${transition}`}
            code={timelineSnippet({
              appearance: "indigo",
              size: "md",
              animated: true,
              transition,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 md:text-sm dark:text-white">
              Animated:{" "}
              <span className="font-bold">{transition.toUpperCase()}</span>
            </p>
            <TimelineDemo
              appearance="indigo"
              size="md"
              animated
              transition={transition}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
