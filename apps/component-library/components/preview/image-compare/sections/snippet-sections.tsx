import { Section } from "@/components/common/Section";

import { ImageComparePlayground } from "./components/playground";

export function ImageCompareCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Image compare variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Adjust the divider, accent, size, and corner radius. Drag the handle or
        focus it and use Arrow, Page, Home, and End keys.
      </p>
      <ImageComparePlayground />
    </Section>
  );
}
