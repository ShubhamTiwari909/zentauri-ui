import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@zentauri-ui/zentauri-components/ui/context-menu";

const files = [
  ["schema.prisma", "Modified 2 min ago", "Database"],
  ["route.ts", "Reviewed today", "API"],
  ["billing.tsx", "Ready to merge", "UI"],
];

export function ContextMenuHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard variant="panel" className="max-w-xl">
        <div className="flex flex-col gap-3">
          {files.map(([name, detail, tag]) => (
            <ContextMenu key={name}>
              <ContextMenuTrigger>
                <article className="cursor-context-menu rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left shadow-lg transition hover:border-cyan-300/40">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-semibold text-white">
                        {name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{detail}</p>
                    </div>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-200/20">
                      {tag}
                    </span>
                  </div>
                </article>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuLabel>File actions</ContextMenuLabel>
                <ContextMenuItem>Open</ContextMenuItem>
                <ContextMenuItem>Copy path</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Components</ContextMenuItem>
                    <ContextMenuItem>Routes</ContextMenuItem>
                    <ContextMenuItem>Archive</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem variant="rose">Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </SectionCard>
    </Section>
  );
}
