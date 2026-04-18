import HookPreviewPage from "@/components/preview/hooks/hook-preview-page";
import {
  HOOK_PREVIEW_SLUGS,
  isHookPreviewSlug,
  type HookPreviewSlug,
} from "@/lib/hook-preview-registry";
import { getHookPreviewSeo } from "@/lib/hook-preview-seo";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { notFound } from "next/navigation";

export function generateStaticParams(): { slug: HookPreviewSlug }[] {
  return HOOK_PREVIEW_SLUGS.map((slug) => ({ slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  if (!isHookPreviewSlug(slug)) {
    return {};
  }
  return previewSeoDocumentToMetadata(getHookPreviewSeo(slug));
}

export default async function HookDetailRoutePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  if (!isHookPreviewSlug(slug)) {
    notFound();
  }
  const seo = getHookPreviewSeo(slug);
  return <HookPreviewPage seo={seo} slug={slug} />;
}
