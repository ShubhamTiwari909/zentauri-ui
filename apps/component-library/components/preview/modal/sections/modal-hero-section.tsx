"use client";

import { Button } from "@zentauri-ui/zentauri-components/ui";
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
} from "@zentauri-ui/zentauri-components/ui";

export function ModalHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Overlay
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Modal dialogs with focus management.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Portal-mounted surface, scroll locking, escape to dismiss, and motion
            presets for the panel and scrim.
          </p>
        </div>
      </div>

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
