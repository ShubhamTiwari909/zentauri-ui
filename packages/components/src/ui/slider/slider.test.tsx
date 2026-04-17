import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  RangeSlider,
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "./slider";

describe("Slider", () => {
  it("should expose displayName", () => {
    expect(Slider.displayName).toBe("Slider");
    expect(SliderTrack.displayName).toBe("SliderTrack");
    expect(SliderRange.displayName).toBe("SliderRange");
    expect(SliderThumb.displayName).toBe("SliderThumb");
    expect(RangeSlider.displayName).toBe("RangeSlider");
  });

  it("should stamp data-slot on slider root", () => {
    render(
      <Slider aria-label="Volume" defaultValue={40}>
        <SliderTrack>
          <SliderRange />
          <SliderThumb />
        </SliderTrack>
      </Slider>,
    );
    expect(document.querySelector('[data-slot="slider"]')).toBeTruthy();
  });

  it("should expose slider role on thumb", () => {
    render(
      <Slider defaultValue={25} min={0} max={50} step={1} aria-label="Level">
        <SliderTrack>
          <SliderRange />
          <SliderThumb />
        </SliderTrack>
      </Slider>,
    );
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "25");
  });

  it("should adjust value with keyboard", async () => {
    const user = userEvent.setup();
    render(
      <Slider defaultValue={10} step={5} aria-label="Test">
        <SliderTrack>
          <SliderRange />
          <SliderThumb />
        </SliderTrack>
      </Slider>,
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "15");
  });

  it("should forward ref on Slider", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Slider ref={ref} aria-label="R" defaultValue={0}>
        <SliderTrack>
          <SliderRange />
          <SliderThumb />
        </SliderTrack>
      </Slider>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("slider");
  });
});

describe("RangeSlider", () => {
  it("should stamp data-slot on range slider", () => {
    render(
      <RangeSlider
        aria-label="Budget"
        defaultValue={[20, 80]}
      />,
    );
    expect(document.querySelector('[data-slot="range-slider"]')).toBeTruthy();
  });

  it("should render two slider thumbs", () => {
    render(
      <RangeSlider defaultValue={[10, 90]} aria-label="Range" />,
    );
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });
});
