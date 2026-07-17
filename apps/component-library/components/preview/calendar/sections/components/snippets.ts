import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CalendarDemoProps } from "./types";

export function calendarSnippet(opts: CalendarDemoProps): string {
  const {
    mode,
    appearance,
    size,
    captionLayout = "label",
    showWeekNumbers = false,
    animation = "none",
  } = opts;
  const modeAttr = mode === "single" ? "" : ` mode="${mode}"`;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const captionAttr =
    captionLayout === "label" ? "" : ` captionLayout="${captionLayout}"`;
  const weekNumbersAttr = showWeekNumbers ? " showWeekNumbers" : "";
  const lead = variantLeadComment(
    `mode · ${mode}, appearance · ${appearance}, size · ${size}${captionLayout !== "label" ? `, caption · ${captionLayout}` : ""}${showWeekNumbers ? ", week numbers" : ""}`,
  );
  const sharedAttrs = `${modeAttr}${appearanceAttr}${sizeAttr}${captionAttr}${weekNumbersAttr}`;

  if (animation !== "none") {
    return `import { CalendarAnimated } from "@zentauri-ui/zentauri-components/ui/calendar/animated";

${lead}<CalendarAnimated${sharedAttrs} animation="${animation}" />`;
  }

  return `import { Calendar } from "@zentauri-ui/zentauri-components/ui/calendar";

${lead}<Calendar${sharedAttrs} />`;
}
