import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { RatingDemoProps } from "./rating-code-examples.types";

export function ratingSnippet(opts: RatingDemoProps): string {
  const { allowClear, allowHalf, appearance, icon, max, readOnly, size } = opts;
  const appearanceAttr =
    appearance === "amber" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const iconAttr =
    typeof icon === "string" && icon !== "star" ? ` icon="${icon}"` : "";
  const halfAttr = allowHalf ? " allowHalf" : "";
  const clearAttr = allowClear ? " allowClear" : "";
  const readOnlyAttr = readOnly ? " readOnly" : "";
  const maxAttr = max === undefined ? "" : ` max={${max}}`;
  const defaultValue = allowHalf ? "4.5" : icon === "flame" ? "3" : "4";

  return `${variantLeadComment(
    `appearance · ${appearance}, size · ${size}${allowHalf ? ", half" : ""}`,
  )}<div className="flex flex-wrap gap-4">
  {icons.map((icon, index) => {
    return (
      <Rating
        label="${readOnly ? "Average rating" : "Product rating"}"
        defaultValue={${defaultValue}}${appearanceAttr}${sizeAttr}${iconAttr}${halfAttr}${clearAttr}${readOnlyAttr}${maxAttr}
      />
    );
  })}
</div>`;
}

export function ratingCustomIconSnippet(): string {
  return `${variantLeadComment("custom react-icons icon")}import { FiZap } from "react-icons/fi";

<Rating
  icon={FiZap}
  appearance="gradient-yellow"
  defaultValue={4}
  label="Energy score"
/>`;
}

export function ratingValidationSnippet(): string {
  return `${variantLeadComment("form validation")}<Rating
  allowHalf
  appearance="destructive"
  errorMessage="Choose a score before submitting feedback."
  label="Service rating"
  name="serviceRating"
/>`;
}
