import { cva } from "class-variance-authority";

import {
  zuiApiResponseViewerAppearances,
  zuiApiResponseViewerBase,
  zuiApiResponseViewerHeaderBase,
  zuiApiResponseViewerSizes,
  zuiApiResponseViewerStatusBase,
  zuiApiResponseViewerStatusTones,
  zuiApiResponseViewerTabsBase,
} from "../../design-system/api-response-viewer";

export const apiResponseViewerVariants = cva(zuiApiResponseViewerBase, {
  variants: {
    appearance: zuiApiResponseViewerAppearances,
    size: zuiApiResponseViewerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const apiResponseViewerHeaderVariants = cva(
  zuiApiResponseViewerHeaderBase,
);

export const apiResponseViewerTabsVariants = cva(zuiApiResponseViewerTabsBase);

export const apiResponseViewerStatusVariants = cva(
  zuiApiResponseViewerStatusBase,
  {
    variants: {
      tone: zuiApiResponseViewerStatusTones,
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export {
  zuiApiResponseViewerActionBase,
  zuiApiResponseViewerBodyBase,
  zuiApiResponseViewerEmpty,
  zuiApiResponseViewerHeaderKey,
  zuiApiResponseViewerHeaderValue,
  zuiApiResponseViewerMetaBase,
  zuiApiResponseViewerMethodBase,
  zuiApiResponseViewerPanelBase,
  zuiApiResponseViewerTabActive,
  zuiApiResponseViewerTabBase,
  zuiApiResponseViewerUrlBase,
} from "../../design-system/api-response-viewer";
