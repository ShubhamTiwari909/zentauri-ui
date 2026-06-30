import type { Transition, Variants } from "framer-motion";

export type TerminalEmulatorAnimation = "none" | "stagger" | "fade";

export type TerminalEmulatorAnimationPresets = Record<
  TerminalEmulatorAnimation,
  {
    transition: Transition;
    variants: Variants;
  }
>;

/**
 * Presets for revealing the terminal body. `stagger` reveals lines one after
 * another via `staggerChildren`; `fade` fades the whole body; `none` is static.
 * The `variants` are container-level; per-line child variants live in the
 * animated component.
 */
export const terminalEmulatorAnimationPresets: TerminalEmulatorAnimationPresets =
  {
    none: {
      transition: { duration: 0 },
      variants: {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      },
    },
    stagger: {
      transition: { duration: 0.2, ease: "easeOut" },
      variants: {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06 },
        },
      },
    },
    fade: {
      transition: { duration: 0.25, ease: "easeOut" },
      variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
    },
  };

/** Per-line child variants used by the `stagger` preset. */
export const terminalEmulatorLineChildVariants: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};
