import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  MARQUEE_APPEARANCES,
  MARQUEE_DIRECTIONS,
  MARQUEE_ORIENTATIONS,
  MARQUEE_SIZES,
} from "./components/data";
import { MarqueeDemo } from "./components/demo";
import { marqueeSnippet } from "./components/snippets";

export function MarqueeCodeExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Marquee variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {MARQUEE_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={marqueeSnippet({ appearance })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <MarqueeDemo appearance={appearance} />
          </PreviewCodeShowcase>
        ))}

        {MARQUEE_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={marqueeSnippet({ appearance: "outline", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <MarqueeDemo appearance="outline" size={size} />
          </PreviewCodeShowcase>
        ))}

        {MARQUEE_ORIENTATIONS.map((orientation) => (
          <PreviewCodeShowcase
            key={`orientation-${orientation}`}
            code={marqueeSnippet({
              appearance: "emerald",
              orientation,
              speed: orientation === "vertical" ? 24 : 30,
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Orientation:{" "}
              <span className="font-bold">{orientation.toUpperCase()}</span>
            </p>
            <MarqueeDemo
              appearance="emerald"
              orientation={orientation}
              speed={orientation === "vertical" ? 24 : 30}
            />
          </PreviewCodeShowcase>
        ))}

        {MARQUEE_DIRECTIONS.map((direction) => (
          <PreviewCodeShowcase
            key={`direction-${direction}`}
            code={marqueeSnippet({
              appearance: "gradient-blue",
              direction,
              orientation:
                direction === "up" || direction === "down"
                  ? "vertical"
                  : "horizontal",
            })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Direction:{" "}
              <span className="font-bold">{direction.toUpperCase()}</span>
            </p>
            <MarqueeDemo
              appearance="gradient-blue"
              direction={direction}
              orientation={
                direction === "up" || direction === "down"
                  ? "vertical"
                  : "horizontal"
              }
            />
          </PreviewCodeShowcase>
        ))}

        <PreviewCodeShowcase
          code={marqueeSnippet({
            appearance: "card",
            fade: false,
            pauseOnHover: false,
          })}
        >
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Behavior: <span className="font-bold">NO FADE, NO HOVER PAUSE</span>
          </p>
          <MarqueeDemo appearance="card" fade={false} pauseOnHover={false} />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
