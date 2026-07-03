import type { Page, SectionBlock } from "@/payload-types";

import { RichTextRenderer } from "./converters";
import { cn } from "@/utils/utils";

const bgColorMap: Record<string, string> = {
  white: "bg-white",
  "dark-slate": "bg-slate-800",
  blue: "bg-blue-600",
  emerald: "bg-emerald-600",
  teal: "bg-teal-600",
  indigo: "bg-indigo-600",
  fuchsia: "bg-fuchsia-600",
};

const spacingValueMap: Record<string, string> = {
  "0": "0",
  "20": "5",
  "40": "10",
  "60": "15",
  "80": "20",
  "120": "30",
  "140": "35",
  "160": "40",
  "200": "50",
};

function getSpacingClasses(spacing: SectionBlock["verticalSpacing"]): string {
  if (!spacing) return "";
  const parts: string[] = [];

  const top = spacing.top;
  if (top) {
    const mobile = spacingValueMap[top.mobile ?? "0"];
    const tablet = spacingValueMap[top.tablet ?? "0"];
    const desktop = spacingValueMap[top.desktop ?? "0"];
    if (mobile && mobile !== "0") parts.push(`pt-${mobile}`);
    if (tablet && tablet !== "0") parts.push(`md:pt-${tablet}`);
    if (desktop && desktop !== "0") parts.push(`lg:pt-${desktop}`);
  }

  const bottom = spacing.bottom;
  if (bottom) {
    const mobile = spacingValueMap[bottom.mobile ?? "0"];
    const tablet = spacingValueMap[bottom.tablet ?? "0"];
    const desktop = spacingValueMap[bottom.desktop ?? "0"];
    if (mobile && mobile !== "0") parts.push(`pb-${mobile}`);
    if (tablet && tablet !== "0") parts.push(`md:pb-${tablet}`);
    if (desktop && desktop !== "0") parts.push(`lg:pb-${desktop}`);
  }

  return parts.join(" ");
}

export function BlockRenderer({ blocks }: { blocks: Page["layout"] }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((section, index) => {
        if (!section) return null;
        const bgClass = bgColorMap[section.bgColor] ?? "bg-white";
        const spacingClasses = getSpacingClasses(section.verticalSpacing);
        const isFullScreenHeight = section.fullHeight ? "min-h-screen" : "";
        return (
          <section
            key={section.id ?? index}
            id={section.sectionId ?? undefined}
            className={cn(
              "text-white",
              bgClass,
              spacingClasses,
              isFullScreenHeight,
            )}
          >
            <div className="mx-auto w-full max-w-5xl px-4">
              <RichTextRenderer content={section.content} />
            </div>
          </section>
        );
      })}
    </>
  );
}
