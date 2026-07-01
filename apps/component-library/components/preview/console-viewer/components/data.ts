import type {
  ConsoleViewerProps,
  ConsoleEntry,
} from "@zentauri-ui/zentauri-components/ui/console-viewer";
import type { ConsoleViewerAnimation } from "@zentauri-ui/zentauri-components/ui/console-viewer/animated";

export const CONSOLE_VIEWER_APPEARANCES = [
  "default",
  "subtle",
  "contrast",
  "glass",
] as const satisfies readonly NonNullable<ConsoleViewerProps["appearance"]>[];

export const CONSOLE_VIEWER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<ConsoleViewerProps["size"]>[];

export const CONSOLE_VIEWER_ANIMATIONS = [
  "none",
  "stagger",
  "fade",
] as const satisfies readonly ConsoleViewerAnimation[];

/** Sample sessions the playground can render. */
export const CONSOLE_VIEWER_DATASETS = {
  "App startup": [
    { type: "info", message: "Zentauri UI v1.0.0 initializing…" },
    { type: "log", message: "Module federation enabled" },
    { type: "log", message: "Registering 42 components" },
    { type: "warn", message: "Theme provider missing — using defaults" },
    { type: "debug", message: "Tree-shake candidates: 12 unused imports" },
    { type: "log", message: "Rendered in 142ms" },
  ] as ConsoleEntry[],
  Errors: [
    {
      type: "error",
      message: "Uncaught TypeError: Cannot read properties of null",
      stack:
        "    at renderComponent (bundle.js:1:234)\n    at mount (bundle.js:1:567)",
    },
    {
      type: "error",
      message: "Failed to fetch /api/config",
      stack: "    at fetchConfig (app.ts:85:12)",
    },
    { type: "warn", message: "Retrying in 3s…" },
    { type: "error", message: "NetworkError: ERR_CONNECTION_REFUSED" },
  ] as ConsoleEntry[],
  "Grouped output": [
    { type: "info", message: "Running test suite…" },
    {
      type: "group",
      message: "packages/components (12 tests)",
      children: [
        { type: "log", message: "✓ Button renders correctly" },
        { type: "log", message: "✓ Accordion toggles panel" },
        {
          type: "error",
          message: "✗ Modal focus trap fails",
          stack: "    at modal.test.tsx:33",
        },
        { type: "log", message: "✓ ConsoleViewer filters entries" },
      ],
    },
    { type: "groupEnd", message: "" },
    {
      type: "groupCollapsed",
      message: "packages/hooks (8 tests)",
      children: [
        { type: "log", message: "✓ useClipboard copies text" },
        { type: "log", message: "✓ useMediaQuery matches mobile" },
      ],
    },
    { type: "groupEnd", message: "" },
    { type: "log", message: "Tests: 18 passed, 1 failed" },
  ] as ConsoleEntry[],
  "API response": [
    { type: "dir", message: "{ status: 200, ok: true, data: {…} }" },
    { type: "table", message: "id  name         role" },
    { type: "log", message: " 1  John Doe     admin" },
    { type: "log", message: " 2  Jane Smith   editor" },
    { type: "log", message: " 3  Bob Johnson  viewer" },
    { type: "info", message: "Fetched 3 users in 230ms" },
  ] as ConsoleEntry[],
} as const;

export const CONSOLE_VIEWER_DATASET_KEYS = Object.keys(
  CONSOLE_VIEWER_DATASETS,
) as readonly (keyof typeof CONSOLE_VIEWER_DATASETS)[];
