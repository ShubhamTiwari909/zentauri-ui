import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";
export function ResizablePanelsInstallationSection() {
  return (
    <Section className="space-y-4 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">
        Installation and theme overrides
      </h2>
      <CodeHighlight
        language="bash"
        codeString={
          "pnpm add @zentauri-ui/zentauri-components\n# Or vendor source:\npnpm dlx @zentauri-ui/zentauri-components add resizable-panels"
        }
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Add the package to Tailwind v4 source scanning. Adjust the relative path
        for your stylesheet location; vendored source must also be scanned.
      </p>
      <CodeHighlight
        language="css"
        codeString={
          '@import "tailwindcss";\n@source "../node_modules/@zentauri-ui/zentauri-components";\n\n.my-workspace {\n  --zui-resizable-panels-handle-size-md: 28px;\n  --zui-resizable-panels-handle-size-md-dark: 28px;\n  --zui-resizable-panels-focus-ring: #2563eb;\n  --zui-resizable-panels-focus-ring-dark: #60a5fa;\n}'
        }
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Persistence belongs in consumer state: update controlled sizes with
        onSizesChange and save them with onResizeEnd. Read saved values after
        hydration or provide server-known values to keep the initial markup
        deterministic.
      </p>
    </Section>
  );
}
