import {
  RangeSlider,
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@zentauri-ui/zentauri-components/ui/slider";

import type {
  SliderRangeDemoProps,
  SliderSingleDemoProps,
} from "./slider-code-examples.types";

export function SliderSingleDemo({
  appearance,
  defaultValue = 42,
}: SliderSingleDemoProps) {
  return (
    <Slider
      defaultValue={defaultValue}
      aria-label="Example"
      appearance={appearance}
    >
      <SliderTrack>
        <SliderRange />
        <SliderThumb />
      </SliderTrack>
    </Slider>
  );
}

export function SliderRangeDemo({
  appearance,
  defaultValue = [25, 75],
}: SliderRangeDemoProps) {
  return (
    <RangeSlider
      defaultValue={defaultValue}
      aria-label="Example range"
      appearance={appearance}
    />
  );
}
