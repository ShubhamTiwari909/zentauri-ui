import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@zentauri-ui/zentauri-components/ui/avatar";

export function AvatarHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Avatar size="lg" animation="subtle">
            <AvatarImage
              alt="Sample user"
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=128&h=128&fit=crop"
            />
            <AvatarFallback>ZU</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-white">Zentauri member</p>
            <p className="text-xs text-slate-400">Image + fallback pairing</p>
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
      </div>
    </section>
  );
}
