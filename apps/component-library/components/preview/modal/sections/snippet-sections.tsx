import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ModalDemo } from "./components/demo";
import { ModalControlledDemo } from "./components/controlled";
import {
  MODAL_ANIMATIONS,
  MODAL_APPEARANCES,
  MODAL_POSITIONS,
  MODAL_SIZES,
} from "./components/data";
import {
  modalControlledSnippet,
  modalSnippet,
} from "./components/snippets";

export function ModalCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Modal variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Max width, vertical anchor, and surface style with a shared dialog
        layout. Code uses a Variant: lead-in per row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {MODAL_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={modalSnippet({
              size,
              position: "center",
              appearance: "default",
              label: `Open (${size})`,
            })}
          >
            <ModalDemo
              size={size}
              position="center"
              appearance="default"
              label={`Open (${size})`}
            />
          </PreviewCodeShowcase>
        ))}
        {MODAL_POSITIONS.map((position) => (
          <PreviewCodeShowcase
            key={`pos-${position}`}
            code={modalSnippet({
              size: "md",
              position,
              appearance: "default",
              label: `Open (${position})`,
            })}
          >
            <ModalDemo
              size="md"
              position={position}
              appearance="default"
              label={`Open (${position})`}
            />
          </PreviewCodeShowcase>
        ))}
        {MODAL_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={modalSnippet({
              size: "md",
              position: "center",
              appearance,
              label: `Open (${appearance})`,
            })}
          >
            <ModalDemo
              size="md"
              position="center"
              appearance={appearance}
              label={`Open (${appearance})`}
            />
          </PreviewCodeShowcase>
        ))}
        {MODAL_ANIMATIONS.map((animation) => (
          <PreviewCodeShowcase
            key={`anim-${animation}`}
            code={modalSnippet({
              size: "md",
              position: "center",
              appearance: "default",
              label: `Open (${animation})`,
              animation,
            })}
          >
            <ModalDemo
              size="md"
              position="center"
              appearance="default"
              label={`Open (${animation})`}
              animation={animation}
            />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase code={modalControlledSnippet()}>
          <ModalControlledDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
