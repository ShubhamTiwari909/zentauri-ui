import type { Block } from "payload";

const hexColorRegex = /^#[0-9a-fA-F]{6}$/;

const hexColorValidate = (value: string | null | undefined) => {
  if (!value) return true;
  if (!hexColorRegex.test(value)) {
    return "Must be a valid hex color (e.g. #ffffff)";
  }
  return true;
};

export const QrCode: Block = {
  slug: "qr-code",
  interfaceName: "QrCodeBlock",
  fields: [
    {
      name: "value",
      type: "text",
      required: true,
      admin: {
        description: "The URL or text to encode",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "canvasSize",
          type: "number",
          defaultValue: 200,
          min: 32,
        },
        {
          name: "level",
          type: "select",
          defaultValue: "M",
          options: [
            { label: "Low (7%)", value: "L" },
            { label: "Medium (15%)", value: "M" },
            { label: "Quartile (25%)", value: "Q" },
            { label: "High (30%)", value: "H" },
          ],
        },
        {
          name: "margin",
          type: "number",
          defaultValue: 4,
          min: 0,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "bgColor",
          type: "text",
          defaultValue: "#ffffff",
          admin: {
            description: "Background color (hex)",
          },
          validate: hexColorValidate,
        },
        {
          name: "fgColor",
          type: "text",
          defaultValue: "#000000",
          admin: {
            description: "Foreground color (hex)",
          },
          validate: hexColorValidate,
        },
      ],
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
