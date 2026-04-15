import Link from "next/link";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { useIntroduction } from "./use-introduction";

export default function IntroductionPage() {
  const { components } = useIntroduction();

  return (
    <PreviewPageShell>
      <section className="max-w-3xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Component Library
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Available Components
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Explore the UI components currently available in Zentauri UI.
            Designed with Tailwind CSS, and a focus on beautiful, subtle
            interactions.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.id}
            href={component.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-white transition-colors group-hover:text-cyan-300">
                  {component.name}
                </h3>
                {component.badge && (
                  <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-300">
                    {component.badge}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                {component.description}
              </p>
            </div>

            <div className="mt-8 flex items-center text-sm font-medium text-cyan-400">
              View Component
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </PreviewPageShell>
  );
}
