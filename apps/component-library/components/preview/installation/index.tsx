import CodeHighlight from "@/components/CodeHighlight";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import TabsListComponent from "@/components/preview/installation/tabs-list";

import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
import { Tabs } from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const INSTALL_COMMANDS = {
  npm: "npm install @zentauri-ui/zentauri-components",
  pnpm: "pnpm install @zentauri-ui/zentauri-components",
  yarn: "yarn add @zentauri-ui/zentauri-components",
} as const;

const PEER_INSTALL_COMMANDS = {
  npm: "npm install react react-dom class-variance-authority clsx tailwind-merge",
  pnpm: "pnpm add react react-dom class-variance-authority clsx tailwind-merge",
  yarn: "yarn add react react-dom class-variance-authority clsx tailwind-merge",
} as const;

const FRAMER_MOTION_INSTALL_COMMANDS = {
  npm: "npm install framer-motion",
  pnpm: "pnpm add framer-motion",
  yarn: "yarn add framer-motion",
} as const;

const REACT_ICONS_INSTALL_COMMANDS = {
  npm: "npm install react-icons",
  pnpm: "pnpm add react-icons",
  yarn: "yarn add react-icons",
} as const;

const GLOBALS_CSS_SNIPPET = `@import "tailwindcss";
@source "../node_modules/@zentauri-ui/zentauri-components";`;

const STATIC_IMPORT_SNIPPET = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";`;

const ANIMATED_IMPORT_SNIPPET = `import {
  Accordion,
  AccordionContentAnimated,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion/animated";`;

const USAGE_SNIPPET = `<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
  <Accordion type="single" defaultValue="item-1" appearance="separated" size="md">
    <AccordionItem value="item-1">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-300">
          Standard delivery in 3-5 business days. Express options at
          checkout.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Returns</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-300">
          Free returns within 30 days of delivery in original condition.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>`;

const OVERRIDE_THEME_COLORS_SNIPPET = `@theme {
  --color-slate-50: oklch(0.984 0.003 247.858);
  --color-slate-100: oklch(0.968 0.007 247.896);
  --color-slate-200: oklch(0.929 0.013 255.508);
  --color-slate-300: oklch(0.869 0.022 252.894);
  --color-slate-400: oklch(0.704 0.04 256.788);
  --color-slate-500: oklch(0.554 0.046 257.417);
  --color-slate-600: oklch(0.446 0.043 257.281);
  --color-slate-700: oklch(0.372 0.044 257.287);
  --color-slate-800: oklch(0.279 0.041 260.031);
  --color-slate-900: oklch(0.208 0.042 265.755);
  --color-slate-950: oklch(0.129 0.042 264.695);
}`;

const CLI_INIT_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components zentauri-components init",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components zentauri-components init",
  yarn: "yarn dlx @zentauri-ui/zentauri-components zentauri-components init",
} as const;

const CLI_ADD_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components zentauri-components add accordion buttons",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components zentauri-components add accordion buttons",
  yarn: "yarn dlx @zentauri-ui/zentauri-components zentauri-components add accordion buttons",
} as const;

const CLI_ADD_HOOK_COMMANDS = {
  npm: "npx @zentauri-ui/zentauri-components zentauri-components add hook useWindowSize",
  pnpm: "pnpm dlx @zentauri-ui/zentauri-components zentauri-components add hook useWindowSize",
  yarn: "yarn dlx @zentauri-ui/zentauri-components zentauri-components add hook useWindowSize",
} as const;

const CLI_NPX_PIN_SNIPPET = `npx --yes --package=@zentauri-ui/zentauri-components zentauri-components init
npx --yes --package=@zentauri-ui/zentauri-components zentauri-components add button`;

const COMPONENTS_JSON_SNIPPET = `{
  "aliases": {
    "ui": "@/components/ui",
    "utils": "@/lib/utils",
    "hooks": "@/hooks"
  },
  "resolvedPaths": {
    "ui": "src/components/ui",
    "utils": "src/lib/utils.ts",
    "hooks": "src/hooks"
  }
}`;

const VENDORED_GLOBALS_CSS_SNIPPET = `@import "tailwindcss";
/* After add, scan copied sources (paths relative to this CSS file) */
@source "../src/components/ui";
@source "../src/hooks";`;

const ADD_NEW_THEMES_COLORS_SNIPPET = `export const customAppearancefuchsia = {
  50: "bg-fuchsia-50 text-fuchsia-950",
  100: "bg-fuchsia-100 text-fuchsia-950",
  200: "bg-fuchsia-200 text-fuchsia-950",
  300: "bg-fuchsia-300 text-fuchsia-950",
  400: "bg-fuchsia-400 text-fuchsia-950",
  500: "bg-fuchsia-500 text-fuchsia-950",
  600: "bg-fuchsia-600 text-fuchsia-950",
  700: "bg-fuchsia-700 text-fuchsia-950",
  800: "bg-fuchsia-800 text-fuchsia-950",
  900: "bg-fuchsia-900 text-fuchsia-950",
  950: "bg-fuchsia-950 text-fuchsia-950",
} as const;

export function ButtonOverrideThemeColors({ label }: ButtonProps) {
  return (
    <Button className={cn("w-40", customAppearancefuchsia[500])}>
      {label}
    </Button>
  );
}`

export default function InstallationPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <section className="space-y-6">
        <PreviewHeroSeoBlock seo={seo} />
      </section>

      <div className="space-y-10">
        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Step 1
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Install the package
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Choose your package manager.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>
        </section>

        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Step 2
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Install peer dependencies
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            The library expects{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              react
            </code>
            ,{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              react-dom
            </code>
            ,{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              class-variance-authority
            </code>
            ,{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              clsx
            </code>
            , and{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              tailwind-merge
            </code>{" "}
            in your app. Install them alongside the components package.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={PEER_INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={PEER_INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={PEER_INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>
          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Animated components: install framer-motion
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Anything imported from an{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              /animated
            </code>{" "}
            subpath (for example{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ui/alert/animated
            </code>
            ,{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ui/accordion/animated
            </code>
            , or{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ui/tabs/animated
            </code>
            ) depends on{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              framer-motion
            </code>
            . Install it in apps that use those entry points. If you only use
            static imports from the main UI path (no{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              /animated
            </code>
            ),{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              framer-motion
            </code>{" "}
            is optional.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={FRAMER_MOTION_INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={FRAMER_MOTION_INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={FRAMER_MOTION_INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>
          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Optional: react-icons
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Install{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              react-icons
            </code>{" "}
            when you use icon sets from that package.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={REACT_ICONS_INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={REACT_ICONS_INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={REACT_ICONS_INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>
        </section>

        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Step 3
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Include library paths in globals.css
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Add an{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-cyan-200">
              @source
            </code>{" "}
            entry so Tailwind scans class names inside{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              @zentauri-ui/zentauri-components
            </code>
            . The path is relative to this CSS file—adjust{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ../
            </code>{" "}
            if your file lives elsewhere.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={GLOBALS_CSS_SNIPPET} language="css" />
          </div>
        </section>

        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Step 4
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Import and use components
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Static building blocks live under the component path (for example{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ui/alert
            </code>
            ,{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ui/accordion
            </code>
            ). Motion-enabled variants live under a matching{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              /animated
            </code>{" "}
            entry (for example{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              ui/alert/animated
            </code>
            ) and require{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              framer-motion
            </code>{" "}
            as described in Step 2.
          </p>
          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Static imports
          </h3>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={STATIC_IMPORT_SNIPPET} language="tsx" />
          </div>
          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Animated imports
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Use a separate import from the{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              /animated
            </code>{" "}
            module when you need animated primitives (pattern matches other
            components such as alert).
          </p>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight
              codeString={ANIMATED_IMPORT_SNIPPET}
              language="tsx"
            />
          </div>
          <h3 className="mt-6 text-sm font-medium text-slate-200">Usage</h3>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={USAGE_SNIPPET} language="tsx" />
          </div>
          <h3 className="mt-6 text-sm font-medium text-slate-200">Preview</h3>
          <div className="mt-3 rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <Accordion
              type="single"
              defaultValue="item-1"
              appearance="emerald"
              size="md"
              className="space-y-5 p-2 md:p-5"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-300">
                    Standard delivery in 3-5 business days. Express options at
                    checkout.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-300">
                    Free returns within 30 days of delivery in original
                    condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Alternative
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            CLI — copy source into your app
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Instead of importing only from{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              node_modules
            </code>
            , you can vendor UI (and related hooks) with the same binary as the
            published package:{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              zentauri-components
            </code>{" "}
            or{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              zentauri-ui
            </code>
            . After the package name, pass that binary name (for example{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              zentauri-components init
            </code>
            ) so{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              npx
            </code>{" "}
            runs the CLI instead of a missing shell command. UI tokens for{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              add
            </code>{" "}
            come from{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              cli/registry.json
            </code>{" "}
            (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              components
            </code>
            , plus{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              nameAliases
            </code>{" "}
            such as{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              button
            </code>{" "}
            →{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              buttons
            </code>
            ). For hook source only, use{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              add hook …
            </code>{" "}
            with names from the{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              hooks
            </code>{" "}
            array (generated from{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              tsup.config.ts
            </code>
            ). Run{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              init
            </code>{" "}
            once, then{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              add
            </code>{" "}
            for each UI area; the CLI copies that folder from the package
            tree{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              src/ui
            </code>{" "}
            under the path from{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              resolvedPaths.ui
            </code>{" "}
            (one subfolder per component), rewrites imports to your aliases,
            pulls hook dependencies, and
            creates{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              lib/utils
            </code>{" "}
            if missing.
          </p>

          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Initialize components.json
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Creates{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              components.json
            </code>{" "}
            with default path aliases. The CLI walks up from the working
            directory to find this file for{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              add
            </code>
            .
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_INIT_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_INIT_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_INIT_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>

          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Add components (registry-driven)
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Pass one or more names from the registry (folder names under{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              src/ui
            </code>
            , or a configured alias). Test files from the package are not
            copied.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_ADD_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_ADD_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_ADD_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>

          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Add hooks only (optional)
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            To vendor hook source without adding a UI folder, use{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              add hook
            </code>{" "}
            plus hook names from the registry (for example{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              useWindowSize
            </code>
            ). The CLI also copies transitive sibling-hook dependencies (for
            example{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              useMediaQuery
            </code>{" "}
            when you add{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              usePrefersReducedMotion
            </code>
            ). Hooks that import UI types still expect you to add the matching
            component or adjust imports.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_ADD_HOOK_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_ADD_HOOK_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={CLI_ADD_HOOK_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>

          <h3 className="mt-6 text-sm font-medium text-slate-200">
            If npx does not resolve the binary
          </h3>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={CLI_NPX_PIN_SNIPPET} language="bash" />
          </div>

          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Default components.json shape
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Edit{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              aliases
            </code>{" "}
            and{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              resolvedPaths
            </code>{" "}
            so they match your app&apos;s{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              tsconfig
            </code>{" "}
            paths and folder layout.
          </p>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight
              codeString={COMPONENTS_JSON_SNIPPET}
              language="json"
            />
          </div>

          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Tailwind after vendoring
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            When you rely on copied files instead of the package under{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              node_modules
            </code>
            , point{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-cyan-200">
              @source
            </code>{" "}
            at those paths (adjust relative segments to match where your{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              globals.css
            </code>{" "}
            lives). You can keep both package and local{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              @source
            </code>{" "}
            lines during a migration.
          </p>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight
              codeString={VENDORED_GLOBALS_CSS_SNIPPET}
              language="css"
            />
          </div>
        </section>

        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Overriding theme colors
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Override theme colors
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            You can override the theme colors by using the theme.colors object but be careful as it will override all the colors in your project if you are already using tailwind default colors like slate, red, yellow, amber, green, etc. Consider using a custom color palette for your brand theme.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={OVERRIDE_THEME_COLORS_SNIPPET} language="css" />
          </div>
        </section>
        <section className={SECTION}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Adding new themes
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Adding new themes colors
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            You can add new themes colors by adding a new theme mapper, passing the required variants like 100, 200, 500, 900 and removing the appearance prop from the component.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={ADD_NEW_THEMES_COLORS_SNIPPET} language="tsx" />
          </div>
        </section>
      </div>
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
