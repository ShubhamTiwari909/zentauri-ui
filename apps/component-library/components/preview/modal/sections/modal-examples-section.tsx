import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@zentauri-ui/zentauri-components/ui/modal";

export function ModalExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Slide-up animation with a top-aligned panel.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`ModalContent · animation · slide-up, position · top, size · md`)}
<Modal>
  <ModalTrigger>Open</ModalTrigger>
  <ModalContent animation="slide-up" position="top" size="md">
    <ModalClose />
    <ModalHeader>...</ModalHeader>
  </ModalContent>
</Modal>`}
        >
          <Modal>
            <ModalTrigger className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
              Open top sheet
            </ModalTrigger>
            <ModalContent animation="slide-up" position="top" size="md">
              <ModalClose />
              <ModalHeader>
                <ModalTitle>Release notes</ModalTitle>
                <ModalDescription>Version 2.4 highlights.</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <ul className="list-inside list-disc text-sm text-slate-300">
                  <li>Faster cold starts</li>
                  <li>Improved tracing defaults</li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button appearance="outline" size="sm" animation="none">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
