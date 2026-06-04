"use client";

import type { ComponentType, ReactNode } from "react";

import type { AnimationPreviewSlug } from "@/lib/animations-preview-registry";
import type { HTMLMotionProps } from "framer-motion";
import { BlurIn } from "@zentauri-ui/zentauri-components/animations/blur-in";
import { BlurOut } from "@zentauri-ui/zentauri-components/animations/blur-out";
import { Bounce } from "@zentauri-ui/zentauri-components/animations/bounce";
import { FadeDown } from "@zentauri-ui/zentauri-components/animations/fade-down";
import { FadeIn } from "@zentauri-ui/zentauri-components/animations/fade-in";
import { FadeLeft } from "@zentauri-ui/zentauri-components/animations/fade-left";
import { FadeOut } from "@zentauri-ui/zentauri-components/animations/fade-out";
import { FadeRight } from "@zentauri-ui/zentauri-components/animations/fade-right";
import { FadeUp } from "@zentauri-ui/zentauri-components/animations/fade-up";
import { Flip } from "@zentauri-ui/zentauri-components/animations/flip";
import { FlipIn } from "@zentauri-ui/zentauri-components/animations/flip-in";
import { Float } from "@zentauri-ui/zentauri-components/animations/float";
import { HoverLift } from "@zentauri-ui/zentauri-components/animations/hover-lift";
import { HoverScale } from "@zentauri-ui/zentauri-components/animations/hover-scale";
import { Magnetic } from "@zentauri-ui/zentauri-components/animations/magnetic";
import { Parallax } from "@zentauri-ui/zentauri-components/animations/parallax";
import { Ping } from "@zentauri-ui/zentauri-components/animations/ping";
import { PopIn } from "@zentauri-ui/zentauri-components/animations/pop-in";
import { Press } from "@zentauri-ui/zentauri-components/animations/press";
import { Progress } from "@zentauri-ui/zentauri-components/animations/progress";
import { Pulse } from "@zentauri-ui/zentauri-components/animations/pulse";
import { Reorder } from "@zentauri-ui/zentauri-components/animations/reorder";
import { RevealBlur } from "@zentauri-ui/zentauri-components/animations/reveal-blur";
import { RevealDown } from "@zentauri-ui/zentauri-components/animations/reveal-down";
import { RevealLeft } from "@zentauri-ui/zentauri-components/animations/reveal-left";
import { RevealRight } from "@zentauri-ui/zentauri-components/animations/reveal-right";
import { RevealUp } from "@zentauri-ui/zentauri-components/animations/reveal-up";
import { RotateIn } from "@zentauri-ui/zentauri-components/animations/rotate-in";
import { ScaleIn } from "@zentauri-ui/zentauri-components/animations/scale-in";
import { ScaleOut } from "@zentauri-ui/zentauri-components/animations/scale-out";
import { Shake } from "@zentauri-ui/zentauri-components/animations/shake";
import { SkeletonShimmer } from "@zentauri-ui/zentauri-components/animations/skeleton-shimmer";
import { SlideDown } from "@zentauri-ui/zentauri-components/animations/slide-down";
import { SlideLeft } from "@zentauri-ui/zentauri-components/animations/slide-left";
import { SlideRight } from "@zentauri-ui/zentauri-components/animations/slide-right";
import { SlideUp } from "@zentauri-ui/zentauri-components/animations/slide-up";
import { Spin } from "@zentauri-ui/zentauri-components/animations/spin";
import { TextReveal } from "@zentauri-ui/zentauri-components/animations/text-reveal";
import { TextShimmer } from "@zentauri-ui/zentauri-components/animations/text-shimmer";
import { Tilt } from "@zentauri-ui/zentauri-components/animations/tilt";
import { Wiggle } from "@zentauri-ui/zentauri-components/animations/wiggle";

type AnimationTargetOverrides = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  blur?: number | string;
};

export type AnimationPreviewMotionProps = Omit<
  HTMLMotionProps<"div">,
  "whileInView"
> & {
  from?: AnimationTargetOverrides;
  to?: AnimationTargetOverrides;
  exitTo?: AnimationTargetOverrides;
  whileInView?: true | HTMLMotionProps<"div">["whileInView"];
};

const animationBySlug: Record<
  AnimationPreviewSlug,
  ComponentType<AnimationPreviewMotionProps & { children: ReactNode }>
> = {
  "fade-in": FadeIn,
  "fade-out": FadeOut,
  "fade-up": FadeUp,
  "fade-down": FadeDown,
  "fade-left": FadeLeft,
  "fade-right": FadeRight,
  "scale-in": ScaleIn,
  "scale-out": ScaleOut,
  "pop-in": PopIn,
  "blur-in": BlurIn,
  "blur-out": BlurOut,
  "slide-up": SlideUp,
  "slide-down": SlideDown,
  "slide-left": SlideLeft,
  "slide-right": SlideRight,
  "reveal-up": RevealUp,
  "reveal-down": RevealDown,
  "reveal-left": RevealLeft,
  "reveal-right": RevealRight,
  "reveal-blur": RevealBlur,
  "text-reveal": TextReveal,
  "text-shimmer": TextShimmer,
  "rotate-in": RotateIn,
  pulse: Pulse,
  ping: Ping,
  shake: Shake,
  bounce: Bounce,
  wiggle: Wiggle,
  float: Float,
  spin: Spin,
  flip: Flip,
  "flip-in": FlipIn,
  tilt: Tilt,
  magnetic: Magnetic,
  "hover-lift": HoverLift,
  "hover-scale": HoverScale,
  press: Press,
  reorder: Reorder,
  "skeleton-shimmer": SkeletonShimmer,
  progress: Progress,
  parallax: Parallax,
};

export function AnimationBySlug({
  slug,
  children,
  ...props
}: {
  slug: AnimationPreviewSlug;
  children: ReactNode;
} & AnimationPreviewMotionProps) {
  const Component = animationBySlug[slug];

  return <Component {...props}>{children}</Component>;
}
