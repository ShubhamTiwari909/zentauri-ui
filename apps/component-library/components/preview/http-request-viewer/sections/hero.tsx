import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { HttpRequestViewer } from "@zentauri-ui/zentauri-components/ui/http-request-viewer";

const HERO_REQUEST = {
  method: "POST",
  url: "https://api.example.com/v1/auth/login",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer eyJhbGciOi…",
    "X-Request-Id": "req_8f21c4",
  },
  query: {
    redirect: "/dashboard",
    locale: "en-US",
  },
  body: {
    email: "ada@example.com",
    password: "••••••••",
    remember: true,
  },
};

export function HttpRequestViewerHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <HttpRequestViewer {...HERO_REQUEST} defaultTab="body" />
      </div>
    </Section>
  );
}
