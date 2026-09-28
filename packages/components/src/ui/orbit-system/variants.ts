import { cva } from "class-variance-authority";
import {
  zuiOrbitSystemAppearances,
  zuiOrbitSystemBase,
  zuiOrbitSystemSizes,
} from "../../design-system/orbit-system";

export const orbitSystemVariants = cva(zuiOrbitSystemBase, {
  variants: {
    appearance: zuiOrbitSystemAppearances,
    size: zuiOrbitSystemSizes,
  },
  defaultVariants: { appearance: "default", size: "md" },
});
