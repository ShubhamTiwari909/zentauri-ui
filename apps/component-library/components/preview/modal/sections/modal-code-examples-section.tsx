"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  type ModalContentProps,
} from "@/components/ui/modal";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200";

const MODAL_SIZES = ["sm", "md", "lg", "xl", "full"] as const satisfies readonly NonNullable<
  ModalContentProps["size"]
>[];

const MODAL_POSITIONS = ["center", "top", "bottom"] as const satisfies readonly NonNullable<
  ModalContentProps["position"]
>[];

const MODAL_APPEARANCES = ["default", "glass"] as const satisfies readonly NonNullable<
  ModalContentProps["appearance"]
>[];

function modalSnippet(opts: {
  size: NonNullable<ModalContentProps["size"]>;
  position: NonNullable<ModalContentProps["position"]>;
  appearance: NonNullable<ModalContentProps["appearance"]>;
  label: string;
}) {
  const { size, position, appearance, label } = opts;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const positionAttr = position === "center" ? "" : ` position="${position}"`;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  return `${variantLeadComment(`ModalContent · size · ${size}, position · ${position}, appearance · ${appearance}`)}<Modal>
  <ModalTrigger className="${TRIGGER_CLASS}">
    ${label}
  </ModalTrigger>
  <ModalContent${sizeAttr}${positionAttr}${appearanceAttr} animation="scale">
    <ModalClose />
    <ModalHeader>
      <ModalTitle>Dialog</ModalTitle>
      <ModalDescription>Supporting description.</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <p className="text-sm text-slate-300">Modal body copy.</p>
    </ModalBody>
  </ModalContent>
</Modal>`;
}

function ModalDemo(opts: {
  size: NonNullable<ModalContentProps["size"]>;
  position: NonNullable<ModalContentProps["position"]>;
  appearance: NonNullable<ModalContentProps["appearance"]>;
  label: string;
}) {
  const { size, position, appearance, label } = opts;
  return (
    <Modal>
      <ModalTrigger className={TRIGGER_CLASS}>{label}</ModalTrigger>
      <ModalContent size={size} position={position} appearance={appearance} animation="scale">
        <ModalClose />
        <ModalHeader>
          <ModalTitle>Dialog</ModalTitle>
          <ModalDescription>Supporting description.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-slate-300">Modal body copy.</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function ModalCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Modal variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Max width, vertical anchor, and surface style with a shared dialog layout. Code uses a Variant: lead-in per row.
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
            <ModalDemo size={size} position="center" appearance="default" label={`Open (${size})`} />
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
            <ModalDemo size="md" position={position} appearance="default" label={`Open (${position})`} />
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
            <ModalDemo size="md" position="center" appearance={appearance} label={`Open (${appearance})`} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
