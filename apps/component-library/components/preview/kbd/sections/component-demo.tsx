import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";
import { KbdAnimated } from "@zentauri-ui/zentauri-components/ui/kbd/animated";

export function KbdExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Kbd renders keyboard shortcuts as semantic keycaps. Pass a single key
        via children, or a chord via the keys array with an optional separator.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("single key")}<Kbd>Esc</Kbd>`}
        >
          <Kbd>Esc</Kbd>
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("key chord with separator")}<Kbd keys={["⌘", "K"]} separator="+" />`}
        >
          <Kbd keys={["⌘", "K"]} separator="+" />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("word separator")}<Kbd keys={["G", "I"]} separator="then" appearance="secondary" />`}
        >
          <Kbd keys={["G", "I"]} separator="then" appearance="secondary" />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("animated key press")}import { KbdAnimated } from "@zentauri-ui/zentauri-components/ui/kbd/animated";

<KbdAnimated
  animation="press"
  appearance="indigo"
  keys={["⌘", "K"]}
  separator="+"
/>`}
        >
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
