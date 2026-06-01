import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@zentauri-ui/zentauri-components/ui/avatar";
import { AvatarAnimated } from "@zentauri-ui/zentauri-components/ui/avatar/animated";

export function AvatarHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <AvatarAnimated size="lg" animation="subtle">
            <AvatarImage
              alt="Sample user"
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=128&h=128&fit=crop"
            />
            <AvatarFallback>ZU</AvatarFallback>
          </AvatarAnimated>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Zentauri member
            </p>
            <p className="text-xs text-slate-800 dark:text-slate-400">
              Image + fallback pairing
            </p>
          </div>
        </div>
        <AvatarGroup max={3}>
          <Avatar size="md">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </SectionCard>
    </Section>
  );
}
