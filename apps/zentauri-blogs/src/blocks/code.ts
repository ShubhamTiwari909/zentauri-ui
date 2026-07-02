import type { Block } from "payload";

export const Code: Block = {
  slug: "code",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      required: true,
      defaultValue: "typescript",
      options: [
        "typescript",
        "tsx",
        "javascript",
        "jsx",
        "css",
        "html",
        "json",
        "bash",
        "markdown",
        "plaintext",
      ],
    },
    {
      name: "code",
      type: "code",
      required: true,
      admin: {
        // Editor highlighting only; the frontend reads the `language` field.
        language: "typescript",
      },
    },
  ],
};
