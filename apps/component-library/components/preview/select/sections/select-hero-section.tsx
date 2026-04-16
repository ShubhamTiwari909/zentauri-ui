import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zentauri-ui/zentauri-components/ui/select";

export function SelectHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Select defaultValue={["next"]} multiple={false}>
          <SelectTrigger variant="emerald" size="md">
            <SelectValue placeholder="Pick a framework" />
          </SelectTrigger>
          <SelectContent appearance="emerald" size="md" spacing="sm">
            <SelectItem value="next" appearance="emerald">Next.js</SelectItem>
            <SelectItem value="vite" appearance="emerald">Vite</SelectItem>
            <SelectItem value="remix" appearance="emerald">Remix</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
