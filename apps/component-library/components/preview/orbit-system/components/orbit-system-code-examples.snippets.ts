import type {
  OrbitSystemAppearance,
  OrbitSystemSize,
} from "@zentauri-ui/zentauri-components/ui/orbit-system";

export function orbitSystemSnippet(options: {
  appearance: OrbitSystemAppearance;
  size: OrbitSystemSize;
  autoRotate: boolean;
  interactive: boolean;
}) {
  return `import { ZuiOrbitSystem, ZuiOrbit, ZuiOrbitItem } from "@zentauri-ui/zentauri-components/ui/orbit-system";

<ZuiOrbitSystem
  appearance="${options.appearance}"
  size="${options.size}"
  autoRotate={${options.autoRotate}}
  interactive={${options.interactive}}
  center="YOUR STACK"
  onSelectionChange={(id) => console.log(id)}
>
  <ZuiOrbit radius={95} duration={18} label="Core technologies">
    <ZuiOrbitItem id="react">⚛ React</ZuiOrbitItem>
    <ZuiOrbitItem id="typescript">TS TypeScript</ZuiOrbitItem>
    <ZuiOrbitItem id="next">▲ Next.js</ZuiOrbitItem>
  </ZuiOrbit>
  <ZuiOrbit radius={178} duration={32} direction="counterclockwise" label="Platform">
    <ZuiOrbitItem id="node">⬡ Node.js</ZuiOrbitItem>
    <ZuiOrbitItem id="postgres">◈ Postgres</ZuiOrbitItem>
    <ZuiOrbitItem id="cloud">☁ Cloud</ZuiOrbitItem>
    <ZuiOrbitItem id="design">✦ Design</ZuiOrbitItem>
  </ZuiOrbit>
</ZuiOrbitSystem>`;
}
