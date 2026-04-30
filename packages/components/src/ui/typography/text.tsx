import { TextBase } from "./text-base";
import type { TextProps } from "./types";

export const Text = (props: TextProps) => {
  return <TextBase {...props} />;
};

Text.displayName = "Text";
