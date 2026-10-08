import Link from "next/link";
import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";
export function ToolbarInstallationSection() {
  return (
    <Section className="space-y-4 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">
        Installation and theme overrides
      </h2>
      <CodeHighlight
        language="bash"
        codeString={
          "pnpm add @zentauri-ui/zentauri-components\n# Or vendor the Toolbar and the Button used in the composition recipe:\npnpm dlx @zentauri-ui/zentauri-components add toolbar buttons"
        }
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Include the package in Tailwind v4 scan scope. Adjust the source path
        for your stylesheet; vendored files also need scanning.
      </p>
      <CodeHighlight
        language="css"
        codeString={
          '@import "tailwindcss";\n@source "../node_modules/@zentauri-ui/zentauri-components";\n\n.editor-toolbar {\n  --zui-toolbar-radius: 1rem;\n  --zui-toolbar-radius-dark: 1rem;\n  --zui-toolbar-gap: 0.5rem;\n  --zui-toolbar-gap-dark: 0.5rem;\n  --zui-toolbar-focus-ring: #7c3aed;\n  --zui-toolbar-focus-ring-dark: #c4b5fd;\n}'
        }
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Apply className="editor-toolbar" to Toolbar. Its appearance provides the
        surface and inherited foreground; each item uses Toolbar spacing, hover,
        pressed, and focus tokens. A composed Button can keep its own appearance
        via class merging.
      </p>
      <Link
        href="#zui-css-variables-toolbar"
        className="text-sm underline underline-offset-4"
      >
        Browse all Toolbar light and dark tokens
      </Link>
    </Section>
  );
}
