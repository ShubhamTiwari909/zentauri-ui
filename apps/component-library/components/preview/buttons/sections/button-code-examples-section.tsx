import ButtonCodeShowcase from "@/components/code-showcase/ButtonCodeShowcase";
import {
  showcaseButtons,
  buttonAnimationPresets,
  sizeButtons,
} from "../variants";

export function ButtonCodeExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Button Variants Examples
        </h2>
        <div className="mt-6 space-y-10 rounded-xl">
          {showcaseButtons.map((button) => {
            const code = `<Button appearance="${button.appearance}" className="w-full">${button.label}</Button>`;
            return (
              <ButtonCodeShowcase
                key={button.label}
                code={code}
                appearance={button.appearance}
                animation={"none"}
                label={button.label}
              />
            );
          })}
          {buttonAnimationPresets.map(([label, animation]) => {
            const code = `<Button appearance="glass" animation="${animation}" className="w-full">${label} animation</Button>`;
            return (
              <ButtonCodeShowcase
                key={label}
                code={code}
                appearance={"glass"}
                animation={animation}
                label={`${label} animation`}
              />
            );
          })}
          {sizeButtons.map((button) => {
            const code = `<Button appearance="gradient-indigo" size="${button.size}" className="w-full ${button.size === "icon" ? "w-20" : ""}">${button.label} size</Button>`;
            return (
              <ButtonCodeShowcase
                key={button.label}
                code={code}
                appearance={"gradient-indigo"}
                animation={"none"}
                label={`${button.label} size`}
                size={button.size}
                buttonClassName={button.size === "icon" ? "w-20" : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
