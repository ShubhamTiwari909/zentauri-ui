import TypographySectionPage from "@/components/preview/typography/typography-section-page";
import {
  TYPOGRAPHY_SECTION_SLUGS,
  getTypographySectionSeo,
  isTypographySectionSlug,
  type TypographySectionSlug,
} from "@/lib/typography-preview-registry";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { notFound } from "next/navigation";

export function generateStaticParams(): { section: TypographySectionSlug }[] {
  return TYPOGRAPHY_SECTION_SLUGS.map((section) => ({ section }));
}

type PageParams = Promise<{ section: string }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { section } = await params;
  if (!isTypographySectionSlug(section)) {
    return {};
  }
  return previewSeoDocumentToMetadata(getTypographySectionSeo(section));
}

export default async function TypographySectionRoutePage({
  params,
}: {
  params: PageParams;
}) {
  const { section } = await params;
  if (!isTypographySectionSlug(section)) {
    notFound();
  }
  const seo = getTypographySectionSeo(section);
  return <TypographySectionPage seo={seo} section={section} />;
}
