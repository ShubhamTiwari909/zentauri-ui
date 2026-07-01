import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CodeBlock } from "@zentauri-ui/zentauri-components/ui/code-block";

const HERO_CODE = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

export function CodeBlockHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="overflow-auto">
        <CodeBlock
          code={HERO_CODE}
          language="typescript"
          appearance="default"
          size="md"
          showLineNumbers
        />
      </SectionCard>
    </Section>
  );
}
