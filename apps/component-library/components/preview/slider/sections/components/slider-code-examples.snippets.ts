import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { SliderSnippetAppearance } from "./slider-code-examples.types";

export function sliderSingleSnippet(
  appearance: SliderSnippetAppearance,
  defaultValue = 42,
): string {
  return `${variantLeadComment(`kind · single, appearance · ${appearance}, defaultValue · ${defaultValue}`)}<Slider defaultValue={${defaultValue}} aria-label="Example" appearance="${appearance}">
  <SliderTrack>
    <SliderRange />
    <SliderThumb />
  </SliderTrack>
</Slider>`;
}

export function sliderRangeSnippet(
  appearance: SliderSnippetAppearance,
  lo = 25,
  hi = 75,
): string {
  return `${variantLeadComment(`kind · range, appearance · ${appearance}, defaultValue · [${lo}, ${hi}]`)}<RangeSlider defaultValue={[${lo}, ${hi}]} aria-label="Example range" appearance="${appearance}" />`;
}
