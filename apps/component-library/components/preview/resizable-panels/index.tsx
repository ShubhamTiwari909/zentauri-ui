import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ResizablePanelsPlayground } from "./components/resizable-panels-playground";
import { PanelsBasicDemo } from "./components/resizable-panels-code-examples-demo";
import { ResizablePanelsCodeExamplesSection } from "./sections/resizable-panels-code-examples-section";
import { ResizablePanelsInstallationSection } from "./sections/resizable-panels-installation-section";
export default function ResizablePanelsPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />
        <PanelsBasicDemo />
      </Section>
      <Section className="text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">Resizable Panels playground</h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">
          Adjust panel limits, direction, handles, surfaces, and collapse
          behavior. The example uses controlled percentages.
        </p>
        <ResizablePanelsPlayground />
      </Section>
      <ResizablePanelsCodeExamplesSection />
      <Section className="space-y-4 text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          Sizing and accessibility rules
        </h2>
        <p>
          Compose alternating Panel, Handle, Panel children; fragments and
          arrays are supported. Panel IDs must be stable and unique in the
          document. Constraints are percentages: expanded minima must total at
          most 100 and maxima at least 100. Invalid values normalize to a
          feasible layout; invalid constraints or composition throw an
          actionable error.
        </p>
        <p>
          Dragging changes the adjacent pair and snaps around collapsed ranges.
          Enter toggles the preceding collapsible panel; Home/End can also
          collapse a trailing panel. A zero-size panel remains mounted but
          becomes inert and hidden from assistive technology. Nonzero collapsed
          rails remain accessible.
        </p>
        <p>
          Label each handle for the pane it controls. Horizontal RTL layouts
          reverse pointer and arrow movement. Vertical layouts need an explicit
          height, and individual panels scroll. Content padding is applied
          inside the pane so it does not alter percentage geometry; let the
          component own flex sizing. Each nested group is independent.
        </p>
        <p>
          The default handle is 24px wide or tall; use lg for larger touch
          targets. App code decides when to switch orientation for narrow
          screens and owns saved layout state. Pointer cancellation rolls back
          the gesture; disabled-state, orientation, constraint changes, or
          unmount stop it.
        </p>
      </Section>
      <PreviewApiSection slug="resizable-panels" />
      <ResizablePanelsInstallationSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
