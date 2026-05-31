import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  AnimatedNumber,
  AnimatedNumberCounter,
} from "@zentauri-ui/zentauri-components/ui/animated-number";

export function AnimatedNumberHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
              Digit entrance
            </p>
            <AnimatedNumber
              number={12345}
              type="fade"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              delayInSecond={0.2}
              appearance="error"
              size="lg"
            />
          </div>
          <div>
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
              Count up
            </p>
            <AnimatedNumberCounter
              number={12345}
              duration={2}
              appearance="orange"
              size="lg"
            />
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
