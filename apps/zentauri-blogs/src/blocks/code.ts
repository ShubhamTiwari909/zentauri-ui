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
      // Payload's code field only supports a static `admin.language` (no
      // binding to a sibling field), so we leave editor highlighting at its
      // default rather than mislabeling non-TS snippets as TypeScript. The
      // frontend renderer highlights correctly using the `language` field.
      name: "code",
      type: "code",
      required: true,
    },
  ],
};
