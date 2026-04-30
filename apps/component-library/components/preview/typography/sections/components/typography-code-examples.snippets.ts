import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type {
  AppTypographyTone,
  ListMarkerVariant,
  TextSizeVariant,
} from "./typography-code-examples.data";

const IMPORT_HEADING =
  'import { Heading } from "@zentauri-ui/zentauri-components/ui/typography";';

const IMPORT_TEXT =
  'import { Text } from "@zentauri-ui/zentauri-components/ui/typography";';

const IMPORT_LIST =
  'import { List, ListItem } from "@zentauri-ui/zentauri-components/ui/typography";';

const IMPORT_BLOCKQUOTE =
  'import { Blockquote, Text } from "@zentauri-ui/zentauri-components/ui/typography";';

const IMPORT_INLINE =
  'import { InlineCode, Text } from "@zentauri-ui/zentauri-components/ui/typography";';

const IMPORT_CODE_BLOCK =
  'import { CodeBlock } from "@zentauri-ui/zentauri-components/ui/typography";';

function toneAttr(tone: AppTypographyTone): string {
  return tone === "default" ? "" : ` tone="${tone}"`;
}

export function headingToneSnippet(tone: AppTypographyTone): string {
  const t = toneAttr(tone);
  return `${variantLeadComment(`heading · tone · ${tone}`)}${IMPORT_HEADING}

<Heading level={3}${t}>
  Section title
</Heading>`;
}

export function headingLevelSnippet(level: number): string {
  return `${variantLeadComment(`heading · level · ${level}`)}${IMPORT_HEADING}

<Heading level={${level}}>
  Heading level ${level}
</Heading>`;
}

export function headingEmphasisSnippet(): string {
  return `${variantLeadComment(`heading · emphasis · bold + underline + primary`)}
${IMPORT_HEADING}

<Heading level={3} bold underline tone="primary">
  Callout title
</Heading>`;
}

export function textToneSnippet(tone: AppTypographyTone): string {
  const t = toneAttr(tone);
  return `${variantLeadComment(`text · tone · ${tone}`)}${IMPORT_TEXT}

<Text${t}>
  Body copy for dense interfaces.
</Text>`;
}

export function textSizeSnippet(size: TextSizeVariant): string {
  const sizeAttr = size === "base" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`text · size · ${size}`)}${IMPORT_TEXT}

<Text${sizeAttr}>
  Sized paragraph text.
</Text>`;
}

export function textEmphasisSnippet(): string {
  return `${variantLeadComment(`text · emphasis · italic + highlight + muted`)}
${IMPORT_TEXT}

<Text italic highlight tone="muted">
  Beta feature — subject to change.
</Text>`;
}

export function listToneSnippet(tone: AppTypographyTone): string {
  const t = toneAttr(tone);
  return `${variantLeadComment(`list · unordered · tone · ${tone}`)}${IMPORT_LIST}

<List${t}>
  <ListItem>First bullet</ListItem>
  <ListItem>Second bullet</ListItem>
</List>`;
}

export function listOrderedSnippet(): string {
  return `${variantLeadComment(`list · ordered · decimal`)}
${IMPORT_LIST}

<List ordered>
  <ListItem>Download kit</ListItem>
  <ListItem>Wire tokens</ListItem>
</List>`;
}

export function listMarkerSnippet(marker: ListMarkerVariant): string {
  const markerAttr = marker === "disc" ? "" : ` marker="${marker}"`;
  return `${variantLeadComment(`list · unordered · marker · ${marker}`)}
${IMPORT_LIST}

<List${markerAttr}>
  <ListItem>Marker sample</ListItem>
</List>`;
}

export function blockquoteToneSnippet(tone: AppTypographyTone): string {
  const t = toneAttr(tone);
  return `${variantLeadComment(`blockquote · tone · ${tone}`)}
${IMPORT_BLOCKQUOTE}

<Blockquote attribution="Design Systems Weekly"${t}>
  <Text as="p">Composable primitives beat monolithic widgets.</Text>
</Blockquote>`;
}

export function inlineToneSnippet(tone: AppTypographyTone): string {
  const t = toneAttr(tone);
  return `${variantLeadComment(`inline · text + code · tone · ${tone}`)}
${IMPORT_INLINE}

<Text${t}>
  Run <InlineCode>pnpm lint</InlineCode> before merge.
</Text>`;
}

export function inlineEmphasisSnippet(): string {
  return `${variantLeadComment(`inline · nested emphasis · bold span`)}
${IMPORT_INLINE}

<Text tone="secondary">
  Deploy via <InlineCode>npx zentauri-ui add typography</InlineCode> then verify{" "}
  <Text as="span" bold tone="destructive">
    destructive warnings
  </Text>
</Text>`;
}

export function codeBlockToneSnippet(tone: AppTypographyTone): string {
  const t = toneAttr(tone);
  return `${variantLeadComment(`code-block · tone · ${tone}`)}
${IMPORT_CODE_BLOCK}

<CodeBlock language="ts"${t}>
  export const tone = "${tone}";
</CodeBlock>`;
}

export function codeBlockLanguageBashSnippet(): string {
  return `${variantLeadComment(`code-block · language · bash`)}
${IMPORT_CODE_BLOCK}

<CodeBlock language="bash">
  pnpm add @zentauri-ui/zentauri-components
</CodeBlock>`;
}

export function codeBlockLanguageTsxSnippet(): string {
  const inner = [
    'import { Text } from "@zentauri-ui/zentauri-components/ui/typography";',
    "",
    "export function Demo() {",
    '  return <Text tone="muted">Ready.</Text>;',
    "}",
  ].join("\n");
  return `${variantLeadComment(`code-block · language · tsx`)}
${IMPORT_CODE_BLOCK}

<CodeBlock language="tsx">
${inner}
</CodeBlock>`;
}
