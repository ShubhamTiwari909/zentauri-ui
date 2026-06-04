import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import Image from "next/image";
import {
  FiBox,
  FiCheckCircle,
  FiCode,
  FiLayers,
  FiPackage,
} from "react-icons/fi";


const HOME_HERO_TITLE_ID = "home-hero-title";

type HomeHeroProps = {
  seo: PreviewSeoDocument;
};

const HERO_FEATURES = [
  { icon: FiLayers, label: "Token variants" },
  { icon: FiCode, label: "Typed snippets" },
  { icon: FiPackage, label: "CLI install" },
] as const;

function HeroProductPreview() {
  return (
    <div className="relative w-full max-w-xl lg:max-w-none">
      <div className="absolute -inset-1 rounded-lg border border-white/10 bg-white/3" />
      <div className="relative overflow-hidden rounded-lg border border-white/15 bg-slate-950/85 shadow-2xl shadow-slate-950/50 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
            live preview
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center gap-2">
              <Badge appearance="sky" size="sm">
                Button
              </Badge>
              <Badge appearance="emerald" size="sm">
                Input
              </Badge>
              <Badge appearance="orange" size="sm">
                Toast
              </Badge>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/4 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Product surface
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Gradients, glass, motion, and dark mode ready states.
                    </p>
                  </div>
                  <FiBox className="h-5 w-5 text-cyan-200" aria-hidden />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button appearance="sky" size="sm" className="px-4">
                    Primary
                  </Button>
                  <Button appearance="gradient-teal" size="sm" className="px-4">
                    Gradient
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["Sky", "Rose", "Amber"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/[0.035] p-3"
                  >
                    <span
                      className={[
                        "block h-1.5 rounded-full",
                        index === 0
                          ? "bg-cyan-300"
                          : index === 1
                            ? "bg-rose-300"
                            : "bg-amber-300",
                      ].join(" ")}
                    />
                    <p className="mt-2 text-xs font-medium text-slate-300">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-lg border border-white/10 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-slate-400">
                  pnpm add @zentauri-ui
                </p>
                <FiCheckCircle
                  className="h-4 w-4 text-emerald-300"
                  aria-hidden
                />
              </div>
              <div className="mt-4 space-y-3">
                {HERO_FEATURES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-cyan-200 ring-1 ring-white/10">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm text-slate-200">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  quality
                </p>
                <p className="font-mono text-sm text-white">typed APIs</p>
              </div>
              <Progress
                value={88}
                appearance="emerald"
                size="sm"
                aria-label="Homepage typed API quality preview"
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeHero({ seo }: HomeHeroProps) {
  return (
    <section
      aria-labelledby={HOME_HERO_TITLE_ID}
      className="relative isolate overflow-hidden py-10 sm:py-14 lg:min-h-[calc(100svh-8rem)]"
    >
      <Image src={"/mountain-space-bg.jpg"} alt="Mountain space background" fill className="-z-20 object-cover" />
      <div className="absolute inset-0 bg-slate-900/70 -z-10" />
      <div className="mx-auto grid w-full max-w-(--max-w-8xl) items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="max-w-3xl text-left">
          <PreviewHeroSeoBlock seo={seo} headingId={HOME_HERO_TITLE_ID} />
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium text-slate-400">
            {["Tailwind v4", "CVA variants", "Optional motion"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/50 text-white bg-white/4 px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              as="link"
              href="/preview/installation"
              appearance="gradient-teal"
              size="lg"
              className="justify-center px-7 py-3 text-base font-medium"
            >
              Get started
            </Button>
            <Button
              as="link"
              href="/preview/components"
              appearance="gradient-blue"
              size="lg"
              className="justify-center px-7 py-3 text-base font-medium"
            >
              Browse components
            </Button>
            <Button
              as="link"
              href="/preview/hooks"
              appearance="gradient-purple"
              size="lg"
              className="justify-center px-7 py-3 text-base font-medium"
            >
              Browse hooks
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 lg:items-end">
          <HeroProductPreview />
        </div>
      </div>
    </section>
  );
}
