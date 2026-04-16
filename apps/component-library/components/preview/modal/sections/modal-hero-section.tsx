import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Modal, ModalBody, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@zentauri-ui/zentauri-components/ui/modal";

export function ModalHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Modal defaultOpen={false}>
          <ModalTrigger className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
            Open modal
          </ModalTrigger>
          <ModalContent animation="scale" appearance="glass" size="sm">
            <ModalClose />
            <ModalHeader>
              <ModalTitle>Confirm action</ModalTitle>
              <ModalDescription>
                This will apply changes to your workspace.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-slate-300">
                You can always undo from the activity log within 24 hours.
              </p>
            </ModalBody>
            <ModalFooter className="gap-2">
              <Button appearance="outline" size="sm" animation="none">
                Cancel
              </Button>
              <Button appearance="sky" size="sm" animation="lift">
                Continue
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
