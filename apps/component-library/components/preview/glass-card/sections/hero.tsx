"use client";
import { ZuiGlassCard } from "@zentauri-ui/zentauri-components/ui/glass-card";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function GlassCardHero({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="plain">
      <PreviewHeroSeoBlock seo={seo} />
      <div
        data-theme="dark"
        className="relative isolate mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#070d1b] px-6 py-14 sm:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,#155e7566,transparent_55%),linear-gradient(125deg,transparent_30%,#312e8155,transparent_75%)]"
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
              Material studies / 001
            </p>
            <h2 className="text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl">
              Made of light.
              <br />
              <span className="text-cyan-200">Built for touch.</span>
            </h2>
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              A quiet surface with another dimension. Move your cursor across
              the crystal to catch the light.
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <span>CSS-powered</span>
              <span>No canvas</span>
              <span>Motion-aware</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm py-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-12 inset-y-0 rotate-12 rounded-[3rem] border border-cyan-200/15"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-x-4 inset-y-10 -rotate-12 rounded-[3rem] border border-indigo-200/15"
            />
            <ZuiGlassCard
              variant="crystal"
              appearance="glass"
              glow
              depth={32}
              intensity={14}
              glareIntensity={0.22}
              size="lg"
            >
              <ZuiGlassCard.Content className="flex min-h-80 flex-col justify-between gap-10">
                <div className="flex items-center justify-between text-xs tracking-[0.25em]">
                  <span>ZENTAURI</span>
                  <span>01 / ∞</span>
                </div>
                <div className="space-y-6">
                  <div
                    aria-hidden="true"
                    className="relative mx-auto h-20 w-20 rotate-45 rounded-2xl border border-cyan-100/60 bg-linear-to-br from-cyan-100/30 via-white/5 to-indigo-300/25 shadow-[inset_0_0_22px_#cffafe33,0_0_40px_#22d3ee22]"
                  >
                    <div className="absolute inset-3 rounded-lg border border-white/30" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">
                      The crystal collection
                    </p>
                    <h3 className="mt-3 text-3xl font-medium tracking-tight">
                      Beyond the surface.
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xs text-slate-300">
                  <span>Light. Form. Perspective.</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </ZuiGlassCard.Content>
            </ZuiGlassCard>
          </div>
        </div>
      </div>
    </Section>
  );
}
