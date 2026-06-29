import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { NetworkStatusDemoProps } from "./types";

export function networkStatusSnippet(opts: NetworkStatusDemoProps): string {
  const { state, appearance, size, showDetail, animation = "none" } = opts;

  const onlineAttr =
    state === "online" || state === "slow"
      ? " online"
      : state === "offline"
        ? " online={false}"
        : "";
  // In `auto` state the appearance is derived from the live connection, so we
  // only emit an explicit appearance when the user simulates `slow`.
  const appearanceAttr =
    state === "slow"
      ? ` appearance="slow"`
      : appearance === "online"
        ? ""
        : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const detailAttr = showDetail ? " showDetail" : "";

  const lead = variantLeadComment(
    `state · ${state}, appearance · ${appearance}, size · ${size}${
      animation !== "none" ? `, animation · ${animation}` : ""
    }`,
  );

  if (animation !== "none") {
    return `import { NetworkStatusAnimated } from "@zentauri-ui/zentauri-components/ui/network-status/animated";\n\n${lead}<NetworkStatusAnimated${onlineAttr}${appearanceAttr}${sizeAttr}${detailAttr} animation="${animation}" />`;
  }

  return `import { NetworkStatus } from "@zentauri-ui/zentauri-components/ui/network-status";\n\n${lead}<NetworkStatus${onlineAttr}${appearanceAttr}${sizeAttr}${detailAttr} />`;
}
