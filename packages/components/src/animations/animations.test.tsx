import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlurIn } from "./blur-in";
import { BlurOut } from "./blur-out";
import { Bounce } from "./bounce";
import { FadeDown } from "./fade-down";
import { FadeIn } from "./fade-in";
import { FadeLeft } from "./fade-left";
import { FadeOut } from "./fade-out";
import { FadeRight } from "./fade-right";
import { FadeUp } from "./fade-up";
import { Flip } from "./flip";
import { FlipIn } from "./flip-in";
import { Float } from "./float";
import { HoverLift } from "./hover-lift";
import { HoverScale } from "./hover-scale";
import { Magnetic } from "./magnetic";
import { Parallax } from "./parallax";
import { Ping } from "./ping";
import { PopIn } from "./pop-in";
import { Press } from "./press";
import { Progress } from "./progress";
import { Pulse } from "./pulse";
import { Reorder } from "./reorder";
import { RevealBlur } from "./reveal-blur";
import { RevealDown } from "./reveal-down";
import { RevealLeft } from "./reveal-left";
import { RevealRight } from "./reveal-right";
import { RevealUp } from "./reveal-up";
import { RotateIn } from "./rotate-in";
import { ScaleIn } from "./scale-in";
import { ScaleOut } from "./scale-out";
import { Shake } from "./shake";
import { SkeletonShimmer } from "./skeleton-shimmer";
import { SlideDown } from "./slide-down";
import { SlideLeft } from "./slide-left";
import { SlideRight } from "./slide-right";
import { SlideUp } from "./slide-up";
import { Spin } from "./spin";
import { TextReveal } from "./text-reveal";
import { TextShimmer } from "./text-shimmer";
import { Tilt } from "./tilt";
import { Wiggle } from "./wiggle";

const animations = [
  ["FadeIn", FadeIn, "animation-fade-in"],
  ["FadeOut", FadeOut, "animation-fade-out"],
  ["FadeUp", FadeUp, "animation-fade-up"],
  ["FadeDown", FadeDown, "animation-fade-down"],
  ["FadeLeft", FadeLeft, "animation-fade-left"],
  ["FadeRight", FadeRight, "animation-fade-right"],
  ["ScaleIn", ScaleIn, "animation-scale-in"],
  ["ScaleOut", ScaleOut, "animation-scale-out"],
  ["PopIn", PopIn, "animation-pop-in"],
  ["BlurIn", BlurIn, "animation-blur-in"],
  ["BlurOut", BlurOut, "animation-blur-out"],
  ["SlideUp", SlideUp, "animation-slide-up"],
  ["SlideDown", SlideDown, "animation-slide-down"],
  ["SlideLeft", SlideLeft, "animation-slide-left"],
  ["SlideRight", SlideRight, "animation-slide-right"],
  ["RevealUp", RevealUp, "animation-reveal-up"],
  ["RevealDown", RevealDown, "animation-reveal-down"],
  ["RevealLeft", RevealLeft, "animation-reveal-left"],
  ["RevealRight", RevealRight, "animation-reveal-right"],
  ["RevealBlur", RevealBlur, "animation-reveal-blur"],
  ["TextReveal", TextReveal, "animation-text-reveal"],
  ["TextShimmer", TextShimmer, "animation-text-shimmer"],
  ["RotateIn", RotateIn, "animation-rotate-in"],
  ["Pulse", Pulse, "animation-pulse"],
  ["Ping", Ping, "animation-ping"],
  ["Shake", Shake, "animation-shake"],
  ["Bounce", Bounce, "animation-bounce"],
  ["Wiggle", Wiggle, "animation-wiggle"],
  ["Float", Float, "animation-float"],
  ["Spin", Spin, "animation-spin"],
  ["Flip", Flip, "animation-flip"],
  ["FlipIn", FlipIn, "animation-flip-in"],
  ["Tilt", Tilt, "animation-tilt"],
  ["Magnetic", Magnetic, "animation-magnetic"],
  ["HoverLift", HoverLift, "animation-hover-lift"],
  ["HoverScale", HoverScale, "animation-hover-scale"],
  ["Press", Press, "animation-press"],
  ["Reorder", Reorder, "animation-reorder"],
  ["SkeletonShimmer", SkeletonShimmer, "animation-skeleton-shimmer"],
  ["Progress", Progress, "animation-progress"],
  ["Parallax", Parallax, "animation-parallax"],
] as const;

describe("animation primitives", () => {
  for (const [displayName, Component, slot] of animations) {
    it(`${displayName} stamps the animation slot and forwards content`, () => {
      render(<Component className="custom-motion">Preview</Component>);
      const root = screen.getByText("Preview");

      expect(Component.displayName).toBe(displayName);
      expect(root).toHaveAttribute("data-slot", slot);
      expect(root).toHaveClass("custom-motion");
    });
  }

  it("supports direct target override props without forwarding them to the DOM", () => {
    render(
      <FadeUp
        from={{ opacity: 0.2, y: 32, blur: 8 }}
        to={{
          opacity: 0.9,
          y: 4,
          scale: 0.98,
          scaleX: 1,
          scaleY: 1,
          rotate: -2,
          rotateX: 3,
          rotateY: -3,
        }}
        exitTo={{ opacity: 0, y: 12, blur: "10px" }}
      >
        Custom values
      </FadeUp>,
    );

    const root = screen.getByText("Custom values");

    expect(root).toHaveAttribute("data-slot", "animation-fade-up");
    expect(root).not.toHaveAttribute("from");
    expect(root).not.toHaveAttribute("to");
    expect(root).not.toHaveAttribute("exitTo");
  });
});
