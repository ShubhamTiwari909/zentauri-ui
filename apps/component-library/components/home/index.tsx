import Link from "next/link";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SiteHeader } from "@/components/common/site-header";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";
import { useHome } from "./use-home";
import { LightLines } from "@/components/light-lines/LightLines";

export default function HomePage() {
  const { content } = useHome();

  return (
    <PreviewPageShell className="p-0">
      <SiteHeader />
      <section className="py-20 min-h-screen relative overflow-hidden">
        <LightLines
          gradientFrom="#0f0f0f"
          gradientTo="#1a1a2e"
          lightColor="#4ade80"
          lineColor="#4ade80"
          linesOpacity={0.1}
          lightsOpacity={0.7}
          speedMultiplier={1.5}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="py-20 mx-auto h-full flex max-w-3xl flex-col items-center justify-center space-y-8 text-center px-5">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
              {content.badge}
            </span>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {content.title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">
                {content.description}
              </p>
            </div>
            <div className="pt-8">
              <ButtonAnimated
                appearance="glass"
                animation="lift"
                className="px-8 py-3 text-lg font-medium cursor-pointer"
              >
                <Link href={content.ctaHref} passHref>
                  {content.ctaText}
                </Link>
              </ButtonAnimated>
            </div>
          </div>
        </LightLines>
      </section>
    </PreviewPageShell>
  );
}
