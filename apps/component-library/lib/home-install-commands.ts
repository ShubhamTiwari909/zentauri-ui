/** Shared install/CLI strings for home + installation preview (single source of truth). */

export const INSTALL_COMMANDS = {
  npm: "npm install @zentauri-ui/zentauri-components",
  pnpm: "pnpm install @zentauri-ui/zentauri-components",
  yarn: "yarn add @zentauri-ui/zentauri-components",
} as const;

export const PEER_INSTALL_COMMANDS = {
  npm: "npm install react react-dom class-variance-authority clsx tailwind-merge",
  pnpm: "pnpm add react react-dom class-variance-authority clsx tailwind-merge",
  yarn: "yarn add react react-dom class-variance-authority clsx tailwind-merge",
} as const;

export const FRAMER_MOTION_INSTALL_COMMANDS = {
  npm: "npm install framer-motion",
  pnpm: "pnpm add framer-motion",
  yarn: "yarn add framer-motion",
} as const;

export const REACT_ICONS_INSTALL_COMMANDS = {
  npm: "npm install react-icons",
  pnpm: "pnpm add react-icons",
  yarn: "yarn add react-icons",
} as const;

export const RECHARTS_INSTALL_COMMANDS = {
  npm: "npm install recharts",
  pnpm: "pnpm add recharts",
  yarn: "yarn add recharts",
} as const;

export const CLI_INIT_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components init",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components init",
  yarn: "yarn dlx @zentauri-ui/zentauri-components init",
} as const;

/**
 * Every UI component the CLI can vendor.
 *
 * This is registry.json's `uiComponents` plus `spinner`, which is animated-only
 * and so appears in `animatedComponents` rather than `uiComponents` — it is
 * still `add`-able, so it belongs here.
 *
 * One list feeds all three package-manager commands below so they cannot drift
 * apart. `animations/*` and `charts/*` are documented separately on the
 * installation page, and hooks have their own command.
 */
export const CLI_ADD_COMPONENTS = [
  "accordion",
  "activity-feed",
  "alert",
  "animated-number",
  "api-endpoint-card",
  "api-response-viewer",
  "audio-player",
  "avatar",
  "badge",
  "bento-grid",
  "breadcrumb",
  "buttons",
  "calendar",
  "card",
  "carousel",
  "checkbox",
  "circular-menu",
  "code-block",
  "code-diff",
  "combobox",
  "command",
  "console-viewer",
  "context-menu",
  "copy-button",
  "data-table",
  "date-picker",
  "divider",
  "drawer",
  "dropdown",
  "dynamic-stepper",
  "empty-state",
  "file-upload",
  "gauge",
  "glass-card",
  "hash-generator",
  "http-request-viewer",
  "http-status-badge",
  "image-compare",
  "inputs",
  "json-viewer",
  "kbd",
  "log-viewer",
  "marquee",
  "modal",
  "network-status",
  "otp-input",
  "package-install-command",
  "pagination",
  "password-strength-meter",
  "popover",
  "progress",
  "qr-code",
  "qr-scanner",
  "radio-group",
  "rating",
  "relative-time",
  "request-timeline-viewer",
  "scroll-area",
  "search",
  "secret-reveal",
  "select",
  "skeleton",
  "slide-to-complete",
  "slider",
  "speech-recognition",
  "speech-synthesizer",
  "spinner",
  "split-button",
  "table",
  "tabs",
  "terminal-emulator",
  "timeline",
  "timezone-select",
  "toast",
  "toggle",
  "tooltip",
  "tree-view",
  "typing-indicator",
  "typography",
  "wizard",
  "world-clock",
] as const;

const cliAddArguments = CLI_ADD_COMPONENTS.join(" ");

export const CLI_ADD_COMMANDS = {
  npm: `npx @zentauri-ui/zentauri-components add ${cliAddArguments}`,
  pnpm: `pnpm dlx @zentauri-ui/zentauri-components add ${cliAddArguments}`,
  yarn: `yarn dlx @zentauri-ui/zentauri-components add ${cliAddArguments}`,
} as const;

export const CLI_ADD_HOOK_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add hook useWindowSize",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add hook useWindowSize",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add hook useWindowSize",
} as const;

export const CLI_ADD_PACKAGE_INSTALL_COMMAND_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add package-install-command",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add package-install-command",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add package-install-command",
} as const;

export const CLI_ADD_LOG_VIEWER_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add log-viewer",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add log-viewer",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add log-viewer",
} as const;

export const CLI_ADD_CONSOLE_VIEWER_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add console-viewer",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add console-viewer",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add console-viewer",
} as const;

export const CLI_ADD_CODE_BLOCK_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add code-block",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add code-block",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add code-block",
} as const;

export const CLI_ADD_API_ENDPOINT_CARD_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add api-endpoint-card",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add api-endpoint-card",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add api-endpoint-card",
} as const;

export type PackageManager = keyof typeof INSTALL_COMMANDS;
