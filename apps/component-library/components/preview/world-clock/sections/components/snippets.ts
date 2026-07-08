import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { WorldClockDemoProps } from "./demo";

export function worldClockSnippet(opts: WorldClockDemoProps): string {
  const {
    cardAppearance,
    cardSize,
    layout,
    showDate,
    showSeconds,
    showDayNight,
    showOffsetFromLocal,
  } = opts;
  const appearanceAttr =
    cardAppearance === "default" ? "" : ` cardAppearance="${cardAppearance}"`;
  const sizeAttr = cardSize === "md" ? "" : ` cardSize="${cardSize}"`;
  const layoutAttr = layout === "grid" ? "" : ` layout="${layout}"`;
  const showDateAttr = showDate ? "" : " showDate={false}";
  const showSecondsAttr = showSeconds ? " showSeconds" : "";
  const showDayNightAttr = showDayNight ? "" : " showDayNight={false}";
  const showOffsetAttr = showOffsetFromLocal
    ? ""
    : " showOffsetFromLocal={false}";
  const lead = variantLeadComment(
    `cardAppearance · ${cardAppearance}, cardSize · ${cardSize}, layout · ${layout}`,
  );
  return `${lead}<WorldClock${appearanceAttr}${sizeAttr}${layoutAttr}${showDateAttr}${showSecondsAttr}${showDayNightAttr}${showOffsetAttr}
  zones={["America/New_York", "Europe/London", "Asia/Tokyo"]}
/>
`;
}
