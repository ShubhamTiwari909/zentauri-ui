import { Section } from "@/components/common/Section";
import Link from "next/link";

import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  TYPOGRAPHY_SECTION_SLUGS,
  typographySectionLabels,
} from "@/lib/typography-preview-registry";
import { Heading, Text } from "@zentauri-ui/zentauri-components/ui/typography";

export default function TypographyHubPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <Heading level={3} tone="primary">Browse sections</Heading>
          <Text className="mt-2 text-white" tone="default">
            Pick a topic to view variants, formatting, combinations, and
            snippets.
          </Text>
        </div>
      </Section>

      <Section
        variant="plain"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TYPOGRAPHY_SECTION_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/preview/typography/${slug}`}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-lg shadow-slate-950/30 transition hover:border-cyan-400/35 hover:bg-white/4"
          >
            <Heading level={4} tone="primary">
              {typographySectionLabels[slug]}
            </Heading>
            <Text className="mt-2 text-sm text-white" tone="default">
              Open preview
            </Text>
          </Link>
        ))}
      </Section>

      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
