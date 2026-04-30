import { BlockquoteBase } from "./blockquote-base";
import type { BlockquoteProps } from "./types";

export const Blockquote = (props: BlockquoteProps) => {
  return <BlockquoteBase {...props} />;
};

Blockquote.displayName = "Blockquote";
