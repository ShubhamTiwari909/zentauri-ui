import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { TimezoneSelectDemoProps } from "./demo";

export function timezoneSelectSnippet(opts: TimezoneSelectDemoProps): string {
  const { appearance, size, showTime, showOffset, groupByRegion } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const showTimeAttr = showTime ? "" : " showTime={false}";
  const showOffsetAttr = showOffset ? "" : " showOffset={false}";
  const groupAttr = groupByRegion ? " groupByRegion" : "";
  const lead = variantLeadComment(`appearance · ${appearance}, size · ${size}`);
  return `${lead}<TimezoneSelect${appearanceAttr}${sizeAttr}${showTimeAttr}${showOffsetAttr}${groupAttr}
  placeholder="Pick a timezone…"
  onValueChange={(tz) => console.log(tz)}
/>
`;
}
