import AnimationPreviewPage from "@/components/preview/animations/page";
import {
  ANIMATION_PREVIEW_SLUGS,
  getAnimationSectionSeo,
  isAnimationPreviewSlug,
  type AnimationPreviewSlug,
} from "@/lib/animations-preview-registry";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { notFound } from "next/navigation";

export function generateStaticParams(): { slug: AnimationPreviewSlug }[] {
  return ANIMATION_PREVIEW_SLUGS.map((slug) => ({ slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  if (!isAnimationPreviewSlug(slug)) {
    return {};
  }
  return previewSeoDocumentToMetadata(getAnimationSectionSeo(slug));
}

export default async function AnimationSectionRoutePage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  if (!isAnimationPreviewSlug(slug)) {
    notFound();
  }
  const seo = getAnimationSectionSeo(slug);
  return <AnimationPreviewPage seo={seo} slug={slug} />;
}
