import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TerminalEmulator } from "@zentauri-ui/zentauri-components/ui/terminal-emulator";
import type { TerminalLine } from "@zentauri-ui/zentauri-components/ui/terminal-emulator";

const HERO_LINES: TerminalLine[] = [
  { type: "comment", text: "# scaffold and install" },
  { type: "command", text: "pnpm create zentauri-app my-app" },
  { type: "output", text: "Creating my-app in ./my-app" },
  { type: "command", text: "cd my-app && pnpm install" },
  { type: "output", text: "Packages: +312" },
  { type: "output", text: "Done in 4.1s" },
  { type: "command", text: "pnpm build" },
  { type: "output", text: "✓ Compiled successfully" },
];

export function TerminalEmulatorHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <TerminalEmulator lines={HERO_LINES} title="zsh — my-app" />
      </div>
    </Section>
  );
}
