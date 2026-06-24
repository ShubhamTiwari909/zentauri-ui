import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { CodeDiff } from "@zentauri-ui/zentauri-components/ui/code-diff";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

const heroOldCode = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}`;

const heroNewCode = `function greet(name) {
  console.log(\`Hello, \${name}\`);
  return true;
}

// Added farewell
sayGoodbye();`;

export function CodeDiffHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <CodeDiff
          oldCode={heroOldCode}
          newCode={heroNewCode}
          viewType="unified"
          oldTitle="Before"
          newTitle="After"
        />
      </div>
    </Section>
  );
}
