import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SiteHeader } from "@/components/common/site-header";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { HomeHero } from "./hero";
import { HomeMarketingLoader } from "./marketing-loader";

const mainColumnClassName =
  "relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 sm:gap-24 sm:px-10 sm:py-20 lg:px-12";

type HomePageProps = {
  seo: PreviewSeoDocument;
};

export default function HomePage({ seo }: HomePageProps) {
  return (
    <PreviewPageShell className="p-0">
      <SiteHeader />
      <main className="relative overflow-hidden">
        <HomeHero seo={seo} />
        <div className={mainColumnClassName}>
          <HomeMarketingLoader />
          <section
            id="reference"
            aria-labelledby="reference-heading"
            className="space-y-6 border-t border-white/10 pt-12"
          >
            <h2
              id="reference-heading"
              className="text-xl font-semibold tracking-tight text-white"
            >
              Reference &amp; FAQ
            </h2>
            <PreviewSeoDoc doc={seo} />
          </section>
        </div>
      </main>
    </PreviewPageShell>
  );
}
