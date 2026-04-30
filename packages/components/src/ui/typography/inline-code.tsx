import { InlineCodeBase } from "./inline-code-base";
import type { InlineCodeProps } from "./types";

export const InlineCode = (props: InlineCodeProps) => {
  return <InlineCodeBase {...props} />;
};

InlineCode.displayName = "InlineCode";
