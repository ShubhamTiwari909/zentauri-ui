import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ToolbarPlayground } from "./components/toolbar-playground";
import { ToolbarActionsDemo } from "./components/toolbar-code-examples-demo";
import { ToolbarCodeExamplesSection } from "./sections/toolbar-code-examples-section";
import { ToolbarInstallationSection } from "./sections/toolbar-installation-section";
export default function ToolbarPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />
        <ToolbarActionsDemo />
      </Section>
      <Section className="text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">Toolbar playground</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Explore orientation, direction, wrapping, disabled actions, and every
          appearance. Try the keyboard directly in the preview.
        </p>
        <ToolbarPlayground />
      </Section>
      <ToolbarCodeExamplesSection />
      <Section className="space-y-4 text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          Composition and keyboard behavior
        </h2>
        <p>
          Give every Toolbar an aria-label or aria-labelledby that describes its
          purpose. Use it for groups of at least three related controls. Label
          icon-only actions, and use aria-controls when the commands operate on
          a specific editor or canvas.
        </p>
        <p>
          After hydration, the first available managed item is the only Tab
          stop. Arrow navigation and pointer focus update that entry point, so
          returning with Tab restores the last focused item. Home and End jump
          to the first and last available controls. Horizontal Left/Right follow
          the reading direction; vertical Up/Down stay the same in RTL. Set
          loop=false to stop at either edge.
        </p>
        <p>
          ToolbarButton preserves native button props and defaults to
          type=button. ToolbarToggle supports pressed, defaultPressed, and
          onPressedChange; navigation moves focus without changing its state.
          ToolbarLink is a native anchor. ToolbarGroup groups related actions,
          and ToolbarSeparator is decorative unless decorative=false.
        </p>
        <p>
          ToolbarItem composes one focusable child that forwards props and ref
          to its DOM control. It preserves the child’s handlers, merges classes
          and refs, and adds it to the toolbar’s navigation. Use native=false
          for links or controls that implement their own disabled behavior.
          Prevented events are respected. Popup content and nested toolbars keep
          their own navigation; perpendicular keys remain available to menu
          triggers.
        </p>
        <p>
          Native disabled, aria-disabled, hidden, and inert managed items are
          skipped. Root disabled disables the complete toolbar, and disabled
          links cannot activate. Dynamic additions, removals, and visibility
          changes update the Tab stop. Native text editing keys remain with the
          input; prefer keeping text inputs outside the toolbar’s
          arrow-navigation sequence.
        </p>
        <p>
          Wrapping is enabled by default for narrow screens. With wrap=false,
          provide a scrolling container when controls exceed the available
          width. Arrow navigation follows DOM order across wrapped rows. The
          static entry has no animation dependency and respects reduced motion
          for its CSS color transitions.
        </p>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/"
          className="text-sm underline underline-offset-4"
        >
          WAI toolbar accessibility guidance
        </a>
      </Section>
      <PreviewApiSection slug="toolbar" />
      <ToolbarInstallationSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
