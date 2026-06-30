import { cva } from "class-variance-authority";

import {
  zuiHttpStatusBadgeBase,
  zuiHttpStatusBadgeSizes,
} from "../../design-system/http-status-badge";

export const httpStatusBadgeVariants = cva(zuiHttpStatusBadgeBase, {
  variants: {
    // The color is applied separately in the base from the tone maps, keyed by
    // the resolved tone. These structural slots only carry the default-variant
    // contract; the fill style selects which tone map is merged in.
    appearance: {
      solid: "",
      soft: "",
      outline: "",
    },
    size: zuiHttpStatusBadgeSizes,
  },
  defaultVariants: {
    appearance: "soft",
    size: "md",
  },
});

export {
  zuiHttpStatusBadgeOutlineTones,
  zuiHttpStatusBadgeSoftTones,
  zuiHttpStatusBadgeSolidTones,
} from "../../design-system/http-status-badge";
