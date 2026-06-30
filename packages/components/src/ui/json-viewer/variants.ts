import { cva } from "class-variance-authority";

import {
  zuiJsonViewerActionBase,
  zuiJsonViewerAppearances,
  zuiJsonViewerBase,
  zuiJsonViewerSizes,
  zuiJsonViewerToolbarBase,
  zuiJsonViewerValues,
} from "../../design-system/json-viewer";

export const jsonViewerVariants = cva(zuiJsonViewerBase, {
  variants: {
    appearance: zuiJsonViewerAppearances,
    size: zuiJsonViewerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const jsonViewerToolbarVariants = cva(zuiJsonViewerToolbarBase);

export const jsonViewerActionVariants = cva(zuiJsonViewerActionBase);

export const jsonViewerValueVariants = cva("", {
  variants: {
    kind: zuiJsonViewerValues,
  },
  defaultVariants: {
    kind: "string",
  },
});

export {
  zuiJsonViewerGuide,
  zuiJsonViewerKey,
  zuiJsonViewerPreview,
  zuiJsonViewerPunctuation,
  zuiJsonViewerToggleBase,
  zuiJsonViewerTreeBase,
} from "../../design-system/json-viewer";
