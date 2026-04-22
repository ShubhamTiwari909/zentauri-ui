import Link from "next/link";

import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

import { HomeLightLinesShell } from "./home-light-lines-shell";

type HomeHeroProps = {
  seo: PreviewSeoDocument;
};

export function HomeHero({ seo }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 min-h-screen lg:min-h-[calc(100vh-100px)]">
      <HomeLightLinesShell>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center sm:py-24">
          <PreviewHeroSeoBlock seo={seo} />
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <ButtonAnimated
              appearance="emerald"
              animation="lift"
              size="lg"
              className="cursor-pointer px-8 py-3 text-lg font-medium"
            >
              <Link href="/preview/installation">Get started</Link>
            </ButtonAnimated>
            <ButtonAnimated
              appearance="sky"
              animation="lift"
              size="lg"
              className="cursor-pointer px-8 py-3 text-lg font-medium"
            >
              <Link
                href="/preview/components"
              >
                Browse components
              </Link>
            </ButtonAnimated>
          </div>
        </div>
      </HomeLightLinesShell>
    </section>
  );
}
