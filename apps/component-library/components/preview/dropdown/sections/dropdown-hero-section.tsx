import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
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
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
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
      </div>
    </section>
  );
}
