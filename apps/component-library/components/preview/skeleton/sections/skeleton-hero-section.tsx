import {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
} from "@/components/ui/skeleton";

export function SkeletonHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Loading
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Skeletons for perceived performance.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Block primitives, multi-line text, and avatar placeholders with
            shimmer animation when content is resolving.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex gap-4">
          <SkeletonAvatar avatarSize="lg" animation="shimmer" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-[60%]" rounded="md" animation="shimmer" />
            <SkeletonText lines={2} animation="shimmer" />
          </div>
        </div>
      </div>
    </section>
  );
}
