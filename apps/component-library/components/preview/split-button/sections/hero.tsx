import { FiDownload, FiSave } from "react-icons/fi";

import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SplitButton } from "@zentauri-ui/zentauri-components/ui/split-button";

const heroItems = [
  { id: "save-as", label: "Save As" },
  { id: "export", label: "Export", icon: <FiDownload aria-hidden /> },
  { id: "duplicate", label: "Duplicate" },
];

export function SplitButtonHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-xl">
        <div className="grid gap-6">
          <div className="rounded-xl border border-slate-900/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950">
            <div className="flex flex-wrap items-center gap-3">
              <SplitButton
                label="Save"
                startIcon={<FiSave aria-hidden />}
                items={heroItems}
              />
              <SplitButton
                appearance="outline"
                label="Publish"
                items={[
                  { id: "schedule", label: "Schedule" },
                  { id: "preview", label: "Preview" },
                ]}
              />
            </div>
          </div>
          <div className="grid gap-3 rounded-xl border border-slate-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
            <SplitButton
              fullWidth
              appearance="secondary"
              label="Save document changes"
              items={heroItems}
            />
            <SplitButton fullWidth loading label="Syncing" items={heroItems} />
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
