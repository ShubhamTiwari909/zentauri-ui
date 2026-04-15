import type { HTMLMotionProps } from "framer-motion";

export type ToastAnimation = "none" | "slide" | "fade";

type ToastPresetMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition"
>;

export type ToastAnimationPresets = Record<ToastAnimation, ToastPresetMotionProps>;

export const toastAnimationPresets: ToastAnimationPresets = {
  none: {},
  slide: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.18 },
  },
};
