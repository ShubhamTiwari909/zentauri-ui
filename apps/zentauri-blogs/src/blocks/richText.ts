import {
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import type { BlockSlug } from "payload";

/**
 * Blocks insertable inside blog rich text. Slug strings resolve against the
 * config-level `blocks` registry, which lets `row` reference itself for
 * nested rows without a circular import.
 */
export const CONTENT_BLOCK_SLUGS: BlockSlug[] = [
  "spacer",
  "code",
  "row",
  "accordion",
  "button",
  "alert",
  "badge",
  "card",
  "divider",
];

/**
 * Same set, minus `row` — used by the Row block's own `items` field so a row
 * can't nest another row (see row.ts), while staying derived from the single
 * list above instead of a second hand-maintained allowlist.
 */
export const ROW_ITEM_BLOCK_SLUGS: BlockSlug[] = [
  "text",
  ...CONTENT_BLOCK_SLUGS.filter((slug) => slug !== "row"),
];

const typographyFeatures = () => [
  ParagraphFeature(),
  HeadingFeature({
    enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"],
  }),
  UploadFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  LinkFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  BlockquoteFeature(),
  HorizontalRuleFeature(),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
];

/** Full editor: typography plus embeddable component blocks. */
export const blogRichTextEditor = () =>
  lexicalEditor({
    features: () => [
      ...typographyFeatures(),
      BlocksFeature({ blocks: CONTENT_BLOCK_SLUGS }),
    ],
  });

/**
 * Typography-only editor for content nested inside component blocks
 * (accordion items, cards, alerts) to cap nesting depth.
 */
export const basicRichTextEditor = () =>
  lexicalEditor({
    features: () => typographyFeatures(),
  });
