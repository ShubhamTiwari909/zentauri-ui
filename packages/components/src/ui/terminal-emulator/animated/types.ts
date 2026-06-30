import type { Ref } from "react";

import type { TerminalEmulatorBaseProps } from "../types";
import type { TerminalEmulatorAnimation } from "./animations";

export type { TerminalEmulatorAnimation };

export type TerminalEmulatorAnimatedProps = TerminalEmulatorBaseProps & {
  /** Reveal motion preset for the terminal body. */
  animation?: TerminalEmulatorAnimation;
  ref?: Ref<HTMLDivElement>;
};
