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
import { Tabs, TabsContent } from "@zentauri-ui/zentauri-components/ui/tabs";

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

const OPTIONAL_PEER_INSTALL_COMMANDS = {
  npm: "npm install framer-motion react-icons",
  pnpm: "pnpm add framer-motion react-icons",
  yarn: "yarn add framer-motion react-icons",
} as const;

const GLOBALS_CSS_SNIPPET = `@import "tailwindcss";
@source "../node_modules/@zentauri-ui/zentauri-components";`;

const IMPORT_SNIPPET = `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@zentauri-ui/zentauri-components/ui/accordion";`;

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
              <TabsContent value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContent>
              <TabsContent value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContent>
              <TabsContent value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContent>
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
              <TabsContent value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={PEER_INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContent>
              <TabsContent value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={PEER_INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContent>
              <TabsContent value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={PEER_INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContent>
            </Tabs>
          </div>
          <h3 className="mt-6 text-sm font-medium text-slate-200">
            Optional: animations and icons
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Add{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              framer-motion
            </code>{" "}
            when using motion-based UI, and{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white">
              react-icons
            </code>{" "}
            when using icon sets from that package.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <Tabs defaultValue="npm">
              <TabsListComponent />
              <TabsContent value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={OPTIONAL_PEER_INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContent>
              <TabsContent value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={OPTIONAL_PEER_INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContent>
              <TabsContent value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={OPTIONAL_PEER_INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContent>
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
            Import from the UI barrel, then compose primitives in your JSX.
          </p>
          <h3 className="mt-6 text-sm font-medium text-slate-200">Imports</h3>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
            <CodeHighlight codeString={IMPORT_SNIPPET} language="tsx" />
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
      </div>
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
