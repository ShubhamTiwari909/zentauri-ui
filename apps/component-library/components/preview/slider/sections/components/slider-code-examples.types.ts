import type { SliderProps } from "@zentauri-ui/zentauri-components/ui/slider";

export type SliderSnippetAppearance = NonNullable<SliderProps["appearance"]>;

export type SliderSingleDemoProps = {
  appearance: SliderSnippetAppearance;
  defaultValue?: number;
};

export type SliderRangeDemoProps = {
  appearance: SliderSnippetAppearance;
  defaultValue?: [number, number];
};
