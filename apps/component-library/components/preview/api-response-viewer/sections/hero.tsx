import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ApiResponseViewer } from "@zentauri-ui/zentauri-components/ui/api-response-viewer";

const HERO_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "private, max-age=0",
  "x-request-id": "req_8f21a0",
};

const HERO_BODY = {
  ok: true,
  user: {
    id: "u_8f21",
    name: "Ada Lovelace",
    roles: ["admin", "editor"],
    verified: true,
  },
};

export function ApiResponseViewerHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <ApiResponseViewer
          status={200}
          method="GET"
          url="https://api.example.com/v1/users/8f21"
          time={128}
          responseSize="2.4 KB"
          headers={HERO_HEADERS}
          body={HERO_BODY}
        />
      </div>
    </Section>
  );
}
