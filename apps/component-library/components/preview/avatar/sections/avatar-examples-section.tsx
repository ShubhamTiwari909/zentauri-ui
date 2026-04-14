"use client";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Fallback initials when no image is provided.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`<Avatar size="xl" shape="squircle" status="busy">
  <AvatarImage src="/photo.jpg" alt="Alex" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>`}
        >
          <Avatar size="xl" shape="squircle" status="busy">
            <AvatarImage src="" alt="Alex" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
