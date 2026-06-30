import { cva } from "class-variance-authority";

import {
  zuiHttpRequestViewerActionBase,
  zuiHttpRequestViewerAppearances,
  zuiHttpRequestViewerBase,
  zuiHttpRequestViewerHeaderBase,
  zuiHttpRequestViewerMethodBase,
  zuiHttpRequestViewerMethodTones,
  zuiHttpRequestViewerSizes,
  zuiHttpRequestViewerTabBase,
  zuiHttpRequestViewerTabStates,
  zuiHttpRequestViewerTabsBase,
} from "../../design-system/http-request-viewer";

export const httpRequestViewerVariants = cva(zuiHttpRequestViewerBase, {
  variants: {
    appearance: zuiHttpRequestViewerAppearances,
    size: zuiHttpRequestViewerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const httpRequestViewerHeaderVariants = cva(
  zuiHttpRequestViewerHeaderBase,
);

export const httpRequestViewerActionVariants = cva(
  zuiHttpRequestViewerActionBase,
);

export const httpRequestViewerTabsVariants = cva(zuiHttpRequestViewerTabsBase);

export const httpRequestViewerMethodVariants = cva(
  zuiHttpRequestViewerMethodBase,
  {
    variants: {
      tone: zuiHttpRequestViewerMethodTones,
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export const httpRequestViewerTabVariants = cva(zuiHttpRequestViewerTabBase, {
  variants: {
    state: zuiHttpRequestViewerTabStates,
  },
  defaultVariants: {
    state: "inactive",
  },
});

export {
  zuiHttpRequestViewerBodyBase,
  zuiHttpRequestViewerEmptyBase,
  zuiHttpRequestViewerPanelBase,
  zuiHttpRequestViewerRowBase,
  zuiHttpRequestViewerRowKey,
  zuiHttpRequestViewerRowValue,
  zuiHttpRequestViewerUrlBase,
} from "../../design-system/http-request-viewer";
