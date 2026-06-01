import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  AlertDefaultIcon,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@zentauri-ui/zentauri-components/ui/alert";
import { AlertAnimated } from "@zentauri-ui/zentauri-components/ui/alert/animated";

export function AlertHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="space-y-3 rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <AlertAnimated appearance="info" animation="fade">
          <AlertIcon>
            <AlertDefaultIcon appearance="info" />
          </AlertIcon>
          <div>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              Your workspace will refresh after you save changes.
            </AlertDescription>
          </div>
        </AlertAnimated>
        <AlertAnimated appearance="success" animation="slide-down" size="sm">
          <AlertIcon>
            <AlertDefaultIcon appearance="success" />
          </AlertIcon>
          <div>
            <AlertTitle>Deployed</AlertTitle>
            <AlertDescription>
              Build 482 is live in production.
            </AlertDescription>
          </div>
        </AlertAnimated>
      </div>
    </Section>
  );
}
