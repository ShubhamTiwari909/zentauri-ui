import type {
  TerminalEmulatorProps,
  TerminalLine,
} from "@zentauri-ui/zentauri-components/ui/terminal-emulator";
import type { TerminalEmulatorAnimation } from "@zentauri-ui/zentauri-components/ui/terminal-emulator/animated";

export const TERMINAL_EMULATOR_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<
  TerminalEmulatorProps["appearance"]
>[];

export const TERMINAL_EMULATOR_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TerminalEmulatorProps["size"]>[];

export const TERMINAL_EMULATOR_ANIMATIONS = [
  "none",
  "stagger",
  "fade",
] as const satisfies readonly TerminalEmulatorAnimation[];

/** Sample sessions the playground can render. */
export const TERMINAL_EMULATOR_DATASETS = {
  Install: [
    { type: "comment", text: "# install dependencies" },
    { type: "command", text: "pnpm install" },
    { type: "output", text: "Packages: +312" },
    { type: "output", text: "Progress: resolved 312, reused 312" },
    { type: "output", text: "Done in 4.1s" },
  ],
  Git: [
    { type: "command", text: "git status" },
    { type: "output", text: "On branch main" },
    { type: "output", text: "Changes not staged for commit:" },
    { type: "output", text: "  modified:   src/index.ts" },
    { type: "command", text: "git commit -am 'fix: build'" },
    { type: "output", text: "[main 3c130c3] fix: build" },
  ],
  Build: [
    { type: "command", text: "pnpm build" },
    { type: "output", text: "tsup building entries…" },
    { type: "comment", text: "# type errors below" },
    { type: "error", text: "error TS2322: Type 'string' is not assignable" },
    { type: "error", text: "Build failed with 1 error" },
  ],
} as const satisfies Record<string, readonly TerminalLine[]>;

export const TERMINAL_EMULATOR_DATASET_KEYS = Object.keys(
  TERMINAL_EMULATOR_DATASETS,
) as readonly (keyof typeof TERMINAL_EMULATOR_DATASETS)[];
