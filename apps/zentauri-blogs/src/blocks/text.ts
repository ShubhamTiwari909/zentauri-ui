import type { Block } from "payload";

import { basicRichTextEditor } from "./richText";

/**
 * Typography-only rich text as a block, for use inside Row items where each
 * flex child is a discrete block.
 */
export const Text: Block = {
  slug: "text",
  interfaceName: "TextBlock",
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
