import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ImpactPlayground } from "./components/change-impact-explorer-playground";
import { ImpactCodeExamplesSection } from "./sections/change-impact-explorer-code-examples-section";
import { ImpactInstallationSection } from "./sections/change-impact-explorer-installation-section";
export default function ChangeImpactExplorerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />
      </Section>
      <Section className="text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">Impact review playground</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Trace a proposed change, inspect a consumer, and follow its
          explanation path.
        </p>
        <ImpactPlayground />
      </Section>
      <ImpactCodeExamplesSection />
      <Section className="space-y-4 text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          Graph contract and performance
        </h2>
        <p>
          Each edge points from a dependency to its consumer: source → target.
          Downstream mode finds consumers of changed nodes; upstream mode finds
          dependencies of those nodes. Multiple sources, diamonds, self-links,
          and cycles are supported. One shortest path is retained, with input
          order breaking ties.
        </p>
        <p>
          IDs must be nonempty and unique for nodes, edges, and proposals.
          Duplicate IDs throw a descriptive error. Dangling edges and missing
          changed-node IDs are reported and excluded. A depth limit makes the
          analysis partial; items outside that analysis are not necessarily
          unaffected.
        </p>
        <p>
          Indexing and traversal are linear in graph size. Keep nodes, edges,
          and changes references stable between updates. Search does not rebuild
          adjacency, and paths are materialized only for the selected item. Maps
          mount at most mapNodeLimit nodes; results over 100 rows are windowed
          by default. The default detail path shows the last 12 steps of long
          chains.
        </p>
        <p>
          The layout responds to its container width, so controls and details
          stack in narrow sidebars as well as mobile screens.
        </p>
        <p>
          Comparisons, edge reasons, priorities, and review decisions come from
          the application. This component displays reachability through supplied
          relationships; it does not execute changes or infer business outcomes.
        </p>
        <p>
          The static entry also exports{" "}
          <code>buildChangeImpactGraph(nodes, edges)</code>,{" "}
          <code>
            analyzeChangeImpact(graph, nodeIds, &#123; direction, maxDepth
            &#125;)
          </code>
          , and <code>getChangeImpactPath(analysis, nodeId)</code> for headless
          indexing, traversal, and explanation paths. In Server Components,
          import these helpers from the server-safe entry{" "}
          <code>
            @zentauri-ui/zentauri-components/ui/change-impact-explorer/graph
          </code>
          .
        </p>
        <h3 className="text-lg font-semibold">Keyboard and composition</h3>
        <p>
          Tab reaches the named proposal selector, search input, map buttons,
          and result list. Up/Down, Home/End, and typeahead select result items
          while focus stays on the listbox. Virtual rows expose position and
          total size, and active descendants reference mounted options. Give
          renderNode noninteractive content; put links and actions in
          renderDetails. Custom result content must fit rowHeight.
        </p>
        <p>
          Controlled proposal, selection, and query props call their change
          handlers without modifying the supplied values. A custom details
          renderer mounts only for the selected item. No data is fetched
          internally.
        </p>
      </Section>
      <PreviewApiSection slug="change-impact-explorer" />
      <ImpactInstallationSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
