import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { TreeViewDemoProps } from "./tree-view-code-examples.types";

function propLine(name: string, value: unknown): string {
  if (value === undefined || value === false) {
    return "";
  }
  if (value === true) {
    return `  ${name}\n`;
  }
  return `  ${name}="${String(value)}"\n`;
}

export function treeViewSnippet(opts: TreeViewDemoProps): string {
  const component = opts.animated ? "TreeViewAnimated" : "TreeView";
  const importPath = opts.animated
    ? `import { TreeViewAnimated } from "@zentauri-ui/zentauri-components/ui/tree-view/animated";`
    : `import { TreeView } from "@zentauri-ui/zentauri-components/ui/tree-view";`;

  const lead = opts.animated
    ? `transition ${opts.transition ?? "default"}`
    : `appearance ${opts.appearance ?? "default"} / size ${opts.size ?? "md"}`;

  return `${variantLeadComment(lead)}${importPath}

const nodes = [
 {
    id: "app",
    label: "app",
    icon: folder,
    children: [
      {
        id: "preview",
        label: "preview",
        icon: folder,
        children: [
          { id: "page", label: "page.tsx", icon: route },
          { id: "layout", label: "layout.tsx", icon: route },
        ],
      },
      { id: "globals", label: "globals.css", icon: file },
    ],
  },
  {
    id: "components",
    label: "components",
    icon: folder,
    children: [
      { id: "tree-view", label: "tree-view.tsx", icon: file },
      { id: "scroll-area", label: "scroll-area.tsx", icon: file },
      { id: "draft", label: "draft.tsx", icon: file, disabled: true },
    ],
  },
  { id: "readme", label: "README.md", icon: file },
];

<${component}
  aria-label="Project files"
  data={nodes}
  defaultExpanded={["app"]}
${propLine("appearance", opts.appearance)}${propLine("size", opts.size)}${propLine("showGuides", opts.showGuides)}${opts.animated ? propLine("transitionVariant", opts.transition) : ""}  onSelect={(node) => console.log(node.id)}
/>`;
}
