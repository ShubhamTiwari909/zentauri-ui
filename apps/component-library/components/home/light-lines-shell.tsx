"use client";

import type { ReactNode } from "react";

import { LightLines } from "@/components/light-lines/LightLines";

type HomeLightLinesShellProps = {
  children: ReactNode;
};

export function HomeLightLinesShell({ children }: HomeLightLinesShellProps) {
  return (
    <LightLines
      gradientFrom="#020617"
      gradientTo="#0f172a"
      lightColor="#22d3ee"
      lineColor="#22d3ee"
      linesOpacity={0.12}
      lightsOpacity={0.65}
      speedMultiplier={1.35}
      className="flex min-h-[min(100dvh,56rem)] items-center justify-center"
    >
      {children}
    </LightLines>
  );
}
