import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { JsonViewer } from "@zentauri-ui/zentauri-components/ui/json-viewer";

const HERO_DATA = {
  ok: true,
  status: 200,
  user: {
    id: "u_8f21",
    name: "Ada Lovelace",
    roles: ["admin", "editor"],
    verified: true,
    lastLogin: null,
  },
  items: [
    { id: 1, title: "First post", tags: ["intro"] },
    { id: 2, title: "Second post", tags: ["update", "release"] },
  ],
};

export function JsonViewerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <JsonViewer data={HERO_DATA} defaultExpandedDepth={2} />
      </div>
    </Section>
  );
}
