import type { SpringOptions } from "framer-motion";

/**
 * Track settle physics.
 *
 * The animated entry keeps placement in CSS — exactly the same
 * `--carousel-item-size` / `--carousel-gap` arithmetic the static entry uses —
 * and only springs the slide *index* on its way to the next rest position, so
 * both entries always land on identical pixels.
 */
export type CarouselAnimation =
  | "none"
  | "glide"
  | "smooth"
  | "snappy"
  | "bouncy";

export type CarouselAnimationPresets = Record<
  Exclude<CarouselAnimation, "none">,
  SpringOptions
>;

export const carouselTrackSpringPresets: CarouselAnimationPresets = {
  glide: { stiffness: 320, damping: 34, mass: 0.9 },
  smooth: { stiffness: 180, damping: 30, mass: 1 },
  snappy: { stiffness: 520, damping: 40, mass: 0.7 },
  bouncy: { stiffness: 420, damping: 18, mass: 0.8 },
};

/** How slides outside the active window are de-emphasised. */
export type CarouselReveal = "none" | "fade" | "scale" | "blur";

export type CarouselRevealPreset = {
  transition: { duration: number; ease: [number, number, number, number] };
  states: Record<"inactive" | "active", Record<string, number | string>>;
};

const defaultEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const carouselRevealPresets: Record<
  CarouselReveal,
  CarouselRevealPreset
> = {
  none: {
    transition: { duration: 0, ease: defaultEasing },
    states: {
      inactive: { opacity: 1, scale: 1, filter: "blur(0px)" },
      active: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  },
  fade: {
    transition: { duration: 0.28, ease: defaultEasing },
    states: {
      inactive: { opacity: 0.35, scale: 1, filter: "blur(0px)" },
      active: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  },
  scale: {
    transition: { duration: 0.32, ease: defaultEasing },
    states: {
      inactive: { opacity: 0.6, scale: 0.9, filter: "blur(0px)" },
      active: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  },
  blur: {
    transition: { duration: 0.3, ease: defaultEasing },
    states: {
      inactive: { opacity: 0.7, scale: 1, filter: "blur(4px)" },
      active: { opacity: 1, scale: 1, filter: "blur(0px)" },
    },
  },
};
