import { cva } from "class-variance-authority";

import {
  zuiTerminalEmulatorActionBase,
  zuiTerminalEmulatorAppearances,
  zuiTerminalEmulatorBase,
  zuiTerminalEmulatorHeaderBase,
  zuiTerminalEmulatorLineTones,
  zuiTerminalEmulatorSizes,
} from "../../design-system/terminal-emulator";

export const terminalEmulatorVariants = cva(zuiTerminalEmulatorBase, {
  variants: {
    appearance: zuiTerminalEmulatorAppearances,
    size: zuiTerminalEmulatorSizes,
  },
  defaultVariants: {
    appearance: "default",
    size: "md",
  },
});

export const terminalEmulatorHeaderVariants = cva(
  zuiTerminalEmulatorHeaderBase,
);

export const terminalEmulatorActionVariants = cva(
  zuiTerminalEmulatorActionBase,
);

export const terminalEmulatorLineVariants = cva("", {
  variants: {
    tone: zuiTerminalEmulatorLineTones,
  },
  defaultVariants: {
    tone: "output",
  },
});

export {
  zuiTerminalEmulatorBodyBase,
  zuiTerminalEmulatorDot,
  zuiTerminalEmulatorPrompt,
  zuiTerminalEmulatorTitle,
} from "../../design-system/terminal-emulator";
