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

export const CLI_ADD_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components add accordion bento-grid buttons network-status speech-recognition speech-synthesizer split-button qr-code qr-scanner relative-time timezone-select world-clock",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components add accordion bento-grid buttons network-status speech-recognition speech-synthesizer split-button qr-code qr-scanner relative-time timezone-select world-clock",
  yarn: "yarn dlx @zentauri-ui/zentauri-components add accordion bento-grid buttons network-status speech-recognition speech-synthesizer split-button qr-code qr-scanner relative-time timezone-select world-clock",
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
