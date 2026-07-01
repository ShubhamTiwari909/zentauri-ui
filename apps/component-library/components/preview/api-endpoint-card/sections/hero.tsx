import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ApiEndpointCard } from "@zentauri-ui/zentauri-components/ui/api-endpoint-card";

const HERO_ENDPOINT = {
  method: "GET" as const,
  path: "/api/v1/users/:id",
  description: "Retrieve a user by their unique identifier.",
};

export function ApiEndpointCardHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <ApiEndpointCard {...HERO_ENDPOINT} />
      </div>
    </Section>
  );
}
