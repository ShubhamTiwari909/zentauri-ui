import HomePage from "@/components/home";
import homeSeoDoc from "@/content/seo/home.json";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import PageWrapper from "@/components/common/PageWrapper";

const homeSeo = homeSeoDoc as PreviewSeoDocument;

export const metadata = previewSeoDocumentToMetadata(homeSeo);

export default function Home() {
  return <PageWrapper><HomePage seo={homeSeo} /></PageWrapper>;
}
