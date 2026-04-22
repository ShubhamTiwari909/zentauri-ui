import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SiteHeader } from "@/components/common/site-header";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { HomeHero } from "./home-hero";
import { HomeMarketing } from "./home-marketing";

const mainColumnClassName =
  "mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12 sm:gap-20 sm:px-10 sm:py-16 lg:px-12";

type HomePageProps = {
  seo: PreviewSeoDocument;
};

export default function HomePage({ seo }: HomePageProps) {
  return (
    <PreviewPageShell className="p-0">
      <SiteHeader />
      <HomeHero seo={seo} />
      <div className={mainColumnClassName}>
        <HomeMarketing />
        <section id="reference" aria-labelledby="reference-heading" className="space-y-6">
          <h2
            id="reference-heading"
            className="text-xl font-semibold tracking-tight text-white"
          >
            Reference &amp; FAQ
          </h2>
          <PreviewSeoDoc doc={seo} />
        </section>
      </div>
    </PreviewPageShell>
  );
}
