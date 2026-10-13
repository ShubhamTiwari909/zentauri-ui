"use client";

export { Heading } from "./heading";
export { Text } from "./text";
export { List, ListItem } from "./list";
export { Blockquote } from "./blockquote";
export { InlineCode } from "./inline-code";
export { CodeBlock } from "./code-block";

export type {
  BlockquoteProps,
  CodeBlockProps,
  HeadingLevel,
  HeadingProps,
  InlineCodeProps,
  ListItemProps,
  ListProps,
  TextElement,
  TextProps,
  TypographyTone,
  UnorderedMarker,
} from "./types";

export {
  headingLevelVariants,
  orderedListVariants,
  textSizeVariants,
  typographyToneVariants,
  unorderedListMarkerVariants,
} from "./variants";

export { Strong } from "./strong";
export { Emphasis } from "./emphasis";
export { Small } from "./small";
export { VisuallyHidden } from "./visually-hidden";
export type {
  StrongProps,
  EmphasisProps,
  SmallProps,
  VisuallyHiddenProps,
  TypographyControls,
} from "./types";
export {
  headingFluidVariants,
  headingDisplayVariants,
  headingFluidDisplayVariants,
  textPresetVariants,
  typographyStyleVariants,
  typographyFontVariants,
} from "./variants";

export { Prose } from "./prose";
export { TextLink } from "./text-link";
export {
  DescriptionList,
  DescriptionListItem,
  DescriptionListTerm,
  DescriptionListDetails,
} from "./description-list";
export type {
  ProseProps,
  TextLinkProps,
  ReadableTypographyTone,
  DescriptionListProps,
  DescriptionListItemProps,
  DescriptionListTermProps,
  DescriptionListDetailsProps,
} from "./types";
export {
  proseVariants,
  textLinkVariants,
  descriptionListVariants,
} from "./variants";

export { Mark } from "./mark";
export { HighlightText } from "./highlight-text";
export { TruncateText } from "./truncate-text";
export { ExpandableText } from "./expandable-text";
export type {
  MarkProps,
  HighlightTextProps,
  TruncateTextProps,
  ExpandableTextProps,
} from "./types";
export { truncateTextVariants } from "./variants";
