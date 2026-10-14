import type { TypographySectionSlug } from "../lib/typography-preview-registry";

// A new typography section must make an explicit decision about visual coverage.
export const typographyRoutes = {
  heading: "/preview/typography/heading",
  paragraph: "/preview/typography/paragraph",
  inline: "/preview/typography/inline",
  lists: "/preview/typography/lists",
  blockquote: "/preview/typography/blockquote",
  "code-block": "/preview/typography/code-block",
  scale: "/preview/typography/scale",
  accessibility: "/preview/typography/accessibility",
  prose: "/preview/typography/prose",
  links: "/preview/typography/links",
  "description-list": "/preview/typography/description-list",
  highlighting: "/preview/typography/highlighting",
  truncation: "/preview/typography/truncation",
  "number-formatting": "/preview/typography/number-formatting",
  editorial: "/preview/typography/editorial",
} satisfies Record<TypographySectionSlug, string>;

export type DocsTheme = "light" | "dark";
