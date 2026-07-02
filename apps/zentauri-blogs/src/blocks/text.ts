import type { Block } from "payload";

import { variantOptions } from "./options";
import { basicRichTextEditor } from "./richText";

/**
 * Typography-only rich text as a block, for use inside Row items where each
 * flex child is a discrete block.
 *
 * `appearance` map onto the typography component's `tone`
 * props (see `@zentauri-ui/zentauri-components/ui/typography`) and are
 * applied to every heading/paragraph/list/quote/inline-code rendered from
 * `content` by the blog converters.
 */
export const Text: Block = {
  slug: "text",
  interfaceName: "TextBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: variantOptions("typography", "tone"),
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
