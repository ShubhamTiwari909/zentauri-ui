import { authenticated, authenticatedOrLocal } from "@/access/access";
import { ensureUniqueSlug } from "@/hooks/ensureUniqueSlug";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrLocal,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "createdAt", "updatedAt", "_status"],
    livePreview: {
      url: ({ data }) => {
        const { slug } = data ?? {};
        const encodedParams = new URLSearchParams({
          slug: typeof slug === "string" ? slug : "",
          collection: "pages",
          path: `/${slug}`,
          previewSecret: process.env.PREVIEW_SECRET || "",
        });

        return `/preview?${encodedParams.toString()}`;
      },
    },
    preview: ({ slug }) => {
      const encodedParams = new URLSearchParams({
        slug: typeof slug === "string" ? slug : "",
        collection: "pages",
        path: `/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || "",
      });

      return `/preview?${encodedParams.toString()}`;
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
        description: "The URL slug for this page",
      },
      hooks: {
        beforeChange: [ensureUniqueSlug],
        beforeDuplicate: [
          ({ value }) => {
            return `${value}-copy`;
          },
        ],
      },
      index: true,
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
};
