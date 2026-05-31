"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Rating } from "@zentauri-ui/zentauri-components/ui/rating";

export function RatingExamplesSection() {
  const [score, setScore] = useState(3.5);

  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Rating covers review forms, NPS-style feedback, marketplace cards, and
        read-only aggregate scores with one accessible radiogroup API.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("controlled half rating")}const [score, setScore] = useState(3.5);

<Rating
  allowHalf
  value={score}
  onValueChange={setScore}
  appearance="amber"
  hint={\`Current value: \${score}\`}
  label="Review score"
/>`}
        >
          <Rating
            allowHalf
            appearance="amber"
            hint={`Current value: ${score}`}
            label="Review score"
            onValueChange={setScore}
            value={score}
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("icon preset")}<Rating
  icon="heart"
  appearance="rose"
  defaultValue={4}
  label="Delight score"
/>`}
        >
          <Rating
            appearance="rose"
            defaultValue={4}
            icon="heart"
            label="Delight score"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          code={`${variantLeadComment("read-only aggregate")}<Rating
  readOnly
  allowHalf
  value={4.5}
  appearance="gradient-green"
  icon="thumb"
  label="Average support rating"
/>`}
        >
          <Rating
            allowHalf
            appearance="gradient-green"
            icon="thumb"
            label="Average support rating"
            readOnly
            value={4.5}
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
