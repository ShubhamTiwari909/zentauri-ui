import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { terminalEmulatorVariants } from "./variants";

export type TerminalEmulatorVariantProps = VariantProps<
  typeof terminalEmulatorVariants
>;

/** A single line in the terminal session, classified for color and rendering. */
export type TerminalLine = {
  type: "command" | "output" | "error" | "comment";
  text: string;
};

/** Override the header copy. */
export interface TerminalEmulatorLabels {
  copy?: ReactNode;
  copied?: ReactNode;
}

export type TerminalEmulatorBaseProps = VariantProps<
  typeof terminalEmulatorVariants
> &
  Omit<ComponentPropsWithRef<"div">, "children" | "title"> & {
    /** The lines that make up the terminal session. */
    lines: TerminalLine[];
    /** Prompt symbol shown before each `command` line. */
    prompt?: string;
    /** Window title shown centered in the header bar. */
    title?: string;
    /** Show the window header bar with traffic-light dots and title. */
    showHeader?: boolean;
    /** Show the decorative traffic-light dots in the header. */
    showTrafficLights?: boolean;
    /** Show a copy button that copies all line text. */
    enableClipboard?: boolean;
    /** Override default header copy. */
    labels?: TerminalEmulatorLabels;
  };

export type TerminalEmulatorProps = TerminalEmulatorBaseProps;
