import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  SCROLL_AREA_APPEARANCES,
  SCROLL_AREA_ORIENTATIONS,
  SCROLL_AREA_SCROLLBARS,
  SCROLL_AREA_SIZES,
} from "./components/data";
import { ScrollAreaDemo } from "./components/demo";
import { scrollAreaSnippet } from "./components/snippets";

export function ScrollAreaCodeExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Scroll area variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SCROLL_AREA_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={scrollAreaSnippet({
              appearance,
              orientation: "vertical",
              scrollbar: "auto",
              size: "md",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> |
              Orientation: <span className="font-bold">VERTICAL</span>
            </p>
            <ScrollAreaDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}

        {SCROLL_AREA_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={scrollAreaSnippet({
              appearance: "outline",
              orientation: "vertical",
              scrollbar: "auto",
              size,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">OUTLINE</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <ScrollAreaDemo appearance="outline" size={size} />
          </PreviewCodeShowcase>
        ))}

        {SCROLL_AREA_ORIENTATIONS.map((orientation) => (
          <PreviewCodeShowcase
            key={`orientation-${orientation}`}
            code={scrollAreaSnippet({
              appearance: "sky",
              orientation,
              scrollbar: "auto",
              size: "md",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Orientation:{" "}
              <span className="font-bold">{orientation.toUpperCase()}</span> |
              Appearance: <span className="font-bold">SKY</span>
            </p>
            <ScrollAreaDemo appearance="sky" orientation={orientation} />
          </PreviewCodeShowcase>
        ))}

        {SCROLL_AREA_SCROLLBARS.map((scrollbar) => (
          <PreviewCodeShowcase
            key={`scrollbar-${scrollbar}`}
            code={scrollAreaSnippet({
              appearance: "glass",
              orientation: "vertical",
              scrollbar,
              shadow: scrollbar === "hover",
              size: "md",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Scrollbar:{" "}
              <span className="font-bold">{scrollbar.toUpperCase()}</span> |
              Appearance: <span className="font-bold">GLASS</span>
            </p>
            <ScrollAreaDemo
              appearance="glass"
              scrollbar={scrollbar}
              shadow={scrollbar === "hover"}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
