import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { FileUploadDemo } from "./components/demo";
import { FILE_UPLOAD_APPEARANCES } from "./components/data";
import { fileUploadSnippet } from "./components/snippets";

const scenarioLabel: Record<(typeof FILE_UPLOAD_APPEARANCES)[number], string> =
  {
    idle: "Default copy · image accept",
    active: "Active state",
    disabled: "Disabled",
    error: "Error state",
    success: "Success state",
    warning: "Warning state",
    info: "Info state",
    neutral: "Neutral state",
    purple: "Purple state",
    indigo: "Indigo state",
    emerald: "Emerald state",
    amber: "Amber state",
    pink: "Pink state",
    orange: "Orange state",
    teal: "Teal state",
    blue: "Blue state",
    cyan: "Cyan state",
    green: "Green state",
    lime: "Lime state",
    mint: "Mint state",
    ocean: "Ocean state",
    sapphire: "Sapphire state",
    lavender: "Lavender state",
    ruby: "Ruby state",
    red: "Red state",
    slate: "Slate state",
    zinc: "Zinc state",
    stone: "Stone state",
    royal: "Royal state",
    electric: "Electric state",
    forest: "Forest state",
    sunset: "Sunset state",
    magenta: "Magenta state",
    crimson: "Crimson state",
    aqua: "Aqua state",
    plum: "Plum state",
  };

export function FileUploadCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        File upload code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the appearance.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {FILE_UPLOAD_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={appearance}
            code={fileUploadSnippet(appearance)}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Scenario:{" "}
              <span className="font-bold">
                {scenarioLabel[appearance].toUpperCase()}
              </span>
            </p>
            <FileUploadDemo appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
