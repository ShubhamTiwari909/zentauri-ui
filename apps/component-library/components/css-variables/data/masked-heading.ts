import { defineCssVariableReference } from "../reference-types";

export const maskedHeadingCssVariables = defineCssVariableReference({
  title: "Masked Heading CSS variables",
  description:
    "Theme the heading type, the gradient mesh shown through the letters, the outline stroke and the media placeholder. Motion is configured through props; private --_mh-* values are not a public token API.",
  lightVariables: [
    ["masked-heading-fg", "#0f172a"],
    ["masked-heading-font", "initial"],
    ["masked-heading-weight", "800"],
    ["masked-heading-leading", "1.05"],
    ["masked-heading-tracking", "-0.03em"],
    ["masked-heading-sm-size", "clamp(2rem,1.5rem + 2.5vw,3rem)"],
    ["masked-heading-md-size", "clamp(2.5rem,1.75rem + 4vw,4.5rem)"],
    ["masked-heading-lg-size", "clamp(3rem,1.75rem + 6vw,6rem)"],
    ["masked-heading-xl-size", "clamp(3.5rem,1.5rem + 9vw,8rem)"],
    [
      "masked-heading-aurora-mesh",
      "radial-gradient(at 18% 28%,#06b6d4 0,transparent 55%),radial-gradient(at 82% 18%,#8b5cf6 0,transparent 52%),radial-gradient(at 55% 88%,#10b981 0,transparent 58%),linear-gradient(135deg,#0284c7,#4f46e5)",
    ],
    [
      "masked-heading-sunset-mesh",
      "radial-gradient(at 15% 25%,#f97316 0,transparent 55%),radial-gradient(at 85% 30%,#db2777 0,transparent 55%),radial-gradient(at 50% 90%,#eab308 0,transparent 60%),linear-gradient(135deg,#ea580c,#be185d)",
    ],
    [
      "masked-heading-ocean-mesh",
      "radial-gradient(at 20% 20%,#0ea5e9 0,transparent 55%),radial-gradient(at 80% 70%,#1d4ed8 0,transparent 55%),radial-gradient(at 45% 95%,#14b8a6 0,transparent 60%),linear-gradient(160deg,#0369a1,#1e3a8a)",
    ],
    [
      "masked-heading-forest-mesh",
      "radial-gradient(at 25% 30%,#16a34a 0,transparent 55%),radial-gradient(at 78% 25%,#65a30d 0,transparent 52%),radial-gradient(at 55% 90%,#0d9488 0,transparent 58%),linear-gradient(135deg,#15803d,#115e59)",
    ],
    [
      "masked-heading-ember-mesh",
      "radial-gradient(at 20% 70%,#dc2626 0,transparent 55%),radial-gradient(at 75% 25%,#f59e0b 0,transparent 52%),radial-gradient(at 90% 90%,#9a3412 0,transparent 58%),linear-gradient(135deg,#b91c1c,#c2410c)",
    ],
    [
      "masked-heading-candy-mesh",
      "radial-gradient(at 15% 30%,#ec4899 0,transparent 55%),radial-gradient(at 85% 25%,#6366f1 0,transparent 52%),radial-gradient(at 50% 90%,#06b6d4 0,transparent 58%),linear-gradient(135deg,#c026d3,#4f46e5)",
    ],
    [
      "masked-heading-midnight-mesh",
      "radial-gradient(at 20% 25%,#4338ca 0,transparent 55%),radial-gradient(at 80% 80%,#7e22ce 0,transparent 55%),radial-gradient(at 70% 15%,#0f766e 0,transparent 50%),linear-gradient(135deg,#1e1b4b,#312e81)",
    ],
    [
      "masked-heading-mono-mesh",
      "radial-gradient(at 20% 25%,#64748b 0,transparent 55%),radial-gradient(at 80% 70%,#0f172a 0,transparent 55%),linear-gradient(135deg,#334155,#020617)",
    ],
    ["masked-heading-outline-width", "1px"],
    [
      "masked-heading-outline",
      "color-mix(in srgb,var(--_mh-fg,#64748b) 55%,transparent)",
    ],
    [
      "masked-heading-media-bg",
      "color-mix(in srgb,currentColor 12%,transparent)",
    ],
  ],
  darkExamples: [
    ["masked-heading-fg-dark", "#f8fafc"],
    ["masked-heading-font-dark", "initial"],
    ["masked-heading-weight-dark", "800"],
    ["masked-heading-leading-dark", "1.05"],
    ["masked-heading-tracking-dark", "-0.03em"],
    ["masked-heading-sm-size-dark", "clamp(2rem,1.5rem + 2.5vw,3rem)"],
    ["masked-heading-md-size-dark", "clamp(2.5rem,1.75rem + 4vw,4.5rem)"],
    ["masked-heading-lg-size-dark", "clamp(3rem,1.75rem + 6vw,6rem)"],
    ["masked-heading-xl-size-dark", "clamp(3.5rem,1.5rem + 9vw,8rem)"],
    [
      "masked-heading-aurora-mesh-dark",
      "radial-gradient(at 18% 28%,#22d3ee 0,transparent 55%),radial-gradient(at 82% 18%,#a78bfa 0,transparent 52%),radial-gradient(at 55% 88%,#34d399 0,transparent 58%),linear-gradient(135deg,#0ea5e9,#6366f1)",
    ],
    [
      "masked-heading-sunset-mesh-dark",
      "radial-gradient(at 15% 25%,#fb923c 0,transparent 55%),radial-gradient(at 85% 30%,#f472b6 0,transparent 55%),radial-gradient(at 50% 90%,#facc15 0,transparent 60%),linear-gradient(135deg,#f97316,#ec4899)",
    ],
    [
      "masked-heading-ocean-mesh-dark",
      "radial-gradient(at 20% 20%,#38bdf8 0,transparent 55%),radial-gradient(at 80% 70%,#3b82f6 0,transparent 55%),radial-gradient(at 45% 95%,#2dd4bf 0,transparent 60%),linear-gradient(160deg,#0284c7,#1d4ed8)",
    ],
    [
      "masked-heading-forest-mesh-dark",
      "radial-gradient(at 25% 30%,#4ade80 0,transparent 55%),radial-gradient(at 78% 25%,#a3e635 0,transparent 52%),radial-gradient(at 55% 90%,#2dd4bf 0,transparent 58%),linear-gradient(135deg,#22c55e,#0f766e)",
    ],
    [
      "masked-heading-ember-mesh-dark",
      "radial-gradient(at 20% 70%,#f87171 0,transparent 55%),radial-gradient(at 75% 25%,#fbbf24 0,transparent 52%),radial-gradient(at 90% 90%,#ea580c 0,transparent 58%),linear-gradient(135deg,#ef4444,#f97316)",
    ],
    [
      "masked-heading-candy-mesh-dark",
      "radial-gradient(at 15% 30%,#f472b6 0,transparent 55%),radial-gradient(at 85% 25%,#818cf8 0,transparent 52%),radial-gradient(at 50% 90%,#22d3ee 0,transparent 58%),linear-gradient(135deg,#d946ef,#6366f1)",
    ],
    [
      "masked-heading-midnight-mesh-dark",
      "radial-gradient(at 20% 25%,#6366f1 0,transparent 55%),radial-gradient(at 80% 80%,#a855f7 0,transparent 55%),radial-gradient(at 70% 15%,#14b8a6 0,transparent 50%),linear-gradient(135deg,#312e81,#4c1d95)",
    ],
    [
      "masked-heading-mono-mesh-dark",
      "radial-gradient(at 20% 25%,#f8fafc 0,transparent 55%),radial-gradient(at 80% 70%,#94a3b8 0,transparent 55%),linear-gradient(135deg,#e2e8f0,#64748b)",
    ],
    ["masked-heading-outline-width-dark", "1px"],
    [
      "masked-heading-outline-dark",
      "color-mix(in srgb,var(--_mh-fg,#64748b) 55%,transparent)",
    ],
    [
      "masked-heading-media-bg-dark",
      "color-mix(in srgb,currentColor 12%,transparent)",
    ],
  ],
  darkVariableCount: 20,
});
