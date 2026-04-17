import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  DropdownContentDividerDemo,
  DropdownPlacementDemo,
  DropdownSpacingDemo,
  DropdownTriggerDemo,
} from "./components/dropdown-code-examples-demos";
import {
  DROPDOWN_CODE_EXAMPLES_SECTION_CLASS,
  DROPDOWN_CONTENT_PLACEMENTS,
  DROPDOWN_CONTENT_SPACINGS,
  DROPDOWN_TRIGGER_SIZES,
  DROPDOWN_TRIGGER_VARIANTS,
} from "./components/dropdown-code-examples.data";
import {
  dropdownContentDividerSnippet,
  dropdownPlacementSnippet,
  dropdownSpacingSnippet,
  dropdownTriggerSnippet,
} from "./components/dropdown-code-examples.snippets";

export function DropdownCodeExamplesSection() {
  return (
    <section className={DROPDOWN_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Variant code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each block matches one combination. Open “Show code” to copy the JSX;
        the leading comment names the variant row.
      </p>

      <h3 className="mt-10 text-lg font-semibold text-white">
        DropdownTrigger — variant × size
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Three trigger variants with small, medium, and large sizes.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DROPDOWN_TRIGGER_VARIANTS.flatMap((variant) => (
          <PreviewCodeShowcase
            key={`trigger-${variant}`}
            code={dropdownTriggerSnippet(variant, "md")}
          >
            <DropdownTriggerDemo variant={variant} size="md" />
          </PreviewCodeShowcase>
        ))}
        {DROPDOWN_TRIGGER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`trigger-${size}`}
            code={dropdownTriggerSnippet("default", size)}
          >
            <DropdownTriggerDemo variant="default" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-white">
        DropdownContent — placement
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Surfaces position relative to the trigger on top, bottom, left, or
        right.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DROPDOWN_CONTENT_PLACEMENTS.map((placement) => (
          <PreviewCodeShowcase
            key={`placement-${placement}`}
            code={dropdownPlacementSnippet(placement)}
          >
            <DropdownPlacementDemo placement={placement} />
          </PreviewCodeShowcase>
        ))}
      </div>
      <h3 className="mt-14 text-lg font-semibold text-white">
        DropdownContent — spacing
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        The spacing between the items in the dropdown content.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {DROPDOWN_CONTENT_SPACINGS.map((spacing) => (
          <PreviewCodeShowcase
            key={`spacing-${spacing}`}
            code={dropdownSpacingSnippet(spacing)}
          >
            <DropdownSpacingDemo spacing={spacing} />
          </PreviewCodeShowcase>
        ))}
      </div>
      <PreviewCodeShowcase key="divider" code={dropdownContentDividerSnippet()}>
        <DropdownContentDividerDemo />
      </PreviewCodeShowcase>
    </section>
  );
}
