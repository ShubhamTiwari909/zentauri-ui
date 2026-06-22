import type {
  SplitButtonProps,
  SplitButtonAppearance as _SplitButtonAppearance,
  SplitButtonSize as _SplitButtonSize,
} from "@zentauri-ui/zentauri-components/ui/split-button";

export type SplitButtonAppearance = NonNullable<_SplitButtonAppearance>;
export type SplitButtonSize = NonNullable<_SplitButtonSize>;

export type SplitButtonTriggerOn = "click" | "hover";

export type SplitButtonDemoProps = {
  appearance: SplitButtonAppearance;
  size: SplitButtonSize;
  disabled: boolean;
  loading: boolean;
  triggerOn: SplitButtonTriggerOn;
};

export type { SplitButtonProps };
