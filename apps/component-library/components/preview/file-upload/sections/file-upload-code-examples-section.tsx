import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { FileUploadDemo } from "./components/file-upload-code-examples-demo";
import {
  FILE_UPLOAD_CODE_EXAMPLES_SECTION_CLASS,
  FILE_UPLOAD_APPEARANCES,
} from "./components/file-upload-code-examples.data";
import { fileUploadSnippet } from "./components/file-upload-code-examples.snippets";

const scenarioLabel: Record<(typeof FILE_UPLOAD_APPEARANCES)[number], string> = {
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
};

export function FileUploadCodeExamplesSection() {
  return (
    <section className={FILE_UPLOAD_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        File upload code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the appearance.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {FILE_UPLOAD_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={appearance}
            code={fileUploadSnippet(appearance)}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Scenario:{" "}
              <span className="font-bold">
                {scenarioLabel[appearance].toUpperCase()}
              </span>
            </p>
            <FileUploadDemo appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
