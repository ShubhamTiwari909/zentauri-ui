import type { TypingIndicatorProps } from "@zentauri-ui/zentauri-components/ui/typing-indicator";
import type { TypingIndicatorAnimation } from "@zentauri-ui/zentauri-components/ui/typing-indicator/animated";

export type TypingIndicatorAppearance = NonNullable<
  TypingIndicatorProps["appearance"]
>;
export type TypingIndicatorSize = NonNullable<TypingIndicatorProps["size"]>;

export type TypingIndicatorDemoProps = {
  appearance: TypingIndicatorAppearance;
  size: TypingIndicatorSize;
  dots?: 3 | 4 | 5;
  label?: string;
  animation?: TypingIndicatorAnimation;
};
