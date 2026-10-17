// Public tokens are --zui-masked-heading-*; --_mh-* properties are private
// values. The heading's real text stays in the DOM as a transparent
// layout/accessibility layer; the media shows through an SVG clip built from it.

// Token pairs assign private variables, and a single utility reads each one,
// so a consumer `className="text-2xl"` or `text-white` wins in both themes.
export const zuiMaskedHeadingBase =
  "group/masked-heading relative isolate m-0 p-0 [text-wrap:balance] [-webkit-font-smoothing:antialiased] [--_mh-fg:var(--zui-masked-heading-fg,#0f172a)] dark:[--_mh-fg:var(--zui-masked-heading-fg-dark,#f8fafc)] text-[color:var(--_mh-fg,#0f172a)] [--_mh-font:var(--zui-masked-heading-font,initial)] dark:[--_mh-font:var(--zui-masked-heading-font-dark,var(--zui-masked-heading-font,initial))] font-[family-name:var(--_mh-font,inherit)] [--_mh-weight:var(--zui-masked-heading-weight,800)] dark:[--_mh-weight:var(--zui-masked-heading-weight-dark,var(--zui-masked-heading-weight,800))] font-[number:var(--_mh-weight,800)] [--_mh-leading:var(--zui-masked-heading-leading,1.05)] dark:[--_mh-leading:var(--zui-masked-heading-leading-dark,var(--zui-masked-heading-leading,1.05))] leading-[var(--_mh-leading,1.05)] [--_mh-tracking:var(--zui-masked-heading-tracking,-0.03em)] dark:[--_mh-tracking:var(--zui-masked-heading-tracking-dark,var(--zui-masked-heading-tracking,-0.03em))] tracking-[var(--_mh-tracking,-0.03em)] text-[length:var(--_mh-size,3rem)]";

export const zuiMaskedHeadingSizes = {
  sm: "[--_mh-size:var(--zui-masked-heading-sm-size,clamp(2rem,1.5rem_+_2.5vw,3rem))] dark:[--_mh-size:var(--zui-masked-heading-sm-size-dark,var(--zui-masked-heading-sm-size,clamp(2rem,1.5rem_+_2.5vw,3rem)))]",
  md: "[--_mh-size:var(--zui-masked-heading-md-size,clamp(2.5rem,1.75rem_+_4vw,4.5rem))] dark:[--_mh-size:var(--zui-masked-heading-md-size-dark,var(--zui-masked-heading-md-size,clamp(2.5rem,1.75rem_+_4vw,4.5rem)))]",
  lg: "[--_mh-size:var(--zui-masked-heading-lg-size,clamp(3rem,1.75rem_+_6vw,6rem))] dark:[--_mh-size:var(--zui-masked-heading-lg-size-dark,var(--zui-masked-heading-lg-size,clamp(3rem,1.75rem_+_6vw,6rem)))]",
  xl: "[--_mh-size:var(--zui-masked-heading-xl-size,clamp(3.5rem,1.5rem_+_9vw,8rem))] dark:[--_mh-size:var(--zui-masked-heading-xl-size-dark,var(--zui-masked-heading-xl-size,clamp(3.5rem,1.5rem_+_9vw,8rem)))]",
} as const;

export const zuiMaskedHeadingAligns = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
} as const;

// Gradient meshes shown through the letters when no `src` is supplied.
export const zuiMaskedHeadingAppearances = {
  aurora:
    "[--_mh-mesh:var(--zui-masked-heading-aurora-mesh,radial-gradient(at_18%_28%,#06b6d4_0,transparent_55%),radial-gradient(at_82%_18%,#8b5cf6_0,transparent_52%),radial-gradient(at_55%_88%,#10b981_0,transparent_58%),linear-gradient(135deg,#0284c7,#4f46e5))] dark:[--_mh-mesh:var(--zui-masked-heading-aurora-mesh-dark,radial-gradient(at_18%_28%,#22d3ee_0,transparent_55%),radial-gradient(at_82%_18%,#a78bfa_0,transparent_52%),radial-gradient(at_55%_88%,#34d399_0,transparent_58%),linear-gradient(135deg,#0ea5e9,#6366f1))]",
  sunset:
    "[--_mh-mesh:var(--zui-masked-heading-sunset-mesh,radial-gradient(at_15%_25%,#f97316_0,transparent_55%),radial-gradient(at_85%_30%,#db2777_0,transparent_55%),radial-gradient(at_50%_90%,#eab308_0,transparent_60%),linear-gradient(135deg,#ea580c,#be185d))] dark:[--_mh-mesh:var(--zui-masked-heading-sunset-mesh-dark,radial-gradient(at_15%_25%,#fb923c_0,transparent_55%),radial-gradient(at_85%_30%,#f472b6_0,transparent_55%),radial-gradient(at_50%_90%,#facc15_0,transparent_60%),linear-gradient(135deg,#f97316,#ec4899))]",
  ocean:
    "[--_mh-mesh:var(--zui-masked-heading-ocean-mesh,radial-gradient(at_20%_20%,#0ea5e9_0,transparent_55%),radial-gradient(at_80%_70%,#1d4ed8_0,transparent_55%),radial-gradient(at_45%_95%,#14b8a6_0,transparent_60%),linear-gradient(160deg,#0369a1,#1e3a8a))] dark:[--_mh-mesh:var(--zui-masked-heading-ocean-mesh-dark,radial-gradient(at_20%_20%,#38bdf8_0,transparent_55%),radial-gradient(at_80%_70%,#3b82f6_0,transparent_55%),radial-gradient(at_45%_95%,#2dd4bf_0,transparent_60%),linear-gradient(160deg,#0284c7,#1d4ed8))]",
  forest:
    "[--_mh-mesh:var(--zui-masked-heading-forest-mesh,radial-gradient(at_25%_30%,#16a34a_0,transparent_55%),radial-gradient(at_78%_25%,#65a30d_0,transparent_52%),radial-gradient(at_55%_90%,#0d9488_0,transparent_58%),linear-gradient(135deg,#15803d,#115e59))] dark:[--_mh-mesh:var(--zui-masked-heading-forest-mesh-dark,radial-gradient(at_25%_30%,#4ade80_0,transparent_55%),radial-gradient(at_78%_25%,#a3e635_0,transparent_52%),radial-gradient(at_55%_90%,#2dd4bf_0,transparent_58%),linear-gradient(135deg,#22c55e,#0f766e))]",
  ember:
    "[--_mh-mesh:var(--zui-masked-heading-ember-mesh,radial-gradient(at_20%_70%,#dc2626_0,transparent_55%),radial-gradient(at_75%_25%,#f59e0b_0,transparent_52%),radial-gradient(at_90%_90%,#9a3412_0,transparent_58%),linear-gradient(135deg,#b91c1c,#c2410c))] dark:[--_mh-mesh:var(--zui-masked-heading-ember-mesh-dark,radial-gradient(at_20%_70%,#f87171_0,transparent_55%),radial-gradient(at_75%_25%,#fbbf24_0,transparent_52%),radial-gradient(at_90%_90%,#ea580c_0,transparent_58%),linear-gradient(135deg,#ef4444,#f97316))]",
  candy:
    "[--_mh-mesh:var(--zui-masked-heading-candy-mesh,radial-gradient(at_15%_30%,#ec4899_0,transparent_55%),radial-gradient(at_85%_25%,#6366f1_0,transparent_52%),radial-gradient(at_50%_90%,#06b6d4_0,transparent_58%),linear-gradient(135deg,#c026d3,#4f46e5))] dark:[--_mh-mesh:var(--zui-masked-heading-candy-mesh-dark,radial-gradient(at_15%_30%,#f472b6_0,transparent_55%),radial-gradient(at_85%_25%,#818cf8_0,transparent_52%),radial-gradient(at_50%_90%,#22d3ee_0,transparent_58%),linear-gradient(135deg,#d946ef,#6366f1))]",
  midnight:
    "[--_mh-mesh:var(--zui-masked-heading-midnight-mesh,radial-gradient(at_20%_25%,#4338ca_0,transparent_55%),radial-gradient(at_80%_80%,#7e22ce_0,transparent_55%),radial-gradient(at_70%_15%,#0f766e_0,transparent_50%),linear-gradient(135deg,#1e1b4b,#312e81))] dark:[--_mh-mesh:var(--zui-masked-heading-midnight-mesh-dark,radial-gradient(at_20%_25%,#6366f1_0,transparent_55%),radial-gradient(at_80%_80%,#a855f7_0,transparent_55%),radial-gradient(at_70%_15%,#14b8a6_0,transparent_50%),linear-gradient(135deg,#312e81,#4c1d95))]",
  mono: "[--_mh-mesh:var(--zui-masked-heading-mono-mesh,radial-gradient(at_20%_25%,#64748b_0,transparent_55%),radial-gradient(at_80%_70%,#0f172a_0,transparent_55%),linear-gradient(135deg,#334155,#020617))] dark:[--_mh-mesh:var(--zui-masked-heading-mono-mesh-dark,radial-gradient(at_20%_25%,#f8fafc_0,transparent_55%),radial-gradient(at_80%_70%,#94a3b8_0,transparent_55%),linear-gradient(135deg,#e2e8f0,#64748b))]",
} as const;

// Transparent layout layer. It becomes readable text when scripts are off or
// the user forces system colors, because the clipped media layer cannot render.
export const zuiMaskedHeadingText =
  "relative block text-transparent [@media(scripting:none)]:text-current forced-colors:text-[CanvasText]";

export const zuiMaskedHeadingOutline =
  "[-webkit-text-stroke:var(--zui-masked-heading-outline-width,1px)_var(--zui-masked-heading-outline,color-mix(in_srgb,var(--_mh-fg,#64748b)_55%,transparent))] dark:[-webkit-text-stroke:var(--zui-masked-heading-outline-width-dark,var(--zui-masked-heading-outline-width,1px))_var(--zui-masked-heading-outline-dark,color-mix(in_srgb,var(--_mh-fg,#64748b)_55%,transparent))] forced-colors:[-webkit-text-stroke:0]";

export const zuiMaskedHeadingWord = "inline-block whitespace-pre";

export const zuiMaskedHeadingBaseline = "inline-block size-0";

export const zuiMaskedHeadingDefs =
  "pointer-events-none absolute size-0 overflow-hidden";

// The reveal layer bleeds 0.5em above and below the heading so ascenders and
// descenders are never cut off. It never bleeds sideways and clips its own
// overflow, so the overscanned media cannot cause horizontal page scrolling.
export const zuiMaskedHeadingReveal =
  "pointer-events-none absolute inset-x-0 inset-y-[-0.5em] block overflow-hidden select-none invisible group-data-[measured]/masked-heading:visible [@media(scripting:none)]:hidden forced-colors:hidden";

export const zuiMaskedHeadingClip = "absolute inset-0 block";

export const zuiMaskedHeadingMedia =
  "absolute inset-0 block bg-[color:var(--zui-masked-heading-media-bg,color-mix(in_srgb,currentColor_12%,transparent))] dark:bg-[color:var(--zui-masked-heading-media-bg-dark,color-mix(in_srgb,currentColor_12%,transparent))] [transform-origin:50%_50%]";

export const zuiMaskedHeadingMesh =
  "absolute inset-0 block [background:var(--_mh-mesh)] [background-size:cover]";

export const zuiMaskedHeadingSource =
  "absolute inset-0 block size-full max-w-none object-cover select-none [-webkit-user-drag:none]";
