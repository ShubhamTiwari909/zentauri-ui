// Public material tokens; --_gc-* properties are private runtime values.
export const zuiGlassCardBase =
  "relative isolate rounded-3xl text-[var(--zui-glass-card-fg,#0f172a)] dark:text-[var(--zui-glass-card-fg-dark,#f1f5f9)] [--_gc-edge:var(--zui-glass-card-border,#ffffffb3)] dark:[--_gc-edge:var(--zui-glass-card-border-dark,#ffffff38)] [--_gc-highlight:var(--zui-glass-card-highlight,#ffffffb3)] dark:[--_gc-highlight:var(--zui-glass-card-highlight-dark,#ffffff45)] [--_gc-shadow:var(--zui-glass-card-shadow,0_20px_50px_-18px_#0f172a45)] dark:[--_gc-shadow:var(--zui-glass-card-shadow-dark,0_24px_60px_-16px_#00000099)] [--_gc-glow-color:var(--zui-glass-card-glow,#0891b2)] dark:[--_gc-glow-color:var(--zui-glass-card-glow-dark,#22d3ee)] [--_gc-glare-color:var(--zui-glass-card-glare,#ffffff)] dark:[--_gc-glare-color:var(--zui-glass-card-glare-dark,#ffffff)]";

export const zuiGlassCardAppearances = {
  default:
    "[--_gc-bg:var(--zui-glass-card-bg,#ffffff99)] dark:[--_gc-bg:var(--zui-glass-card-bg-dark,#0f172ab3)]",
  subtle:
    "[--_gc-bg:var(--zui-glass-card-subtle-bg,#f1f5f9d9)] dark:[--_gc-bg:var(--zui-glass-card-subtle-bg-dark,#1e293bd9)]",
  contrast:
    "[--_gc-bg:var(--zui-glass-card-contrast-bg,#ffffffed)] dark:[--_gc-bg:var(--zui-glass-card-contrast-bg-dark,#020617ed)]",
  cyan: "[--_gc-bg:var(--zui-glass-card-cyan-bg,#cffafe99)] dark:[--_gc-bg:var(--zui-glass-card-cyan-bg-dark,#164e63a6)]",
  violet:
    "[--_gc-bg:var(--zui-glass-card-violet-bg,#ede9fe99)] dark:[--_gc-bg:var(--zui-glass-card-violet-bg-dark,#4c1d9580)]",
  "gradient-blue":
    "[--_gc-bg:var(--zui-glass-card-gradient-blue-bg,linear-gradient(135deg,#cffafeb3,#e0e7ff99))] dark:[--_gc-bg:var(--zui-glass-card-gradient-blue-bg-dark,linear-gradient(135deg,#164e6399,#312e8199))]",
  glass:
    "[--_gc-bg:var(--zui-glass-card-glass-bg,#ffffff59)] dark:[--_gc-bg:var(--zui-glass-card-glass-bg-dark,#ffffff0d)]",
} as const;

export const zuiGlassCardMaterials = {
  glass:
    "[--_gc-blur:var(--zui-glass-card-glass-blur,16px)] dark:[--_gc-blur:var(--zui-glass-card-glass-blur-dark,16px)] [--_gc-reflection:var(--zui-glass-card-glass-reflection,.35)] dark:[--_gc-reflection:var(--zui-glass-card-glass-reflection-dark,.35)] [--_gc-edge-width:var(--zui-glass-card-glass-edge-width,1px)] dark:[--_gc-edge-width:var(--zui-glass-card-glass-edge-width-dark,1px)]",
  crystal:
    "[--_gc-blur:var(--zui-glass-card-crystal-blur,8px)] dark:[--_gc-blur:var(--zui-glass-card-crystal-blur-dark,8px)] [--_gc-reflection:var(--zui-glass-card-crystal-reflection,.8)] dark:[--_gc-reflection:var(--zui-glass-card-crystal-reflection-dark,.8)] [--_gc-edge-width:var(--zui-glass-card-crystal-edge-width,2px)] dark:[--_gc-edge-width:var(--zui-glass-card-crystal-edge-width-dark,2px)]",
  frosted:
    "[--_gc-blur:var(--zui-glass-card-frosted-blur,24px)] dark:[--_gc-blur:var(--zui-glass-card-frosted-blur-dark,24px)] [--_gc-reflection:var(--zui-glass-card-frosted-reflection,.15)] dark:[--_gc-reflection:var(--zui-glass-card-frosted-reflection-dark,.15)] [--_gc-edge-width:var(--zui-glass-card-frosted-edge-width,1px)] dark:[--_gc-edge-width:var(--zui-glass-card-frosted-edge-width-dark,1px)]",
} as const;

export const zuiGlassCardSurface =
  "relative h-full rounded-[inherit] [--_gc-rx:0deg] [--_gc-ry:0deg] [--_gc-scale:1] [--_gc-px:50%] [--_gc-py:50%] [--_gc-glare:0] [transform-style:preserve-3d] [transform:rotateX(var(--_gc-rx,0deg))_rotateY(var(--_gc-ry,0deg))_scale(var(--_gc-scale,1))] motion-reduce:!transform-none motion-reduce:![translate:none]";

export const zuiGlassCardMaterial =
  "pointer-events-none absolute inset-0 rounded-[inherit] [background:var(--_gc-bg)] [border:var(--_gc-edge-width)_solid_var(--_gc-edge)] [box-shadow:var(--_gc-shadow),inset_0_1px_0_var(--_gc-highlight)] [backdrop-filter:blur(var(--_gc-blur))] [-webkit-backdrop-filter:blur(var(--_gc-blur))]";

export const zuiGlassCardReflection =
  "pointer-events-none absolute inset-0 rounded-[inherit] [background:linear-gradient(135deg,var(--_gc-highlight),transparent_35%,transparent_65%,var(--_gc-highlight))] [opacity:var(--_gc-reflection)]";

export const zuiGlassCardGlare =
  "pointer-events-none absolute inset-0 rounded-[inherit] [background:radial-gradient(circle_at_var(--_gc-px,50%)_var(--_gc-py,50%),var(--_gc-glare-color),transparent_55%)] [opacity:var(--_gc-glare,0)] motion-reduce:!opacity-0";

export const zuiGlassCardGlow =
  "pointer-events-none absolute -inset-3 -z-10 rounded-[inherit] blur-xl [background:radial-gradient(ellipse_at_center,var(--_gc-glow-color),transparent_70%)] [opacity:var(--_gc-glow,0.2)]";

export const zuiGlassCardContentBase =
  "relative rounded-[inherit] [transform:translateZ(var(--_gc-depth,20px))] motion-reduce:!transform-none";

export const zuiGlassCardSizes = {
  sm: "[--_gc-padding:1rem]",
  md: "[--_gc-padding:1.5rem]",
  lg: "[--_gc-padding:2rem]",
} as const;
export const zuiGlassCardContentPadding = "p-[var(--_gc-padding,1.5rem)]";
