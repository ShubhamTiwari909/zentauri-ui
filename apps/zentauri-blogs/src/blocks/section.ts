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
        description:
          "Optional anchor id for in-page links (lowercase letters, numbers, and hyphens only)",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        return (
          /^[a-z0-9-]+$/.test(value) ||
          "Only lowercase letters, numbers, and hyphens are allowed"
        );
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
