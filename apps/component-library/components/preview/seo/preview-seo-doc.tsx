import { getPreviewFaqJsonLd } from "@/lib/preview-seo";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

type PreviewSeoDocProps = {
  doc: PreviewSeoDocument;
};

function bodyParagraphs(body: string) {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function PreviewSeoDoc({ doc }: PreviewSeoDocProps) {
  const faqHeading = doc.headings.h2[doc.headings.h2.length - 1] ?? "FAQ";
  const useCasesHeading =
    doc.useCasesSectionHeading ?? "Common use cases";

  const jsonLd = getPreviewFaqJsonLd(doc);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl space-y-12 border-t border-white/10 pt-12">
        {doc.sections.map((section, index) => {
          const renderUseCasesList =
            section.body.trim() === "" &&
            section.heading === useCasesHeading;

          return (
            <section key={`${section.heading}-${index}`} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {section.heading}
              </h2>
              {renderUseCasesList ? (
                <ul className="list-inside list-disc space-y-2 text-base leading-7 text-slate-300">
                  {doc.useCases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3 text-base leading-7 text-slate-300">
                  {bodyParagraphs(section.body).map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {faqHeading}
          </h2>
          <div className="space-y-4">
            {doc.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <summary className="cursor-pointer text-base font-medium text-slate-100 marker:text-cyan-300">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
