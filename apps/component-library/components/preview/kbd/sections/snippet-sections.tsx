import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { KbdAnimated } from "@zentauri-ui/zentauri-components/ui/kbd/animated";

import { KBD_APPEARANCES, KBD_SIZES } from "./components/data";
import { KbdDemo } from "./components/demo";
import {
  kbdAnimatedSnippet,
  kbdSnippet,
} from "./components/snippets";

export function KbdCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Kbd variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {KBD_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={kbdSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> |
              Size: <span className="font-bold">MD</span>
            </p>
            <KbdDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {KBD_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={kbdSnippet({ appearance: "outline", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">OUTLINE</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <KbdDemo appearance="outline" size={size} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase key="animated" code={kbdAnimatedSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Motion: <span className="font-bold">ANIMATED KEY PRESS</span>
          </p>
          <KbdAnimated
            animation="press"
            appearance="indigo"
            keys={["⌘", "K"]}
            separator="+"
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
