import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

import {
  BlockquoteToneDemo,
  CodeBlockLanguageBashDemo,
  CodeBlockLanguageTsxDemo,
  CodeBlockToneDemo,
  HeadingEmphasisDemo,
  HeadingLevelDemo,
  HeadingToneDemo,
  InlineEmphasisDemo,
  InlineToneDemo,
  ListMarkerDemo,
  ListOrderedDemo,
  ListToneDemo,
  TextEmphasisDemo,
  TextSizeDemo,
  TextToneDemo,
} from "./components/typography-code-examples-demos";
import {
  HEADING_LEVEL_SHOWCASE,
  LIST_MARKERS,
  TEXT_SIZE_VARIANTS,
  TYPOGRAPHY_CODE_EXAMPLES_SECTION_CLASS,
  TYPOGRAPHY_TONES,
} from "./components/typography-code-examples.data";
import {
  blockquoteToneSnippet,
  codeBlockLanguageBashSnippet,
  codeBlockLanguageTsxSnippet,
  codeBlockToneSnippet,
  headingEmphasisSnippet,
  headingLevelSnippet,
  headingToneSnippet,
  inlineEmphasisSnippet,
  inlineToneSnippet,
  listMarkerSnippet,
  listOrderedSnippet,
  listToneSnippet,
  textEmphasisSnippet,
  textSizeSnippet,
  textToneSnippet,
} from "./components/typography-code-examples.snippets";

function VariantLabel({ detail }: { detail: string }) {
  return (
    <p className="mb-5 text-xs md:text-sm font-semibold text-white">
      Variant:{" "}
      <span className="font-bold">{detail}</span>
    </p>
  );
}

function TypographyCodeExampleRows({ section }: { section: TypographySectionSlug }) {
  switch (section) {
    case "heading":
      return (
        <>
          {TYPOGRAPHY_TONES.map((tone) => (
            <PreviewCodeShowcase
              key={`heading-tone-${tone}`}
              code={headingToneSnippet(tone)}
            >
              <VariantLabel detail={`HEADING · TONE · ${tone.toUpperCase()}`} />
              <HeadingToneDemo tone={tone} />
            </PreviewCodeShowcase>
          ))}
          {HEADING_LEVEL_SHOWCASE.map((level) => (
            <PreviewCodeShowcase
              key={`heading-level-${level}`}
              code={headingLevelSnippet(level)}
            >
              <VariantLabel detail={`HEADING · LEVEL · ${level}`} />
              <HeadingLevelDemo level={level} />
            </PreviewCodeShowcase>
          ))}
          <PreviewCodeShowcase key="heading-emphasis" code={headingEmphasisSnippet()}>
            <VariantLabel detail="HEADING · EMPHASIS · BOLD + UNDERLINE + PRIMARY" />
            <HeadingEmphasisDemo />
          </PreviewCodeShowcase>
        </>
      );
    case "paragraph":
      return (
        <>
          {TYPOGRAPHY_TONES.map((tone) => (
            <PreviewCodeShowcase
              key={`text-tone-${tone}`}
              code={textToneSnippet(tone)}
            >
              <VariantLabel detail={`TEXT · TONE · ${tone.toUpperCase()}`} />
              <TextToneDemo tone={tone} />
            </PreviewCodeShowcase>
          ))}
          {TEXT_SIZE_VARIANTS.map((size) => (
            <PreviewCodeShowcase key={`text-size-${size}`} code={textSizeSnippet(size)}>
              <VariantLabel detail={`TEXT · SIZE · ${size.toUpperCase()}`} />
              <TextSizeDemo size={size} />
            </PreviewCodeShowcase>
          ))}
          <PreviewCodeShowcase key="text-emphasis" code={textEmphasisSnippet()}>
            <VariantLabel detail="TEXT · EMPHASIS · ITALIC + HIGHLIGHT + MUTED" />
            <TextEmphasisDemo />
          </PreviewCodeShowcase>
        </>
      );
    case "lists":
      return (
        <>
          {TYPOGRAPHY_TONES.map((tone) => (
            <PreviewCodeShowcase
              key={`list-tone-${tone}`}
              code={listToneSnippet(tone)}
            >
              <VariantLabel detail={`LIST · UNORDERED · TONE · ${tone.toUpperCase()}`} />
              <ListToneDemo tone={tone} />
            </PreviewCodeShowcase>
          ))}
          <PreviewCodeShowcase key="list-ordered" code={listOrderedSnippet()}>
            <VariantLabel detail="LIST · ORDERED · DECIMAL" />
            <ListOrderedDemo />
          </PreviewCodeShowcase>
          {LIST_MARKERS.map((marker) => (
            <PreviewCodeShowcase
              key={`list-marker-${marker}`}
              code={listMarkerSnippet(marker)}
            >
              <VariantLabel detail={`LIST · MARKER · ${marker.toUpperCase()}`} />
              <ListMarkerDemo marker={marker} />
            </PreviewCodeShowcase>
          ))}
        </>
      );
    case "blockquote":
      return (
        <>
          {TYPOGRAPHY_TONES.map((tone) => (
            <PreviewCodeShowcase
              key={`blockquote-tone-${tone}`}
              code={blockquoteToneSnippet(tone)}
            >
              <VariantLabel detail={`BLOCKQUOTE · TONE · ${tone.toUpperCase()}`} />
              <BlockquoteToneDemo tone={tone} />
            </PreviewCodeShowcase>
          ))}
        </>
      );
    case "inline":
      return (
        <>
          {TYPOGRAPHY_TONES.map((tone) => (
            <PreviewCodeShowcase
              key={`inline-tone-${tone}`}
              code={inlineToneSnippet(tone)}
            >
              <VariantLabel detail={`INLINE · TONE · ${tone.toUpperCase()}`} />
              <InlineToneDemo tone={tone} />
            </PreviewCodeShowcase>
          ))}
          <PreviewCodeShowcase key="inline-emphasis" code={inlineEmphasisSnippet()}>
            <VariantLabel detail="INLINE · NESTED EMPHASIS · BOLD SPAN" />
            <InlineEmphasisDemo />
          </PreviewCodeShowcase>
        </>
      );
    case "code-block":
      return (
        <>
          {TYPOGRAPHY_TONES.map((tone) => (
            <PreviewCodeShowcase
              key={`code-block-tone-${tone}`}
              code={codeBlockToneSnippet(tone)}
            >
              <VariantLabel detail={`CODE-BLOCK · TONE · ${tone.toUpperCase()}`} />
              <CodeBlockToneDemo tone={tone} />
            </PreviewCodeShowcase>
          ))}
          <PreviewCodeShowcase key="code-block-bash" code={codeBlockLanguageBashSnippet()}>
            <VariantLabel detail="CODE-BLOCK · LANGUAGE · BASH" />
            <CodeBlockLanguageBashDemo />
          </PreviewCodeShowcase>
          <PreviewCodeShowcase key="code-block-tsx" code={codeBlockLanguageTsxSnippet()}>
            <VariantLabel detail="CODE-BLOCK · LANGUAGE · TSX" />
            <CodeBlockLanguageTsxDemo />
          </PreviewCodeShowcase>
        </>
      );
    default:
      return null;
  }
}

export function TypographyCodeExamplesSection({
  section,
}: {
  section: TypographySectionSlug;
}) {
  return (
    <section className={TYPOGRAPHY_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Typography variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Density mirrors other previews: each row pairs live output with the matching import and JSX.
        Use Show output / Show code on every row; snippets start with{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">
          // Variant:
        </code>{" "}
        naming the token row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <TypographyCodeExampleRows section={section} />
      </div>
    </section>
  );
}
