import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";
export function ImpactInstallationSection() {
  return (
    <Section className="space-y-4 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">Installation and theming</h2>
      <CodeHighlight
        codeString={
          "pnpm add @zentauri-ui/zentauri-components\n# Or vendor the source:\npnpm dlx @zentauri-ui/zentauri-components add change-impact-explorer"
        }
        language="bash"
      />
      <p>
        The static entry has no animation peer. The source CLI includes the
        virtual-list hook and shared utilities.
      </p>
      <CodeHighlight
        codeString={
          '@import "tailwindcss";\n@source "../node_modules/@zentauri-ui/zentauri-components";\n\n.impact-review {\n  --zui-change-impact-explorer-radius: 1.25rem;\n  --zui-change-impact-explorer-radius-dark: 1.25rem;\n  --zui-change-impact-explorer-focus-ring: #7c3aed;\n  --zui-change-impact-explorer-focus-ring-dark: #c4b5fd;\n}'
        }
        language="css"
      />
      <p>
        Apply className=&quot;impact-review&quot; to the root. Adjust the
        Tailwind source path for your stylesheet.
      </p>
      <a
        href="#zui-css-variables-change-impact-explorer"
        className="text-sm underline"
      >
        Browse every light and dark token
      </a>
    </Section>
  );
}
