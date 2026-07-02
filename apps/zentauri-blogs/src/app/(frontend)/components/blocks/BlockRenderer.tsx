import type { Page } from "@/payload-types";

import { RichTextRenderer } from "./converters";

/**
 * Renders a page's top-level `layout` — an array of Section blocks. Each
 * section's rich text carries the actual content (typography + embedded
 * component blocks), handled by the rich text converters.
 */
export function BlockRenderer({ blocks }: { blocks: Page["layout"] }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((section, index) => {
        if (!section) return null;
        return (
          <section
            key={section.id ?? index}
            id={section.sectionId ?? undefined}
            className="mx-auto w-full max-w-3xl px-4 py-8 text-white"
          >
            <RichTextRenderer content={section.content} />
          </section>
        );
      })}
    </>
  );
}
