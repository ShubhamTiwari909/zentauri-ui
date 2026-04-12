import { redirect } from "next/navigation";

export default function PreviewIndexPage() {
  // Alternatively, we could render an introduction page.
  // For now, redirecting to the first component.
  redirect("/preview/buttons");
}
