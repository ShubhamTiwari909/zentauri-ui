import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { Section } from "@/components/common/Section";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { GridHeroSection } from "./sections/grid-hero-section";
import { GridCodeExamplesSection } from "./sections/grid-code-examples-section";
import { GridInstallationSection } from "./sections/grid-installation-section";
import { GridPlayground } from "./components/grid-playground";

export default function GridPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <GridHeroSection seo={seo} />
      <Section>
        <h2 className="text-2xl font-semibold">Grid layout playground</h2>
        <p className="mt-2 text-sm text-slate-400">
          Configure responsive columns, spacing, placement, and surfaces. Add or
          filter content while keeping React keys stable.
        </p>
        <GridPlayground />
      </Section>
      <GridCodeExamplesSection />
      <Section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Responsive and placement rules
        </h2>
        <p>
          Items stack one per row below the consumer&apos;s sm breakpoint by
          default (640px with standard Tailwind settings). Mobile stacking
          resets spans, starts, and named areas to preserve DOM order. Set{" "}
          <code>{"stackOnMobile={false}"}</code> on Grid to retain the
          configured mobile layout. Each nested Grid controls its own setting.
        </p>
        <p>
          Responsive maps require base. From sm upward, missing breakpoints
          inherit the latest smaller entry; each layout replaces its whole
          descriptor. The consumer&apos;s Tailwind viewport breakpoints apply.
          Gap overrides resolve independently, and a rowGap or columnGap scalar
          remains active at every width.
        </p>
        <p>
          Fixed numeric spans and starts clamp to declared columns. Auto layouts
          support span 1 or full, with automatic column placement. Named areas
          take precedence over spans; area=&quot;auto&quot; clears them. Keep
          GridItem as a direct DOM grid child. Nested roots isolate their layout
          configuration.
        </p>
        <p>
          Default items are neutral wrappers. Grid adds no ARIA grid roles, tab
          stops, or keyboard interception. Dense placement, explicit starts, and
          named areas can change visual order; keep meaningful DOM reading
          order. Use Bento Grid for expanding tiles and detail views. Animation,
          drag, resize, and persistence are follow-up features.
        </p>
      </Section>
      <PreviewApiSection slug="grid" />
      <GridInstallationSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
