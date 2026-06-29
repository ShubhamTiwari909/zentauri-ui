import type { NetworkStatusProps } from "@zentauri-ui/zentauri-components/ui/network-status";
import type { NetworkStatusAnimation } from "@zentauri-ui/zentauri-components/ui/network-status/animated";

import type { NETWORK_STATUS_STATES } from "./data";

export type NetworkStatusAppearance = NonNullable<
  NetworkStatusProps["appearance"]
>;
export type NetworkStatusSize = NonNullable<NetworkStatusProps["size"]>;
export type NetworkStatusStateOption = (typeof NETWORK_STATUS_STATES)[number];

export type NetworkStatusDemoProps = {
  state: NetworkStatusStateOption;
  appearance: NetworkStatusAppearance;
  size: NetworkStatusSize;
  showDetail: boolean;
  animation?: NetworkStatusAnimation;
};
