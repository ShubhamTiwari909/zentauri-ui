import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  BentoGridAnimated,
  BentoGridItemAnimated,
} from "@zentauri-ui/zentauri-components/ui/bento-grid/animated";

function HeroCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full flex-col justify-end gap-1 p-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </p>
      <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
        {body}
      </p>
    </div>
  );
}

export function BentoGridHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <BentoGridAnimated animation="morph" cols={4} gap="md">
          <BentoGridItemAnimated
            key="revenue"
            id="revenue"
            span="2x2"
            appearance="gradient-blue"
            expandable
            detail={
              <div className="space-y-2 pr-8">
                <h3 className="text-lg font-semibold">Revenue overview</h3>
                <p className="text-sm leading-6">
                  Click-to-detail morphs the card into this expanded panel with
                  a shared-element transition, traps focus while open, and
                  returns focus to the card on close. Press Escape or the close
                  button to morph back.
                </p>
              </div>
            }
          >
            <HeroCard
              title="Revenue overview"
              body="Featured 2x2 card — hover to expand, click for the morph-to-detail view."
            />
          </BentoGridItemAnimated>
          <BentoGridItemAnimated key="users" id="users" appearance="emerald">
            <HeroCard title="Active users" body="1x1 tile." />
          </BentoGridItemAnimated>
          <BentoGridItemAnimated
            key="uptime"
            id="uptime"
            appearance="purple"
            expandable
            expandedSpan="2x1"
          >
            <HeroCard title="Uptime" body="Hover me — I grow to 2x1." />
          </BentoGridItemAnimated>
          <BentoGridItemAnimated
            key="latency"
            id="latency"
            span="1x2"
            appearance="sky"
          >
            <HeroCard title="Latency" body="Tall 1x2 tile." />
          </BentoGridItemAnimated>
          <BentoGridItemAnimated key="errors" id="errors" appearance="rose">
            <HeroCard title="Errors" body="1x1 tile." />
          </BentoGridItemAnimated>
          <BentoGridItemAnimated
            key="deploys"
            id="deploys"
            span="2x1"
            appearance="glass"
            detail={
              <div className="space-y-2 pr-8">
                <h3 className="text-lg font-semibold">Deploys</h3>
                <p className="text-sm leading-6">
                  Any item with a `detail` becomes clickable when the grid runs
                  with animation=&quot;morph&quot;. DOM order always matches
                  visual order, so keyboard users tab through the grid in
                  reading order.
                </p>
              </div>
            }
          >
            <HeroCard
              title="Deploys"
              body="Wide glass tile — click for details."
            />
          </BentoGridItemAnimated>
          <BentoGridItemAnimated key="alerts" id="alerts" appearance="orange">
            <HeroCard title="Alerts" body="Dense flow backfills gaps." />
          </BentoGridItemAnimated>
        </BentoGridAnimated>
      </div>
    </Section>
  );
}
