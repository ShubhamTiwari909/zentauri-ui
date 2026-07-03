import type { Block } from "payload";

import { appearanceOptions, sizeOptions, variantOptions } from "./options";
import { basicRichTextEditor } from "./richText";

export const Modal: Block = {
  slug: "modal",
  interfaceName: "ModalBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "triggerLabel",
          type: "text",
          required: true,
        },
        {
          name: "triggerAppearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("modal", "trigger"),
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: sizeOptions("modal", "content"),
        },
        {
          name: "position",
          type: "select",
          defaultValue: "center",
          options: variantOptions("modal", "position", "content"),
        },
        {
          name: "contentAppearance",
          type: "select",
          defaultValue: "default",
          options: appearanceOptions("modal", "content"),
        },
      ],
    },
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional modal header title",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: basicRichTextEditor(),
    },
  ],
};
