import type { TerminalEmulatorProps } from "@zentauri-ui/zentauri-components/ui/terminal-emulator";
import type { TerminalEmulatorAnimation } from "@zentauri-ui/zentauri-components/ui/terminal-emulator/animated";

import type { TERMINAL_EMULATOR_DATASET_KEYS } from "./data";

export type TerminalEmulatorAppearance = NonNullable<
  TerminalEmulatorProps["appearance"]
>;
export type TerminalEmulatorSize = NonNullable<TerminalEmulatorProps["size"]>;
export type TerminalEmulatorDatasetKey =
  (typeof TERMINAL_EMULATOR_DATASET_KEYS)[number];

export type TerminalEmulatorDemoProps = {
  dataset: TerminalEmulatorDatasetKey;
  appearance: TerminalEmulatorAppearance;
  size: TerminalEmulatorSize;
  showHeader: boolean;
  animation?: TerminalEmulatorAnimation;
};
