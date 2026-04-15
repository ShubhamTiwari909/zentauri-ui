"use client";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import { Button } from "@zentauri-ui/zentauri-components/ui";
import {
  showcaseButtons,
  buttonAnimationPresets,
  sizeButtons,
} from "../variants";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export function ButtonCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Button variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant line
        naming the token row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {showcaseButtons.map((button) => {
          const code = `${variantLeadComment(`appearance · ${button.appearance}`)}<Button appearance="${button.appearance}" className="w-full">${button.label}</Button>`;
          return (
            <PreviewCodeShowcase key={button.label} code={code}>
              <p className="mb-5 text-xs font-semibold text-white">
                Appearance:{" "}
                <span className="font-bold">{button.appearance.toUpperCase()}</span>
              </p>
              <Button appearance={button.appearance} animation="none" className="w-40">
                {button.label}
              </Button>
            </PreviewCodeShowcase>
          );
        })}
        {buttonAnimationPresets.map(([label, animation]) => {
          const code = `${variantLeadComment(`animation · ${animation}`)}<Button appearance="glass" animation="${animation}" className="w-full">${label} animation</Button>`;
          return (
            <PreviewCodeShowcase key={label} code={code}>
              <p className="mb-5 text-xs font-semibold text-white">
                Animation: <span className="font-bold">{animation.toUpperCase()}</span>
              </p>
              <Button appearance="glass" animation={animation} className="w-40">
                {`${label} animation`}
              </Button>
            </PreviewCodeShowcase>
          );
        })}
        {sizeButtons.map((button) => {
          const code = `${variantLeadComment(`size · ${button.size}`)}<Button appearance="gradient-indigo" size="${button.size}" className="w-full ${button.size === "icon" ? "w-20" : ""}">${button.label} size</Button>`;
          return (
            <PreviewCodeShowcase key={button.label} code={code}>
              <p className="mb-5 text-xs font-semibold text-white">
                Size: <span className="font-bold">{button.size.toUpperCase()}</span>
              </p>
              <Button
                appearance="gradient-indigo"
                animation="none"
                size={button.size}
                className={"w-40"}
              >
                {`${button.label} size`}
              </Button>
            </PreviewCodeShowcase>
          );
        })}
      </div>
    </section>
  );
}
