import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import {
  FiActivity,
  FiBell,
  FiCloud,
  FiDatabase,
  FiShield,
  FiZap,
} from "react-icons/fi";

const heroItems = [
  ["Deploys synced", FiCloud],
  ["99.98% uptime", FiActivity],
  ["Alerts routed", FiBell],
  ["Data replicated", FiDatabase],
  ["Policies enforced", FiShield],
  ["Launch queue live", FiZap],
] as const;

export function MarqueeHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard variant="panel" className="max-w-2xl overflow-hidden">
        <div className="space-y-4">
          <Marquee appearance="gradient-blue" gap={16} pauseOnHover speed={28}>
            {heroItems.map(([label, Icon]) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </span>
            ))}
          </Marquee>
          <Marquee
            appearance="outline"
            direction="right"
            gap={12}
            speed={36}
            size="sm"
          >
            {[...heroItems].reverse().map(([label, Icon]) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-200/20"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </span>
            ))}
          </Marquee>
        </div>
      </SectionCard>
    </Section>
  );
}
