# Electric Border investigation and implementation

Reference: [React Bits Electric Border](https://reactbits.dev/animations/electric-border), inspected on 20 October 2026.

## Evidence and limits

- **Observed through REA:** the live DOM has an isolated, relatively positioned wrapper, normal content, and an `aria-hidden` canvas. The canvas is absolutely positioned with pointer events disabled and extends 64px beyond the content. At a desktop viewport, the example content measured 520 × 152 CSS pixels with a 24px radius. These are reference demo measurements, not Zentauri defaults for dimensions.
- REA initial capture: `ev_7cad67640927f2ee06689207b96ccecd415748667337c063e988af0c19c8caa7`. A controlled switch scenario, `ev_91ace12fcbde2947593cdeb0c7da68e03e93477638dcfc9a102ff64cb2c8b5a9`, exercised the Active control. Clicking it scrolled the frame outside the capture viewport, so those screenshots alone do not establish the visible activation transition.
- **Observed in supplemental browser probes:** irregular continuous strands, glow, local pointer response, larger arcs following clicks, a dimmed inactive state, and restored current after reactivation. At 390px viewport width, the reference frame measured 300px wide and the document had no horizontal overflow. These probes used Playwright; they were not REA passive observations.
- **Observed in accessible shipped JS/CSS:** the inspected demo uses a WebGL shader, animation frames, pointer listeners, resize/intersection observers, visibility handling, and a reduced-motion query. The deployed assets inspected were `ElectricBorderDemo-CTA3-38u.js`, `ElectricBorderDemo-BAhdSM2D.css`, and `electricBorderCode-Bxrsbbml.js`. Their names identify that deployment and may change. No repository-source execution was established.
- **Observed reduced-motion sample:** after loading with reduced motion enabled, two canvas snapshots 400ms apart had identical pixels. This is a bounded sample, not proof of every reduced-motion interaction.
- **Inferred:** coherent displacement and local impulse fields explain the apparent current and traveling surges. No reference spring constants or easing curves were inferred as exact values.
- **Unknown:** physical touch-device behavior, precise perceptual timing, cross-browser equivalence, and sustained performance on low-end hardware.

## Original implementation

`ZuiElectricBorder` uses independently written SVG perimeter sampling and continuous periodic displacement. It does not incorporate the reference shader, source code, or assets. The [current reference license](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) includes a component-redistribution restriction; this implementation preserves observable interaction principles through a different renderer and API.

The motion states are static, intro, running, surge, pulse, and suspended. Pointer exit settles the local field. A new click replaces the previous pulse. Hiding the tab or leaving the viewport clears transient input and suspends frames; resumption preserves animation phase. Turning active off and on restarts the intro. Configuration changes do not remount the renderer.

At speed 1, Zentauri uses approximately 600ms for introduction and 400ms for a pulse. These are chosen tuning values, not measured reference constants. The runtime caps each perimeter at 320 points, uses three strands and at most two short-lived arcs, and limits geometry writes to 30 updates per second. No React updates occur during pointer tracking or animation.

System reduced motion takes precedence over props. Inactive, zero-speed, explicitly reduced, and unavailable-media-query states retain a CSS rim and accessible content. The SSR output is deterministic; decoration has no focus stop or pointer hit area. Child buttons and links keep their semantics and native keyboard behavior. Coarse/touch pointers do not track cursor position.

## Deliberate differences and limitations

- SVG instead of WebGL; the exact strand shape, sparks, glow, and timing differ.
- A small API and paired Zentauri light/dark tokens replace the reference's numerous renderer controls.
- Pointer tracking is local to the frame rather than using global cursor listeners. Native child keyboard activation can trigger a pulse.
- Static fallback is a CSS rim, rather than a frozen shader image. Gradient endpoints affect animated paint; the static rim uses the starting color.
- A uniform numeric radius is supported. Asymmetric and percentage CSS radii are outside the API.
- Glows and maximum-strength arcs need roughly 50px of surrounding space; clipping ancestors can cut them off.
- Without ResizeObserver, remeasurement happens on mount, configuration, window resize, and descendant load events. Arbitrary size changes on unsupported browsers may wait until one of these events.
- Best suited to a few highlights, not hundreds of simultaneously animated list items.

The docs route includes default, gradient, calmer, noninteractive, and static examples plus a keyboard-accessible gallery of every appearance. The CLI registry, props metadata, test health, and package-surface counts are generated with the repository scripts. A minor Changeset records the public addition.

## Public API and usage

Import `ZuiElectricBorder`, `ElectricBorderProps`, `ElectricBorderAppearance`, and `electricBorderVariants` from `@zentauri-ui/zentauri-components/ui/electric-border`.

| Prop            | Default     | Contract                                                                                                                                                                                                       |
| --------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`    | `"default"` | 20 finite palettes; default, subtle, contrast, primary, secondary, success, destructive, warning, info, blue, cyan, emerald, violet, rose, amber, slate, gradient-blue, gradient-emerald, gradient-rose, glass |
| `active`        | `true`      | False leaves a static rim                                                                                                                                                                                      |
| `interactive`   | `true`      | Fine-pointer tracking and activation pulses                                                                                                                                                                    |
| `speed`         | `1`         | 0–3; zero is static                                                                                                                                                                                            |
| `intensity`     | `1`         | 0–2; zero keeps a smooth outline without sparks                                                                                                                                                                |
| `thickness`     | `1.5`       | 0.5–4 CSS pixels                                                                                                                                                                                               |
| `radius`        | `24`        | 0–9999 CSS pixels, fitted to the box                                                                                                                                                                           |
| `glow`          | `true`      | Ambient rim and current glow                                                                                                                                                                                   |
| `sparks`        | `true`      | Up to two short-lived arcs                                                                                                                                                                                     |
| `intro`         | `true`      | Sweep when becoming active                                                                                                                                                                                     |
| `reducedMotion` | `false`     | Force a static rim; system preferences always win                                                                                                                                                              |

Native div attributes, events, `children`, `className`, `style`, and a forwarded div ref are supported. `preventDefault()` on user pointer/click callbacks suppresses the corresponding internal action. Children inherit their own colors; appearance changes decorative paint only.

```tsx
import { ZuiElectricBorder } from "@zentauri-ui/zentauri-components/ui/electric-border";

<ZuiElectricBorder appearance="gradient-blue" className="max-w-md">
  <div className="rounded-[inherit] bg-white p-6 text-slate-900 dark:bg-slate-950 dark:text-white">
    <h3>Ready to launch</h3>
    <button
      type="button"
      className="mt-4 rounded px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      Launch
    </button>
  </div>
</ZuiElectricBorder>;
```

No dependencies were added. React, CVA, clsx, and tailwind-merge follow the package's existing peer contract. Framer Motion is not required. Consumers must include the package in Tailwind v4 source scanning; all styles are utility strings and SVG attributes rather than an extra CSS asset.

## Changed files

- `.changeset/sweet-showers-lose.md`
- `apps/component-library/README.md`
- `apps/component-library/app/preview/components/electric-border/page.tsx`
- `apps/component-library/components/css-variables/data/electric-border.ts`
- `apps/component-library/components/css-variables/reference-data.ts`
- `apps/component-library/components/home/marketing/package-health-data.ts`
- `apps/component-library/components/introduction/data.ts`
- `apps/component-library/components/preview/electric-border/components/electric-border-code-examples.data.ts`
- `apps/component-library/components/preview/electric-border/components/electric-border-code-examples.snippets.ts`
- `apps/component-library/components/preview/electric-border/components/electric-border-demo.tsx`
- `apps/component-library/components/preview/electric-border/electric-border-docs.test.tsx`
- `apps/component-library/components/preview/electric-border/index.tsx`
- `apps/component-library/components/preview/electric-border/sections/hero.tsx`
- `apps/component-library/components/preview/electric-border/sections/playground.tsx`
- `apps/component-library/components/preview/electric-border/sections/snippet-sections.tsx`
- `apps/component-library/components/sidebar/sidebar-data.ts`
- `apps/component-library/content/seo/preview/components/electric-border.json`
- `apps/component-library/lib/home-install-commands.ts`
- `apps/component-library/lib/preview-seo-registry.ts`
- `docs/electric-border-investigation.md`
- `packages/components/README.md`
- `packages/components/cli/props.json`
- `packages/components/cli/registry.json`
- `packages/components/src/design-system/electric-border.ts`
- `packages/components/src/design-system/index.ts`
- `packages/components/src/lib/facade.test.ts`
- `packages/components/src/lib/facade.ts`
- `packages/components/src/ui/electric-border/electric-border-base.tsx`
- `packages/components/src/ui/electric-border/electric-border.ssr.test.tsx`
- `packages/components/src/ui/electric-border/electric-border.test.tsx`
- `packages/components/src/ui/electric-border/electric-border.tsx`
- `packages/components/src/ui/electric-border/geometry.test.ts`
- `packages/components/src/ui/electric-border/geometry.ts`
- `packages/components/src/ui/electric-border/index.ts`
- `packages/components/src/ui/electric-border/runtime.ts`
- `packages/components/src/ui/electric-border/types.ts`
- `packages/components/src/ui/electric-border/variants.ts`
- `packages/components/tsup.config.ts`

The registry, props manifest, README package-surface/test tables, and package-health data were produced by their generation scripts. Regenerating props also refreshed existing Typography metadata; no Typography implementation was changed and that generated record was not edited by hand. The package version and changelog were not manually changed.

## Follow-up validation

Physical low-end devices and Safari/Firefox remain useful follow-up targets. The SVG renderer deliberately differs from the reference's WebGL output; no exact visual or source equivalence is claimed.

## Completed validation

| Check                                                | Result                                                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Full component-package suite / generated test health | **Passed: 2,135 tests, 172 files**                                                 |
| Electric Border geometry, component, and SSR suites  | **Passed: 49 tests** (included above)                                              |
| Focused component + facade run                       | **Passed: 74 tests, 4 files**                                                      |
| Focused docs, CSS-variable, and sidebar tests        | **Passed: 10 tests, 3 files**                                                      |
| Component-package TypeScript check                   | **Passed**                                                                         |
| Docs TypeScript check                                | **Passed**, also completed during production build                                 |
| ESLint on affected package/docs sources              | **Passed with zero warnings**                                                      |
| Token, generated-props, and package-surface checks   | **Passed**                                                                         |
| Built exports                                        | **Passed: 250 entries × 3 conditions**                                             |
| Library ESM/CJS and declaration build                | **Passed**                                                                         |
| Docs production build                                | **Passed: 222 prerendered pages**, including `/preview/components/electric-border` |
| New-source formatting / `git diff --check`           | **Passed**                                                                         |

Browser checks compared the reference and Zentauri at desktop dimensions, inspected idle/hover/click states, and exercised all **20 appearances × 2 themes** without invalid paint or geometry. Narrow emulated touch/coarse-pointer viewports at **390px and 320px** had matching document/viewport widths and usable controls. Touch movement did not trigger a cursor surge; tapping a child button triggered a pulse. Keyboard Enter activated native content with a visible 2px focus outline. The appearance gallery also worked with Space in the production preview.

System reduced-motion changes produced a static rim, a hidden decorative SVG, and zero path mutations in the sampled interval. The frame-level guard also handles delayed media-event delivery. Unit tests cover resize, offscreen and hidden-tab suspension, repeated pulses, cancellation, missing browser APIs, StrictMode cleanup, hydration IDs, extreme numeric inputs, and the 30Hz update ceiling.

The final production smoke check verified the rendered route, a click pulse, preserved native action status, reduced motion, gallery keyboard selection, and no horizontal overflow. There were no component runtime exceptions. The existing Vercel Analytics script returned a local-only 404 at `/_vercel/insights/script.js`; analytics was not changed. Existing workspace-root/multiple-lockfile and nested-pnpm-configuration warnings remain outside this component's scope.

Validation used Node 22.14.0 and pnpm 9. No dependency installation, publishing, or deployment was performed. The working branch is `codex/electric-border`; changes remain available for review in the working tree.
