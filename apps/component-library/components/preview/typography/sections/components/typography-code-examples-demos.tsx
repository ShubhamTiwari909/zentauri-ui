import {
  Blockquote,
  CodeBlock,
  Heading,
  InlineCode,
  List,
  ListItem,
  Text,
} from "@zentauri-ui/zentauri-components/ui/typography";

import type {
  AppTypographyTone,
  HeadingLevelShowcase,
  ListMarkerVariant,
  TextSizeVariant,
} from "./typography-code-examples.data";

export function HeadingToneDemo({ tone }: { tone: AppTypographyTone }) {
  return (
    <Heading level={3} tone={tone}>
      Section title
    </Heading>
  );
}

export function HeadingLevelDemo({ level }: { level: HeadingLevelShowcase }) {
  return <Heading level={level}>Heading level {level}</Heading>;
}

export function HeadingEmphasisDemo() {
  return (
    <Heading level={3} bold underline tone="primary">
      Callout title
    </Heading>
  );
}

export function TextToneDemo({ tone }: { tone: AppTypographyTone }) {
  return <Text tone={tone}>Body copy for dense interfaces.</Text>;
}

export function TextSizeDemo({ size }: { size: TextSizeVariant }) {
  return <Text size={size}>Sized paragraph text.</Text>;
}

export function TextEmphasisDemo() {
  return (
    <Text italic highlight tone="muted">
      Beta feature — subject to change.
    </Text>
  );
}

export function ListToneDemo({ tone }: { tone: AppTypographyTone }) {
  return (
    <List tone={tone}>
      <ListItem>First bullet</ListItem>
      <ListItem>Second bullet</ListItem>
    </List>
  );
}

export function ListOrderedDemo() {
  return (
    <List ordered>
      <ListItem>Download kit</ListItem>
      <ListItem>Wire tokens</ListItem>
    </List>
  );
}

export function ListMarkerDemo({ marker }: { marker: ListMarkerVariant }) {
  return (
    <List marker={marker}>
      <ListItem>Marker sample</ListItem>
    </List>
  );
}

export function BlockquoteToneDemo({ tone }: { tone: AppTypographyTone }) {
  return (
    <Blockquote attribution="Design Systems Weekly" tone={tone}>
      <Text as="p">Composable primitives beat monolithic widgets.</Text>
    </Blockquote>
  );
}

export function InlineToneDemo({ tone }: { tone: AppTypographyTone }) {
  return (
    <Text tone={tone}>
      Run <InlineCode>pnpm lint</InlineCode> before merge.
    </Text>
  );
}

export function InlineEmphasisDemo() {
  return (
    <Text tone="secondary">
      Deploy via <InlineCode>npx zentauri-ui add typography</InlineCode> then verify{" "}
      <Text as="span" bold tone="destructive">
        destructive warnings
      </Text>
    </Text>
  );
}

export function CodeBlockToneDemo({ tone }: { tone: AppTypographyTone }) {
  return (
    <CodeBlock tone={tone} language="ts">{`export const tone = "${tone}";`}</CodeBlock>
  );
}

export function CodeBlockLanguageBashDemo() {
  return (
    <CodeBlock language="bash">
      pnpm add @zentauri-ui/zentauri-components
    </CodeBlock>
  );
}

const TSX_SAMPLE = [
  'import { Text } from "@zentauri-ui/zentauri-components/ui/typography";',
  "",
  "export function Demo() {",
  '  return <Text tone="muted">Ready.</Text>;',
  "}",
].join("\n");

export function CodeBlockLanguageTsxDemo() {
  return <CodeBlock language="tsx">{TSX_SAMPLE}</CodeBlock>;
}
