import type { SlideToCompleteProps } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";

export type SlideToCompleteAppearance = NonNullable<
  SlideToCompleteProps["appearance"]
>;
export type SlideToCompleteSizeOption = NonNullable<
  SlideToCompleteProps["size"]
>;

export type SlideToCompleteDemoProps = {
  appearance: SlideToCompleteAppearance;
  size: SlideToCompleteSizeOption;
  threshold: number;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};
