import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";

const MENU_SURFACE_CLASS =
  "border border-white/10 bg-slate-900 text-slate-100 shadow-lg";

export function DropdownHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
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
