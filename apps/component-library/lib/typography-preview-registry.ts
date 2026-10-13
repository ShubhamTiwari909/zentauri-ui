import type { PreviewSeoDocument } from "@/lib/preview-seo";

import highlighting from "@/content/seo/preview/components/typography/highlighting.json";
import truncation from "@/content/seo/preview/components/typography/truncation.json";
import blockquote from "@/content/seo/preview/components/typography/blockquote.json";
import codeBlock from "@/content/seo/preview/components/typography/code-block.json";
import prose from "@/content/seo/preview/components/typography/prose.json";
import links from "@/content/seo/preview/components/typography/links.json";
import descriptionList from "@/content/seo/preview/components/typography/description-list.json";
import scale from "@/content/seo/preview/components/typography/scale.json";
import accessibility from "@/content/seo/preview/components/typography/accessibility.json";
import heading from "@/content/seo/preview/components/typography/heading.json";
import inline from "@/content/seo/preview/components/typography/inline.json";
import lists from "@/content/seo/preview/components/typography/lists.json";
import paragraph from "@/content/seo/preview/components/typography/paragraph.json";

export const TYPOGRAPHY_SECTION_SLUGS = [
  "highlighting",
  "truncation",
  "prose",
  "links",
  "description-list",
  "scale",
  "accessibility",
  "heading",
  "paragraph",
  "lists",
  "blockquote",
  "inline",
  "code-block",
] as const;

export type TypographySectionSlug = (typeof TYPOGRAPHY_SECTION_SLUGS)[number];

export const typographySectionLabels: Record<TypographySectionSlug, string> = {
  highlighting: "Highlighting and relevance",
  truncation: "Truncation and expansion",
  prose: "Prose and rich content",
  links: "Text links",
  "description-list": "Description lists",
  scale: "Scale and presets",
  accessibility: "Accessible text",
  heading: "Headings",
  paragraph: "Paragraph",
  lists: "Lists",
  blockquote: "Blockquote",
  inline: "Inline text",
  "code-block": "Code blocks",
};

const typographySectionSeoRecord: Record<
  TypographySectionSlug,
  PreviewSeoDocument
> = {
  highlighting: highlighting as PreviewSeoDocument,
  truncation: truncation as PreviewSeoDocument,
  prose: prose as PreviewSeoDocument,
  links: links as PreviewSeoDocument,
  "description-list": descriptionList as PreviewSeoDocument,
  scale: scale as PreviewSeoDocument,
  accessibility: accessibility as PreviewSeoDocument,
  heading: heading as PreviewSeoDocument,
  paragraph: paragraph as PreviewSeoDocument,
  lists: lists as PreviewSeoDocument,
  blockquote: blockquote as PreviewSeoDocument,
  inline: inline as PreviewSeoDocument,
  "code-block": codeBlock as PreviewSeoDocument,
};

export function getTypographySectionSeo(
  slug: TypographySectionSlug,
): PreviewSeoDocument {
  return typographySectionSeoRecord[slug];
}

export function isTypographySectionSlug(
  value: string,
): value is TypographySectionSlug {
  return (TYPOGRAPHY_SECTION_SLUGS as readonly string[]).includes(value);
}
