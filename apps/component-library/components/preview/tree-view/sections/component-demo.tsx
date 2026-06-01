import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import type { TreeNode } from "@zentauri-ui/zentauri-components/ui/tree-view";
import { TreeView } from "@zentauri-ui/zentauri-components/ui/tree-view";
import { TreeViewAnimated } from "@zentauri-ui/zentauri-components/ui/tree-view/animated";

const fileTree: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "ui",
        label: "ui",
        children: [
          { id: "tree-view", label: "tree-view.tsx" },
          { id: "scroll-area", label: "scroll-area.tsx" },
        ],
      },
      { id: "index", label: "index.ts" },
    ],
  },
  {
    id: "tests",
    label: "tests",
    children: [{ id: "tree-test", label: "tree-view.test.tsx" }],
  },
  { id: "readme", label: "README.md" },
];

const docsTree: TreeNode[] = [
  {
    id: "getting-started",
    label: "Getting started",
    children: [
      { id: "install", label: "Installation" },
      { id: "theming", label: "Theming" },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      { id: "overview", label: "Overview" },
      { id: "tree-view-doc", label: "TreeView" },
      { id: "deprecated", label: "Legacy table", disabled: true },
    ],
  },
];

export function TreeViewExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        TreeView renders nested data with keyboard navigation, selection state,
        optional indentation guides, and an animated expand/collapse variant.
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <PreviewCodeShowcase
          code={`${variantLeadComment("file explorer with indentation guides")}<TreeView
  aria-label="Project files"
  data={fileTree}
  defaultExpanded={["src", "ui"]}
  defaultSelected="tree-view"
  appearance="outline"
  showGuides
/>`}
        >
          <TreeView
            aria-label="Project files"
            data={fileTree}
            defaultExpanded={["src", "ui"]}
            defaultSelected="tree-view"
            appearance="outline"
            showGuides
          />
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("animated docs navigation (smooth)")}<TreeViewAnimated
  aria-label="Documentation"
  data={docsTree}
  defaultExpanded={["components"]}
  defaultSelected="tree-view-doc"
  appearance="sky"
  transitionVariant="smooth"
/>`}
        >
          <TreeViewAnimated
            aria-label="Documentation"
            data={docsTree}
            defaultExpanded={["components"]}
            defaultSelected="tree-view-doc"
            appearance="sky"
            transitionVariant="smooth"
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
