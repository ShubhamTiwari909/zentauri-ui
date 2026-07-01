import type { FieldHook, Where } from "payload";

import { ValidationError } from "payload";

export const ensureUniqueSlug: FieldHook = async ({
  originalDoc,
  req,
  value,
}) => {
  if (originalDoc.slug === value) {
    return value;
  }

  if (value?.startsWith("/")) {
    throw new ValidationError({
      errors: [
        {
          message: `Do not include a / prefix for your slug ${value}.`,
          path: "slug",
        },
      ],
    });
  }

  const where: Where = { slug: { equals: value } };

  const dupes = await req.payload.find({ collection: "pages", where });

  if (dupes.docs.length > 0 && req.user) {
    const message = `A page with the slug ${value} already exists. Slug must be unique per tenant.`;
    throw new ValidationError({ errors: [{ message, path: "slug" }] });
  }

  return value?.trim() ?? value;
};
