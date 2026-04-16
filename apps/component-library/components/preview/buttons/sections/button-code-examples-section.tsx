import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  ButtonAnimationDemo,
  ButtonAppearanceDemo,
  ButtonSizeDemo,
} from "./components/button-code-examples-demo";
import {
  BUTTON_CODE_EXAMPLES_SECTION_CLASS,
  buttonAnimationPresets,
  showcaseButtons,
  sizeButtons,
} from "./components/button-code-examples.data";
import {
  buttonAnimationSnippet,
  buttonAppearanceSnippet,
  buttonSizeSnippet,
} from "./components/button-code-examples.snippets";

export function ButtonCodeExamplesSection() {
  return (
    <section className={BUTTON_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Button variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant line
        naming the token row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {showcaseButtons.map((button) => (
          <PreviewCodeShowcase
            key={button.label}
            code={buttonAppearanceSnippet(button)}
          >
            <p className="mb-5 text-xs md:text-sm font-semibold text-white">
              Appearance:{" "}
              <span className="font-bold">{button.appearance.toUpperCase()}</span>
            </p>
            <ButtonAppearanceDemo {...button} />
          </PreviewCodeShowcase>
        ))}
        {buttonAnimationPresets.map((preset) => {
          const [label] = preset;
          return (
            <PreviewCodeShowcase key={label} code={buttonAnimationSnippet(preset)}>
              <p className="mb-5 text-xs md:text-sm font-semibold text-white">
                Animation:{" "}
                <span className="font-bold">{preset[1].toUpperCase()}</span>
              </p>
              <ButtonAnimationDemo preset={preset} />
            </PreviewCodeShowcase>
          );
        })}
        {sizeButtons.map((button) => (
          <PreviewCodeShowcase key={button.label} code={buttonSizeSnippet(button)}>
            <p className="mb-5 text-xs md:text-sm font-semibold text-white">
              Size: <span className="font-bold">{button.size.toUpperCase()}</span>
            </p>
            <ButtonSizeDemo {...button} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
