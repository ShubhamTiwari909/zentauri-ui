import type { Metadata } from "next";
import { getPreviewSiteUrl } from "./utils";

export type PreviewSeoOg = {
  title: string;
  description: string;
  type: "website";
};

export type PreviewSeoTwitter = {
  title: string;
  description: string;
  card: "summary_large_image";
};

export type PreviewSeoFaqItem = {
  question: string;
  answer: string;
};

/**
 * Bodies for each `headings.h2` entry except the last, which is reserved for FAQ
 * (`faqs`). If `body` is empty and `heading` matches `useCasesSectionHeading`, the
 * renderer shows `useCases` as a bullet list instead of body text.
 */
export type PreviewSeoSection = {
  heading: string;
  body: string;
};

/**
 * Single source of truth for preview route SEO and on-page doc blocks.
 *
 * - `headings.h2` must have length ≥ 2. The last entry is the FAQ section title.
 * - `sections.length` must equal `headings.h2.length - 1`.
 * - Optional `useCasesSectionHeading` defaults to "Common use cases"; that heading
 *   should appear in `headings.h2` with a matching `sections` row and `body: ""`.
 */
export type PreviewSeoDocument = {
  category?: string;
  title: string;
  description: string;
  keywords: string[];
  og: PreviewSeoOg;
  twitter: PreviewSeoTwitter;
  /** Path only, e.g. `/preview/alert` (joined with `metadataBase`). */
  canonicalPath: string;
  headings: {
    h1: string;
    h2: string[];
  };
  intro: string;
  useCases: string[];
  faqs: PreviewSeoFaqItem[];
  sections: PreviewSeoSection[];
  /** When set, a `sections` row with this same `heading` and empty `body` renders `useCases`. */
  useCasesSectionHeading?: string;
};

export const previewSeoMetadataBase = new URL(getPreviewSiteUrl());

export function previewSeoDocumentToMetadata(
  doc: PreviewSeoDocument,
): Metadata {
  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    alternates: {
      canonical: doc.canonicalPath,
    },
    openGraph: {
      title: doc.og.title,
      description: doc.og.description,
      type: doc.og.type,
      url: doc.canonicalPath,
    },
    twitter: {
      card: doc.twitter.card,
      title: doc.twitter.title,
      description: doc.twitter.description,
    },
  };
}

export function getPreviewFaqJsonLd(doc: PreviewSeoDocument) {
  const faqHeading = doc.headings.h2[doc.headings.h2.length - 1] ?? "FAQ";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${doc.headings.h1} — ${faqHeading}`,
    mainEntity: doc.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
