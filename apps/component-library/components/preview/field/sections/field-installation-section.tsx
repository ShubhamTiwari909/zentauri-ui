import Link from "next/link";
import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";
export function FieldInstallationSection() {
  return (
    <Section className="space-y-4 text-slate-900 dark:text-slate-50">
      <h2 className="text-2xl font-semibold">
        Installation and theme overrides
      </h2>
      <CodeHighlight
        language="bash"
        codeString={
          "pnpm add @zentauri-ui/zentauri-components\n# Or vendor source, including the Input used in these recipes:\npnpm dlx @zentauri-ui/zentauri-components add field inputs"
        }
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Add the package to Tailwind v4 scanning and adjust the source path for
        your stylesheet location. Vendored files also need to be in scan scope.
      </p>
      <CodeHighlight
        language="css"
        codeString={
          '@import "tailwindcss";\n@source "../node_modules/@zentauri-ui/zentauri-components";\n\n.profile-form {\n  --zui-field-form-gap: 2rem;\n  --zui-field-form-gap-dark: 2rem;\n  --zui-field-radius: 1rem;\n  --zui-field-radius-dark: 1rem;\n  --zui-field-label-width: 8rem;\n  --zui-field-label-width-dark: 8rem;\n}'
        }
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Apply <code>{'className="profile-form"'}</code> to Form or a surrounding
        container. Field controls use their own Input, Checkbox, or Select
        tokens. Field sizes change label typography and spacing independently of
        the control size.
      </p>
      <Link
        href="#zui-css-variables-field"
        className="text-sm underline underline-offset-4"
      >
        Browse all Field light and dark tokens
      </Link>
    </Section>
  );
}
