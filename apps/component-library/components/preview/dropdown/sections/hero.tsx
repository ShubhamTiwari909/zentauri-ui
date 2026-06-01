import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";

const MENU_SURFACE_CLASS =
  "border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-slate-900 text-slate-100 shadow-lg";

export function DropdownHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard variant="panel">
        <Dropdown>
          <DropdownTrigger variant="outline" size="md">
            Open menu
          </DropdownTrigger>
          <DropdownContent className={MENU_SURFACE_CLASS}>
            <DropdownItem value="profile">Profile</DropdownItem>
            <DropdownItem value="settings">Settings</DropdownItem>
            <DropdownItem value="sign-out" variant="rose">
              Sign out
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </SectionCard>
    </Section>
  );
}
