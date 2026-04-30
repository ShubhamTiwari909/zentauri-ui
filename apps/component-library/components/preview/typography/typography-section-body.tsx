import {
  Blockquote,
  CodeBlock,
  Heading,
  InlineCode,
  List,
  ListItem,
  Text,
} from "@zentauri-ui/zentauri-components/ui/typography";

import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

import { TYPOGRAPHY_TONES } from "./sections/components/typography-code-examples.data";

const panel =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

function ToneGridHeading() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPOGRAPHY_TONES.map((tone) => (
        <div key={tone} className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Heading level={3} tone={tone}>
            Tone: {tone}
          </Heading>
        </div>
      ))}
    </div>
  );
}

function ToneGridText() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPOGRAPHY_TONES.map((tone) => (
        <div key={tone} className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Text tone={tone}>Paragraph tone — {tone}</Text>
        </div>
      ))}
    </div>
  );
}

function ToneGridLists() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPOGRAPHY_TONES.map((tone) => (
        <div key={tone} className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Text className="mb-2 text-xs uppercase tracking-wide text-slate-500">
            {tone}
          </Text>
          <List tone={tone}>
            <ListItem>Alpha</ListItem>
            <ListItem>Beta</ListItem>
          </List>
        </div>
      ))}
    </div>
  );
}

function ToneGridBlockquote() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPOGRAPHY_TONES.map((tone) => (
        <div key={tone} className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Blockquote tone={tone} attribution={`${tone}`}>
            <Text as="p">Short quotation sample.</Text>
          </Blockquote>
        </div>
      ))}
    </div>
  );
}

function ToneGridInline() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPOGRAPHY_TONES.map((tone) => (
        <div key={tone} className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Text tone={tone}>
            Tone {tone} with <InlineCode>token</InlineCode>
          </Text>
        </div>
      ))}
    </div>
  );
}

function ToneGridCodeBlock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPOGRAPHY_TONES.map((tone) => (
        <div key={tone} className="space-y-2 rounded-xl border border-white/10 bg-white/3 p-4">
          <Text className="text-xs uppercase tracking-wide text-slate-500">{tone}</Text>
          <CodeBlock tone={tone} language="ts">{`export const tone = "${tone}";`}</CodeBlock>
        </div>
      ))}
    </div>
  );
}

function VariantsForSection({ section }: { section: TypographySectionSlug }) {
  switch (section) {
    case "heading":
      return <ToneGridHeading />;
    case "paragraph":
      return <ToneGridText />;
    case "lists":
      return <ToneGridLists />;
    case "blockquote":
      return <ToneGridBlockquote />;
    case "inline":
      return <ToneGridInline />;
    case "code-block":
      return <ToneGridCodeBlock />;
    default:
      return null;
  }
}

function FormattingSection({ section }: { section: TypographySectionSlug }) {
  if (section === "heading") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Heading level={4} bold italic>
            Bold + italic
          </Heading>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/3 p-4">
          <Heading level={4} underline strikethrough tone="muted">
            Underline + strike
          </Heading>
        </div>
      </div>
    );
  }

  if (section === "lists") {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Text className="mb-2 text-xs uppercase tracking-wide text-slate-500">
            Unordered markers
          </Text>
          <List marker="disc">
            <ListItem>Disc (default)</ListItem>
          </List>
          <List marker="circle" className="mt-3">
            <ListItem>Circle marker</ListItem>
          </List>
          <List marker="none" className="mt-3">
            <ListItem>None marker</ListItem>
          </List>
        </div>
        <div>
          <Text className="mb-2 text-xs uppercase tracking-wide text-slate-500">
            Ordered
          </Text>
          <List ordered>
            <ListItem>First</ListItem>
            <ListItem>Second</ListItem>
          </List>
        </div>
      </div>
    );
  }

  if (section === "code-block") {
    return (
      <div className="space-y-4">
        <CodeBlock language="json">{`{\n  \"name\": \"zentauri-ui\",\n  \"private\": true\n}`}</CodeBlock>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-white/3 p-4">
        <Text bold italic underline>
          Bold + italic + underline
        </Text>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/3 p-4">
        <Text strikethrough highlight tone="muted">
          Highlight + muted + strike
        </Text>
      </div>
    </div>
  );
}

function CombinationsSection({ section }: { section: TypographySectionSlug }) {
  switch (section) {
    case "heading":
      return (
        <Heading level={2} bold underline tone="primary">
          Hero-style heading combo
        </Heading>
      );
    case "paragraph":
      return (
        <Text tone="muted" italic size="lg">
          Supporting paragraph with muted italic emphasis at larger size.
        </Text>
      );
    case "lists":
      return (
        <List ordered>
          <ListItem>Ship typography primitives</ListItem>
          <ListItem>
            <div>
              Layer previews
              <List className="mt-2">
                <ListItem>Animate sparingly</ListItem>
                <ListItem>Measure contrast</ListItem>
              </List>
            </div>
          </ListItem>
        </List>
      );
    case "blockquote":
      return (
        <Blockquote tone="accent" attribution="Release notes · April 2026">
          <Text as="p">Accent quotation blocks draw attention without breaking rhythm.</Text>
        </Blockquote>
      );
    case "inline":
      return (
        <Text tone="secondary">
          Deploy via <InlineCode>npx zentauri-ui add typography</InlineCode> then verify{" "}
          <Text as="span" bold tone="destructive">
            destructive warnings
          </Text>{" "}
          when deleting routes.
        </Text>
      );
    case "code-block":
      return (
        <CodeBlock language="tsx">{`import { Text } from "@zentauri-ui/zentauri-components/ui/typography";

export function Demo() {
  return <Text tone="muted">Preview-ready body copy.</Text>;
}`}</CodeBlock>
      );
    default:
      return null;
  }
}

export function TypographySectionBody({
  section,
}: {
  section: TypographySectionSlug;
}) {
  return (
    <>
      <section className={panel}>
        <h2 className="text-2xl font-semibold text-white">Variants showcase</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Tone tokens align with dark shells across Zentauri previews—swap surfaces thoughtfully.
        </p>
        <div className="mt-6">
          <VariantsForSection section={section} />
        </div>
      </section>

      <section className={panel}>
        <h2 className="text-2xl font-semibold text-white">Formatting showcase</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Boolean emphasis props layer Tailwind utilities consistently.
        </p>
        <div className="mt-6">
          <FormattingSection section={section} />
        </div>
      </section>

      <section className={panel}>
        <h2 className="text-2xl font-semibold text-white">Combination examples</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Patterns you can paste into marketing pages and dashboards.
        </p>
        <div className="mt-6 space-y-4">
          <CombinationsSection section={section} />
        </div>
      </section>
    </>
  );
}
