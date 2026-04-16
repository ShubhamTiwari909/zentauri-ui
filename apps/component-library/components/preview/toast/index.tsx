import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ToastPreviewRoot } from "./toast-preview-root";

export default function ToastPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return <ToastPreviewRoot seo={seo} />;
}
