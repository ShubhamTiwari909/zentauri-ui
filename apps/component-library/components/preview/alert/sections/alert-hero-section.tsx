import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Alert,
  AlertDefaultIcon,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@zentauri-ui/zentauri-components/ui/alert";

export function AlertHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Alert appearance="info" animation="fade">
          <AlertIcon>
            <AlertDefaultIcon appearance="info" />
          </AlertIcon>
          <div>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              Your workspace will refresh after you save changes.
            </AlertDescription>
          </div>
        </Alert>
        <Alert appearance="success" animation="slide-down" size="sm">
          <AlertIcon>
            <AlertDefaultIcon appearance="success" />
          </AlertIcon>
          <div>
            <AlertTitle>Deployed</AlertTitle>
            <AlertDescription>
              Build 482 is live in production.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </section>
  );
}
