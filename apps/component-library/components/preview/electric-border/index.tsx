import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ElectricBorderHero } from "./sections/hero";
import { ElectricBorderPlayground } from "./sections/playground";
import { ElectricBorderExamples } from "./sections/snippet-sections";

export default function ElectricBorderPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ElectricBorderHero seo={seo} />
      <ElectricBorderPlayground />
      <ElectricBorderExamples />
      <Section variant="plain" className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Install the current.
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          Use the package entry or vendor the source through the Zentauri CLI.
          No optional animation peer is needed.
        </p>
        <CodeHighlight
          codeString={`pnpm add @zentauri-ui/zentauri-components\n\n# Or vendor the component source:\nnpx @zentauri-ui/zentauri-components add electric-border`}
        />
      </Section>
      <PreviewApiSection slug="electric-border" />
      <PreviewSeoDoc doc={seo} />
      <p className="text-xs leading-6 text-slate-400">
        Interaction study inspired by{" "}
        <a
          href="https://reactbits.dev/animations/electric-border"
          className="underline underline-offset-4"
        >
          React Bits Electric Border
        </a>
        . Independently written SVG rendering; no reference code or assets are
        included.
      </p>
    </PreviewPageShell>
  );
}
