import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

export function AvatarHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Media
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Avatars with image, fallback, and status.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Optional status ring, grouped stacks, and motion presets for profile
            surfaces across the product.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar size="lg" status="online" animation="pop">
            <AvatarImage src="" alt="" />
            <AvatarFallback>ZU</AvatarFallback>
          </Avatar>
          <AvatarGroup aria-label="Team members">
            <Avatar size="md" shape="circle">
              <AvatarImage src="" alt="" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar size="md" shape="circle">
              <AvatarImage src="" alt="" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar size="md" shape="circle">
              <AvatarImage src="" alt="" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
    </section>
  );
}
