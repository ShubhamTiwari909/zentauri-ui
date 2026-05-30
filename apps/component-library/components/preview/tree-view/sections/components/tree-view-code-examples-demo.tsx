"use client";

import { useState } from "react";
import type { TreeNode } from "@zentauri-ui/zentauri-components/ui/tree-view";
import { TreeView } from "@zentauri-ui/zentauri-components/ui/tree-view";
import { TreeViewAnimated } from "@zentauri-ui/zentauri-components/ui/tree-view/animated";
import { FiFile, FiFolder, FiHash } from "react-icons/fi";

import type { TreeViewDemoProps } from "./tree-view-code-examples.types";

const folder = <FiFolder aria-hidden className="h-4 w-4" />;
const file = <FiFile aria-hidden className="h-4 w-4" />;
const route = <FiHash aria-hidden className="h-4 w-4" />;

export const TREE_VIEW_SAMPLE: TreeNode[] = [
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

export function TreeViewDemo({
  appearance = "default",
  size = "md",
  showGuides = false,
  animated = false,
  transition = "default",
}: TreeViewDemoProps) {
  const [selected, setSelected] = useState<string | undefined>("page");

  const shared = {
    "aria-label": "Project files",
    data: TREE_VIEW_SAMPLE,
    appearance,
    size,
    showGuides,
    defaultExpanded: ["app", "preview", "components"],
    selected,
    onSelect: (node: TreeNode) => setSelected(node.id),
    className: "max-w-md",
  };

  if (animated) {
    return <TreeViewAnimated {...shared} transitionVariant={transition} />;
  }

  return <TreeView {...shared} />;
}
