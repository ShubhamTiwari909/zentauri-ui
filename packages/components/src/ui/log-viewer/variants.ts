import { cva } from "class-variance-authority";

import {
  zuiLogViewerActionBase,
  zuiLogViewerAppearances,
  zuiLogViewerBase,
  zuiLogViewerEntryBase,
  zuiLogViewerFilterActive,
  zuiLogViewerFilterBase,
  zuiLogViewerHeaderBase,
  zuiLogViewerLevelBase,
  zuiLogViewerLevelTones,
  zuiLogViewerSearchBase,
  zuiLogViewerSearchInput,
  zuiLogViewerSizes,
} from "../../design-system/log-viewer";

export const logViewerVariants = cva(zuiLogViewerBase, {
  variants: {
    appearance: zuiLogViewerAppearances,
    size: zuiLogViewerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const logViewerHeaderVariants = cva(zuiLogViewerHeaderBase);

export const logViewerLevelVariants = cva(zuiLogViewerLevelBase, {
  variants: {
    level: zuiLogViewerLevelTones,
  },
});

export const logViewerFilterVariants = cva(zuiLogViewerFilterBase, {
  variants: {
    active: {
      true: zuiLogViewerFilterActive,
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const logViewerSearchVariants = cva(zuiLogViewerSearchBase);

export const logViewerSearchInputVariants = cva(zuiLogViewerSearchInput);

export const logViewerActionVariants = cva(zuiLogViewerActionBase);

export const logViewerEntryVariants = cva(zuiLogViewerEntryBase);
