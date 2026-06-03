import type { PreviewSeoDocument } from "@/lib/preview-seo";

import blurIn from "@/content/seo/preview/animations/blur-in.json";
import blurOut from "@/content/seo/preview/animations/blur-out.json";
import bounce from "@/content/seo/preview/animations/bounce.json";
import fadeDown from "@/content/seo/preview/animations/fade-down.json";
import fadeIn from "@/content/seo/preview/animations/fade-in.json";
import fadeLeft from "@/content/seo/preview/animations/fade-left.json";
import fadeOut from "@/content/seo/preview/animations/fade-out.json";
import fadeRight from "@/content/seo/preview/animations/fade-right.json";
import fadeUp from "@/content/seo/preview/animations/fade-up.json";
import flip from "@/content/seo/preview/animations/flip.json";
import flipIn from "@/content/seo/preview/animations/flip-in.json";
import float from "@/content/seo/preview/animations/float.json";
import hoverLift from "@/content/seo/preview/animations/hover-lift.json";
import hoverScale from "@/content/seo/preview/animations/hover-scale.json";
import magnetic from "@/content/seo/preview/animations/magnetic.json";
import parallax from "@/content/seo/preview/animations/parallax.json";
import ping from "@/content/seo/preview/animations/ping.json";
import popIn from "@/content/seo/preview/animations/pop-in.json";
import press from "@/content/seo/preview/animations/press.json";
import progress from "@/content/seo/preview/animations/progress.json";
import pulse from "@/content/seo/preview/animations/pulse.json";
import reorder from "@/content/seo/preview/animations/reorder.json";
import revealBlur from "@/content/seo/preview/animations/reveal-blur.json";
import revealDown from "@/content/seo/preview/animations/reveal-down.json";
import revealLeft from "@/content/seo/preview/animations/reveal-left.json";
import revealRight from "@/content/seo/preview/animations/reveal-right.json";
import revealUp from "@/content/seo/preview/animations/reveal-up.json";
import rotateIn from "@/content/seo/preview/animations/rotate-in.json";
import scaleIn from "@/content/seo/preview/animations/scale-in.json";
import scaleOut from "@/content/seo/preview/animations/scale-out.json";
import shake from "@/content/seo/preview/animations/shake.json";
import skeletonShimmer from "@/content/seo/preview/animations/skeleton-shimmer.json";
import slideDown from "@/content/seo/preview/animations/slide-down.json";
import slideLeft from "@/content/seo/preview/animations/slide-left.json";
import slideRight from "@/content/seo/preview/animations/slide-right.json";
import slideUp from "@/content/seo/preview/animations/slide-up.json";
import spin from "@/content/seo/preview/animations/spin.json";
import textReveal from "@/content/seo/preview/animations/text-reveal.json";
import textShimmer from "@/content/seo/preview/animations/text-shimmer.json";
import tilt from "@/content/seo/preview/animations/tilt.json";
import wiggle from "@/content/seo/preview/animations/wiggle.json";

export const ANIMATION_PREVIEW_SLUGS = [
  "fade-in",
  "fade-out",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "scale-in",
  "scale-out",
  "pop-in",
  "blur-in",
  "blur-out",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "reveal-up",
  "reveal-down",
  "reveal-left",
  "reveal-right",
  "reveal-blur",
  "text-reveal",
  "text-shimmer",
  "rotate-in",
  "pulse",
  "ping",
  "shake",
  "bounce",
  "wiggle",
  "float",
  "spin",
  "flip",
  "flip-in",
  "tilt",
  "magnetic",
  "hover-lift",
  "hover-scale",
  "press",
  "reorder",
  "skeleton-shimmer",
  "progress",
  "parallax",
] as const;

export type AnimationPreviewSlug = (typeof ANIMATION_PREVIEW_SLUGS)[number];

export const animationPreviewLabels: Record<AnimationPreviewSlug, string> = {
  "fade-in": "Fade In",
  "fade-out": "Fade Out",
  "fade-up": "Fade Up",
  "fade-down": "Fade Down",
  "fade-left": "Fade Left",
  "fade-right": "Fade Right",
  "scale-in": "Scale In",
  "scale-out": "Scale Out",
  "pop-in": "Pop In",
  "blur-in": "Blur In",
  "blur-out": "Blur Out",
  "slide-up": "Slide Up",
  "slide-down": "Slide Down",
  "slide-left": "Slide Left",
  "slide-right": "Slide Right",
  "reveal-up": "Reveal Up",
  "reveal-down": "Reveal Down",
  "reveal-left": "Reveal Left",
  "reveal-right": "Reveal Right",
  "reveal-blur": "Reveal Blur",
  "text-reveal": "Text Reveal",
  "text-shimmer": "Text Shimmer",
  "rotate-in": "Rotate In",
  pulse: "Pulse",
  ping: "Ping",
  shake: "Shake",
  bounce: "Bounce",
  wiggle: "Wiggle",
  float: "Float",
  spin: "Spin",
  flip: "Flip",
  "flip-in": "Flip In",
  tilt: "Tilt",
  magnetic: "Magnetic",
  "hover-lift": "Hover Lift",
  "hover-scale": "Hover Scale",
  press: "Press",
  reorder: "Reorder",
  "skeleton-shimmer": "Skeleton Shimmer",
  progress: "Progress",
  parallax: "Parallax",
};

const animationSectionSeoRecord: Record<
  AnimationPreviewSlug,
  PreviewSeoDocument
> = {
  "fade-in": fadeIn as PreviewSeoDocument,
  "fade-out": fadeOut as PreviewSeoDocument,
  "fade-up": fadeUp as PreviewSeoDocument,
  "fade-down": fadeDown as PreviewSeoDocument,
  "fade-left": fadeLeft as PreviewSeoDocument,
  "fade-right": fadeRight as PreviewSeoDocument,
  "scale-in": scaleIn as PreviewSeoDocument,
  "scale-out": scaleOut as PreviewSeoDocument,
  "pop-in": popIn as PreviewSeoDocument,
  "blur-in": blurIn as PreviewSeoDocument,
  "blur-out": blurOut as PreviewSeoDocument,
  "slide-up": slideUp as PreviewSeoDocument,
  "slide-down": slideDown as PreviewSeoDocument,
  "slide-left": slideLeft as PreviewSeoDocument,
  "slide-right": slideRight as PreviewSeoDocument,
  "reveal-up": revealUp as PreviewSeoDocument,
  "reveal-down": revealDown as PreviewSeoDocument,
  "reveal-left": revealLeft as PreviewSeoDocument,
  "reveal-right": revealRight as PreviewSeoDocument,
  "reveal-blur": revealBlur as PreviewSeoDocument,
  "text-reveal": textReveal as PreviewSeoDocument,
  "text-shimmer": textShimmer as PreviewSeoDocument,
  "rotate-in": rotateIn as PreviewSeoDocument,
  pulse: pulse as PreviewSeoDocument,
  ping: ping as PreviewSeoDocument,
  shake: shake as PreviewSeoDocument,
  bounce: bounce as PreviewSeoDocument,
  wiggle: wiggle as PreviewSeoDocument,
  float: float as PreviewSeoDocument,
  spin: spin as PreviewSeoDocument,
  flip: flip as PreviewSeoDocument,
  "flip-in": flipIn as PreviewSeoDocument,
  tilt: tilt as PreviewSeoDocument,
  magnetic: magnetic as PreviewSeoDocument,
  "hover-lift": hoverLift as PreviewSeoDocument,
  "hover-scale": hoverScale as PreviewSeoDocument,
  press: press as PreviewSeoDocument,
  reorder: reorder as PreviewSeoDocument,
  "skeleton-shimmer": skeletonShimmer as PreviewSeoDocument,
  progress: progress as PreviewSeoDocument,
  parallax: parallax as PreviewSeoDocument,
};

export function getAnimationSectionSeo(
  slug: AnimationPreviewSlug,
): PreviewSeoDocument {
  return animationSectionSeoRecord[slug];
}

export function isAnimationPreviewSlug(
  value: string,
): value is AnimationPreviewSlug {
  return (ANIMATION_PREVIEW_SLUGS as readonly string[]).includes(value);
}
