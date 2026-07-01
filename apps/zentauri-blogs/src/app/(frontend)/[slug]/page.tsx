import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { RefreshRouteOnSave } from "@/app/components/RefreshRouteOnSave";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { isEnabled: isDraftMode } = await draftMode();

  const payload = await getPayload({ config });

  const page = await payload
    .find({
      collection: "pages",
      depth: 0,
      draft: isDraftMode,
      limit: 1,
      overrideAccess: isDraftMode,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    ?.then(({ docs }) => docs?.[0]);

  if (!page) {
    return notFound();
  }

  return (
    <main>
      <RefreshRouteOnSave />
      <h1>{page?.title}</h1>
    </main>
  );
}
