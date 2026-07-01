import { cva } from "class-variance-authority";

import {
  zuiConsoleViewerActionBase,
  zuiConsoleViewerAppearances,
  zuiConsoleViewerBase,
  zuiConsoleViewerToolbarBase,
  zuiConsoleViewerSizes,
  zuiConsoleViewerTypeTones,
} from "../../design-system/console-viewer";

export const consoleViewerVariants = cva(zuiConsoleViewerBase, {
  variants: {
    appearance: zuiConsoleViewerAppearances,
    size: zuiConsoleViewerSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const consoleViewerToolbarVariants = cva(zuiConsoleViewerToolbarBase);

export const consoleViewerActionVariants = cva(zuiConsoleViewerActionBase);

export const consoleViewerTypeVariants = cva("", {
  variants: {
    type: zuiConsoleViewerTypeTones,
  },
  defaultVariants: {
    type: "log",
  },
});

export {
  zuiConsoleViewerActionActive,
  zuiConsoleViewerBodyBase,
  zuiConsoleViewerCountBase,
  zuiConsoleViewerEmpty,
  zuiConsoleViewerEntryBase,
  zuiConsoleViewerIconBase,
  zuiConsoleViewerIndent,
  zuiConsoleViewerMessage,
  zuiConsoleViewerMeta,
} from "../../design-system/console-viewer";
