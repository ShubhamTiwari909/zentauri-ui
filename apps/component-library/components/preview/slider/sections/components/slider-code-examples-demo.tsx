"use client";
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
import { useState } from "react";

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

export function SliderRangeDemoControlled({
  appearance,
}: SliderRangeDemoProps) {
  const [value, setValue] = useState(25);
  return (
    <div>
      <Slider
        value={value}
        onValueChange={(value) => setValue(value)}
        aria-label="Example"
        appearance={appearance}
      >
        <SliderTrack>
          <SliderRange />
          <SliderThumb />
        </SliderTrack>
      </Slider>
      <p className="text-xs text-slate-400">
        Value: <span className="font-bold">{value}</span>
      </p>
    </div>
  );
}
