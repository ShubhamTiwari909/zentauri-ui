import { TerminalEmulator } from "@zentauri-ui/zentauri-components/ui/terminal-emulator";
import { TerminalEmulatorAnimated } from "@zentauri-ui/zentauri-components/ui/terminal-emulator/animated";
import { TERMINAL_EMULATOR_DATASETS } from "./data";
import type { TerminalEmulatorDemoProps } from "./types";

export function TerminalEmulatorDemo(props: TerminalEmulatorDemoProps) {
  const { dataset, appearance, size, showHeader, animation = "none" } = props;
  const lines = [...TERMINAL_EMULATOR_DATASETS[dataset]];

  if (animation === "none") {
    return (
      <TerminalEmulator
        lines={lines}
        appearance={appearance}
        size={size}
        showHeader={showHeader}
        title={dataset}
      />
    );
  }
  return (
    <TerminalEmulatorAnimated
      lines={lines}
      appearance={appearance}
      size={size}
      showHeader={showHeader}
      title={dataset}
      animation={animation}
    />
  );
}
