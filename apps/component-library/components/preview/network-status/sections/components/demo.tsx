import { NetworkStatus } from "@zentauri-ui/zentauri-components/ui/network-status";
import { NetworkStatusAnimated } from "@zentauri-ui/zentauri-components/ui/network-status/animated";
import type { NetworkStatusAppearance, NetworkStatusDemoProps } from "./types";

/** Map the playground `state` onto the component's `online` / `appearance` props. */
function resolveProps(opts: NetworkStatusDemoProps) {
  const { state, appearance, size, showDetail } = opts;
  const online =
    state === "auto" ? undefined : state === "offline" ? false : true;
  const resolvedAppearance: NetworkStatusAppearance | undefined =
    state === "slow"
      ? "slow"
      : appearance === "online"
        ? undefined
        : appearance;
  return { online, appearance: resolvedAppearance, size, showDetail };
}

export function NetworkStatusDemo(props: NetworkStatusDemoProps) {
  const { animation = "none" } = props;
  const resolved = resolveProps(props);

  if (animation === "none") {
    return <NetworkStatus {...resolved} />;
  }
  return <NetworkStatusAnimated {...resolved} animation={animation} />;
}
