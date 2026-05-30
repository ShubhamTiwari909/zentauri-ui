"use client";

import { FiZap } from "react-icons/fi";
import { Rating, RatingProps } from "@zentauri-ui/zentauri-components/ui/rating";

import type { RatingDemoProps } from "./rating-code-examples.types";

const icons: RatingProps["icon"][] = ["star", "heart", "flame", "thumb"];

export function RatingDemo({
  allowClear,
  allowHalf,
  appearance,
  max,
  readOnly,
  size,
}: RatingDemoProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {icons.map((icon, index) => {
        return (
          <Rating
            key={index}
            allowClear={allowClear}
            allowHalf={allowHalf}
            appearance={appearance}
            defaultValue={allowHalf ? 4.5 : icon === "flame" ? 3 : 4}
            hint={
              allowClear
                ? "Click the selected value again to clear it."
                : undefined
            }
            icon={icon}
            label={readOnly ? "Average rating" : "Product rating"}
            max={max}
            readOnly={readOnly}
            size={size}
          />
        );
      })}
    </div>
  );
}

export function RatingCustomIconDemo() {
  return (
    <Rating
      appearance="gradient-yellow"
      defaultValue={4}
      icon={FiZap}
      label="Energy score"
    />
  );
}

export function RatingValidationDemo() {
  return (
    <Rating
      allowHalf
      appearance="destructive"
      errorMessage="Choose a score before submitting feedback."
      label="Service rating"
      name="serviceRating"
    />
  );
}
