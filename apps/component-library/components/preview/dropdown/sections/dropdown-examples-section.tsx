import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";

const MENU_SURFACE_CLASS =
  "border border-white/10 bg-slate-900 text-slate-100 shadow-lg";

export function DropdownExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Single-select closes the menu after a choice. Multi-select keeps the
        menu open and toggles checkmarks per item value.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("Single-select · outline trigger · default items")}
<Dropdown>
  <DropdownTrigger variant="outline" size="md">
    Actions
  </DropdownTrigger>
  <DropdownContent className="${MENU_SURFACE_CLASS}">
    <DropdownItem value="edit">Edit</DropdownItem>
    <DropdownItem value="duplicate">Duplicate</DropdownItem>
    <DropdownItem value="archive" variant="outline">
      Archive
    </DropdownItem>
  </DropdownContent>
</Dropdown>`}
        >
          <Dropdown>
            <DropdownTrigger variant="outline" size="md">
              Actions
            </DropdownTrigger>
            <DropdownContent className={MENU_SURFACE_CLASS}>
              <DropdownItem value="edit">Edit</DropdownItem>
              <DropdownItem value="duplicate">Duplicate</DropdownItem>
              <DropdownItem value="archive" variant="outline">
                Archive
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("Multi-select · ghost trigger")}
<Dropdown multiSelect>
  <DropdownTrigger variant="ghost" size="sm">
    Labels
  </DropdownTrigger>
  <DropdownContent className="${MENU_SURFACE_CLASS}">
    <DropdownItem value="bug">Bug</DropdownItem>
    <DropdownItem value="feature">Feature</DropdownItem>
    <DropdownItem value="docs">Docs</DropdownItem>
  </DropdownContent>
</Dropdown>`}
        >
          <Dropdown multiSelect>
            <DropdownTrigger variant="ghost" size="sm">
              Labels
            </DropdownTrigger>
            <DropdownContent className={MENU_SURFACE_CLASS}>
              <DropdownItem value="bug">Bug</DropdownItem>
              <DropdownItem value="feature">Feature</DropdownItem>
              <DropdownItem value="docs">Docs</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
