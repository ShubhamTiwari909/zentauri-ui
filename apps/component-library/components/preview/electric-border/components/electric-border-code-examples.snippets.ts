import type { ElectricBorderProps } from "@zentauri-ui/zentauri-components/ui/electric-border";

const snippetKeys = [
  "appearance",
  "active",
  "interactive",
  "speed",
  "intensity",
  "thickness",
  "radius",
  "glow",
  "sparks",
  "intro",
  "reducedMotion",
  "className",
  "style",
] as const satisfies readonly (keyof ElectricBorderProps)[];

export function electricBorderSnippet(
  props: Pick<ElectricBorderProps, (typeof snippetKeys)[number]> = {},
) {
  const attributes = snippetKeys
    .flatMap((key) =>
      props[key] === undefined
        ? []
        : [`  ${key}={${JSON.stringify(props[key])}}`],
    )
    .join("\n");
  return `import { ZuiElectricBorder } from "@zentauri-ui/zentauri-components/ui/electric-border";

<ZuiElectricBorder${attributes ? `\n${attributes}\n` : ""}>
  <div className="rounded-[inherit] bg-white p-6 text-slate-900 dark:bg-slate-950 dark:text-white">
    <h3>A little current.</h3>
    <p>Your content keeps its own semantics and style.</p>
    <button type="button" className="mt-4 rounded px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-4">
      Send a signal
    </button>
  </div>
</ZuiElectricBorder>`;
}
