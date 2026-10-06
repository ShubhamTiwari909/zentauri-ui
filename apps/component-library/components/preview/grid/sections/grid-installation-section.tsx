import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";

export function GridInstallationSection() {
  return (
    <Section id="grid-installation" className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Installation and theme overrides
      </h2>
      <CodeHighlight
        codeString={
          "pnpm add @zentauri-ui/zentauri-components\n# Or vendor the source:\npnpm dlx @zentauri-ui/zentauri-components add grid"
        }
        language="bash"
      />
      <p className="text-sm text-slate-400">
        The package ships utility strings. Add the package to Tailwind v4
        scanning; the example path assumes an app/globals.css stylesheet at the
        project root. Adjust it for your stylesheet location. Vendored
        components must also be inside Tailwind&apos;s source scope.
      </p>
      <CodeHighlight
        codeString={
          '@import "tailwindcss";\n@source "../node_modules/@zentauri-ui/zentauri-components";\n\n.my-grid-theme {\n  --zui-grid-gap-md: 1.25rem;\n  --zui-grid-gap-md-dark: 1.25rem;\n  --zui-grid-blue-bg: #eff6ff;\n  --zui-grid-blue-bg-dark: #172554;\n}'
        }
        language="css"
      />
      <p className="text-sm text-slate-400">
        Wrap Grid in the theme selector to inherit overrides. Consumer style is
        merged last: use style for advanced CSS templates or placement, with
        responsibility for valid CSS and mobile overflow.
      </p>
    </Section>
  );
}
