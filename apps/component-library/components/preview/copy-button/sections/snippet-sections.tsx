import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CopyButtonAnimated } from "@zentauri-ui/zentauri-components/ui/copy-button/animated";

import { COPY_BUTTON_APPEARANCES, COPY_BUTTON_SIZES } from "./components/data";
import { CopyButtonDemo } from "./components/demo";
import {
  copyButtonAnimatedSnippet,
  copyButtonSnippet,
} from "./components/snippets";

export function CopyButtonCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Copy button variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {COPY_BUTTON_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={copyButtonSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> |
              Size: <span className="font-bold">MD</span>
            </p>
            <CopyButtonDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {COPY_BUTTON_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={copyButtonSnippet({ appearance: "default", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">DEFAULT</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <CopyButtonDemo appearance="default" size={size} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase key="animated" code={copyButtonAnimatedSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Motion: <span className="font-bold">ANIMATED ICON SWAP</span>
          </p>
          <CopyButtonAnimated
            animation="swap"
            appearance="indigo"
            value="zentauri-ui"
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
