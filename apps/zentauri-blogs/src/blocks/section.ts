import type { Block } from "payload";

import { blogRichTextEditor } from "./richText";

export const Section: Block = {
  slug: "section",
  interfaceName: "SectionBlock",
  fields: [
    {
      name: "sectionId",
      type: "text",
      admin: {
        description: "Optional anchor id for in-page links",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: blogRichTextEditor(),
    },
  ],
};
