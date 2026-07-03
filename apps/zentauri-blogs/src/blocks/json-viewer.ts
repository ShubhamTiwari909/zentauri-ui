import JSON5 from "json5";
import type { Block } from "payload";

// Not part of the shared design-system facade (see options.ts) — its
// component slug registry doesn't include json-viewer — so the appearance
// and size keys are listed directly from
// `@zentauri-ui/zentauri-components/design-system/json-viewer`.
export const JsonViewer: Block = {
  slug: "json-viewer",
  interfaceName: "JsonViewerBlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "appearance",
          type: "select",
          defaultValue: "default",
          options: ["default", "subtle", "contrast", "glass"],
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: ["sm", "md", "lg"],
        },
        {
          name: "defaultExpandedDepth",
          type: "number",
          min: 0,
          admin: {
            description: "Leave empty to expand everything",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "showToolbar",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "enableClipboard",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showItemCount",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "quoteStrings",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    {
      name: "data",
      type: "code",
      required: true,
      admin: {
        language: "json",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return "Data is required";
        try {
          JSON5.parse(value);
          return true;
        } catch {
          return "Invalid JSON5 data. Please check your syntax.";
        }
      },
    },
  ],
};
