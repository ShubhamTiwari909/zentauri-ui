import type { FieldHook, Where } from "payload";

import { ValidationError } from "payload";

export const ensureUniqueSlug: FieldHook = async ({
  originalDoc,
  req,
  value,
}) => {
  const normalizedValue = value?.trim();

  if (originalDoc?.slug === normalizedValue) {
    return normalizedValue;
  }

  if (normalizedValue?.startsWith("/")) {
    throw new ValidationError({
      errors: [
        {
          message: `Do not include a / prefix for your slug ${normalizedValue}.`,
          path: "slug",
        },
      ],
    });
  }

  const where: Where = { slug: { equals: normalizedValue } };

  const dupes = await req.payload.find({ collection: "pages", where });

  if (dupes.docs.length > 0) {
    const message = `A page with the slug ${normalizedValue} already exists. Slug must be unique.`;
    throw new ValidationError({ errors: [{ message, path: "slug" }] });
  }

  return normalizedValue;
};
