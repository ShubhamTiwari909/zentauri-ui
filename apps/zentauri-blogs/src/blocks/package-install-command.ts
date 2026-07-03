import type { Block } from "payload";

// Not part of the shared design-system facade (see options.ts) — its
// component slug registry doesn't include package-install-command — so the
// appearance and size keys are listed directly from
// `@zentauri-ui/zentauri-components/design-system/package-install-command`.
export const PackageInstallCommand: Block = {
  slug: "package-install-command",
  interfaceName: "PackageInstallCommandBlock",
  fields: [
    {
      name: "packageName",
      type: "text",
      required: true,
      admin: {
        description: 'e.g. "react" or "react react-dom"',
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "defaultManager",
          type: "select",
          defaultValue: "npm",
          options: ["npm", "pnpm", "yarn", "bun"],
        },
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
          name: "enableClipboard",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
};
