import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { FieldPlayground } from "./components/field-playground";
import { FieldBasicDemo } from "./components/field-code-examples-demo";
import { FieldCodeExamplesSection } from "./sections/field-code-examples-section";
import { FieldInstallationSection } from "./sections/field-installation-section";
export default function FieldPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />
        <FieldBasicDemo />
      </Section>
      <Section className="text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">Form / Field playground</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Explore labels, instructions, required markers, disabled controls,
          errors, and responsive orientations.
        </p>
        <FieldPlayground />
      </Section>
      <FieldCodeExamplesSection />
      <Section className="space-y-4 text-slate-900 dark:text-slate-50">
        <h2 className="text-2xl font-semibold">
          Composition and accessibility
        </h2>
        <p>
          Field owns a single control’s label, description, and error through
          its label, description, and error props. Connections exist in server
          markup and update with the content. Its generated control ID is
          independent of the wrapper id; use controlId when you need an explicit
          ID. Each ID must be unique in the document.
        </p>
        <p>
          FieldControl accepts exactly one element that forwards attributes to
          its focusable control. It assigns the Field ID, combines description
          IDs, and retains the child’s ref, event handlers, value, and native
          attributes. A field label names the control; an explicit aria-label or
          aria-labelledby on the child takes precedence. Native
          disabled/required on the child are retained. For custom composition
          use the render function or useFieldControl; merge any existing
          aria-describedby when spreading attributes yourself.
        </p>
        <p>
          Use FieldControl with Input without Input’s own label or errorMessage
          to avoid duplicated labels and messages. Native inputs, textareas,
          selects, and Checkbox work with the default native mode. For Select,
          share the Field ID with Select’s triggerId, wrap SelectTrigger with
          FieldControl native=false, and provide role=combobox. Other custom
          widgets must implement their own disabled and required behavior;
          aria-required does not validate or block submission. A hidden input
          can carry a custom selection into FormData.
        </p>
        <p>
          Form preserves native form props and browser validation. Field error
          implies invalid, with an explicit invalid override available. Field
          never runs validation, submits data, or focuses controls
          automatically. The validation recipe uses noValidate intentionally,
          reads native validity, and focuses the failed control. Keep visible
          error messages clear and connect them to their controls. Render errors
          after validation; FieldError announces newly inserted content through
          role=alert.
        </p>
        <p>
          FieldGroup renders a native fieldset with an optional legend and
          connected description. Its disabled prop uses browser semantics,
          including the first-legend exception. FieldLegend, FieldLabel,
          FieldDescription, and FieldError can be used independently with
          caller-owned IDs. When composing these primitives manually, explicitly
          wire htmlFor and aria-describedby; only Field’s description/error
          props are connected automatically.
        </p>
        <p>
          Vertical is the default. Responsive places the label beside the
          control from 640px and stacks below it; horizontal keeps columns at
          all widths. Grid can arrange multiple Field components and stacks them
          on mobile by default. Form and Field add no validation or animation
          dependencies.
        </p>
        <p className="text-sm">
          <a
            href="https://www.w3.org/WAI/tutorials/forms/"
            className="underline underline-offset-4"
          >
            WAI guidance on labels, grouping, and error notifications
          </a>
        </p>
      </Section>
      <PreviewApiSection slug="field" />
      <FieldInstallationSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
