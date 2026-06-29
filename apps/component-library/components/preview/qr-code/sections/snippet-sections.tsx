import { Section } from "@/components/common/Section";

import { QrCodePlayground } from "./components/playground";

export function QrCodeCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        QR code generator variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Enter a value and pick an error correction level to preview the QR code
        generator live. Toggle Show output / Show code and the snippet updates
        to match the selected variant.
      </p>
      <QrCodePlayground />
    </Section>
  );
}
