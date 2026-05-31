import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import type { TreeNode } from "@zentauri-ui/zentauri-components/ui/tree-view";
import { TreeViewAnimated } from "@zentauri-ui/zentauri-components/ui/tree-view/animated";

const workspaceTree: TreeNode[] = [
  {
    id: "workspace",
    label: "workspace",
    children: [
      {
        id: "apps",
        label: "apps",
        children: [
          { id: "web", label: "web" },
          { id: "docs", label: "docs" },
        ],
      },
      {
        id: "packages",
        label: "packages",
        children: [
          { id: "components", label: "components" },
          { id: "config", label: "config" },
        ],
      },
      { id: "package-json", label: "package.json" },
    ],
  },
];

export function TreeViewHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-xl">
        <TreeViewAnimated
          aria-label="Workspace explorer"
          data={workspaceTree}
          defaultExpanded={["workspace", "apps", "packages"]}
          defaultSelected="components"
          appearance="indigo"
          transitionVariant="smooth"
          showGuides
        />
      </SectionCard>
    </Section>
  );
}
