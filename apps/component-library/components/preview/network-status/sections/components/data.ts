import type { NetworkStatusProps } from "@zentauri-ui/zentauri-components/ui/network-status";
import type { NetworkStatusAnimation } from "@zentauri-ui/zentauri-components/ui/network-status/animated";

export const NETWORK_STATUS_APPEARANCES = [
  "online",
  "offline",
  "slow",
  "default",
  "subtle",
  "muted",
  "primary",
  "blue",
  "cyan",
  "green",
  "lime",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "red",
  "slate",
  "gray",
  "zinc",
  "gradient-blue",
  "gradient-green",
  "gradient-purple",
] as const satisfies readonly NonNullable<NetworkStatusProps["appearance"]>[];

export const NETWORK_STATUS_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<NetworkStatusProps["size"]>[];

export const NETWORK_STATUS_ANIMATIONS = [
  "none",
  "pulse",
  "ping",
  "glow",
] as const satisfies readonly NetworkStatusAnimation[];

/** Connectivity states the playground can simulate. `auto` tracks the real connection. */
export const NETWORK_STATUS_STATES = [
  "auto",
  "online",
  "offline",
  "slow",
] as const;
