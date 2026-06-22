"use client";

import { useState } from "react";
import { FiArchive, FiCopy, FiDownload, FiSave, FiSend } from "react-icons/fi";

import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { SplitButton } from "@zentauri-ui/zentauri-components/ui/split-button";
import type { SplitButtonItem } from "@zentauri-ui/zentauri-components/ui/split-button";

const baseItems: SplitButtonItem[] = [
  { id: "save-as", label: "Save As" },
  { id: "export", label: "Export", icon: <FiDownload aria-hidden /> },
  { id: "duplicate", label: "Duplicate", icon: <FiCopy aria-hidden /> },
];

const appearanceItems: SplitButtonItem[] = [
  { id: "copy", label: "Copy" },
  { id: "archive", label: "Archive" },
];

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function SplitButtonExamplesSection() {
  const [lastAction, setLastAction] = useState("No action selected");
  const [saving, setSaving] = useState(false);

  const asyncItems: SplitButtonItem[] = [
    {
      id: "draft",
      label: "Save draft",
      onSelect: () => setLastAction("Draft"),
    },
    {
      id: "send-copy",
      label: "Send copy",
      icon: <FiSend aria-hidden />,
      onSelect: () => setLastAction("Copy sent"),
    },
  ];

  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Split button keeps the primary action immediately available while the
        trigger opens secondary menu actions with the same appearance and size.
      </p>

      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("basic usage")}<SplitButton
  label="Save"
  onClick={handleSave}
  items={[
    { id: "save-as", label: "Save As", onSelect: handleSaveAs },
    { id: "export", label: "Export", onSelect: handleExport },
  ]}
/>`}
        >
          <SplitButton
            label="Save"
            onClick={() => setLastAction("Saved")}
            items={[
              {
                id: "save-as",
                label: "Save As",
                onSelect: () => setLastAction("Save As"),
              },
              {
                id: "export",
                label: "Export",
                onSelect: () => setLastAction("Export"),
              },
            ]}
          />
          <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
            {lastAction}
          </p>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("appearances and plan-style variants")}<div className="flex flex-wrap gap-3">
  <SplitButton label="Primary" variant="primary" items={items} />
  <SplitButton label="Secondary" variant="secondary" items={items} />
  <SplitButton label="Outline" variant="outline" items={items} />
  <SplitButton label="Ghost" variant="ghost" items={items} />
  <SplitButton label="Danger" variant="danger" items={items} />
  <SplitButton label="Success" variant="success" items={items} />
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <SplitButton
              label="Primary"
              variant="primary"
              items={appearanceItems}
            />
            <SplitButton
              label="Secondary"
              variant="secondary"
              items={appearanceItems}
            />
            <SplitButton
              label="Outline"
              variant="outline"
              items={appearanceItems}
            />
            <SplitButton
              label="Ghost"
              variant="ghost"
              items={appearanceItems}
            />
            <SplitButton
              label="Danger"
              variant="danger"
              items={appearanceItems}
            />
            <SplitButton
              label="Success"
              variant="success"
              items={appearanceItems}
            />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("sizes")}<div className="flex flex-wrap items-center gap-3">
  <SplitButton label="Small" size="sm" items={items} />
  <SplitButton label="Medium" size="md" items={items} />
  <SplitButton label="Large" size="lg" items={items} />
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <SplitButton label="Small" size="sm" items={baseItems} />
            <SplitButton label="Medium" size="md" items={baseItems} />
            <SplitButton label="Large" size="lg" items={baseItems} />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("disabled and loading")}<div className="flex flex-wrap items-center gap-3">
  <SplitButton disabled label="Disabled" items={items} />
  <SplitButton loading label="Saving" items={items} />
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <SplitButton disabled label="Disabled" items={baseItems} />
            <SplitButton loading label="Saving" items={baseItems} />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("icons and long labels")}<SplitButton
  appearance="outline"
  startIcon={<FiSave aria-hidden />}
  label="Save document changes"
  items={[
    { id: "archive", label: "Archive copy", icon: <FiArchive aria-hidden /> },
    { id: "download", label: "Download PDF", icon: <FiDownload aria-hidden /> },
  ]}
/>`}
        >
          <SplitButton
            appearance="outline"
            startIcon={<FiSave aria-hidden />}
            label="Save document changes"
            items={[
              {
                id: "archive",
                label: "Archive copy",
                icon: <FiArchive aria-hidden />,
              },
              {
                id: "download",
                label: "Download PDF",
                icon: <FiDownload aria-hidden />,
              },
            ]}
          />
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("async primary action")}const [saving, setSaving] = useState(false);

<SplitButton
  loading={saving}
  label={saving ? "Sending" : "Send"}
  startIcon={<FiSend aria-hidden />}
  onClick={async () => {
    setSaving(true);
    await save();
    setSaving(false);
  }}
  items={items}
/>`}
        >
          <SplitButton
            loading={saving}
            label={saving ? "Sending" : "Send"}
            startIcon={<FiSend aria-hidden />}
            onClick={async () => {
              setSaving(true);
              await wait(600);
              setSaving(false);
              setLastAction("Sent");
            }}
            items={asyncItems}
          />
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("full width")}<div className="max-w-xl">
  <SplitButton
    fullWidth
    appearance="secondary"
    label="Save document changes"
    items={items}
  />
</div>`}
        >
          <div className="max-w-xl">
            <SplitButton
              fullWidth
              appearance="secondary"
              label="Save document changes"
              items={baseItems}
            />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("triggerOn hover vs click")}<div className="flex flex-wrap gap-3">
  {/* default — opens on click */}
  <SplitButton
    label="Click to open"
    items={items}
  />

  {/* hover — opens when the mouse enters the button */}
  <SplitButton
    triggerOn="hover"
    label="Hover to open"
    items={items}
  />
</div>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <SplitButton label="Click to open" items={baseItems} />
            <SplitButton
              triggerOn="hover"
              label="Hover to open"
              items={baseItems}
            />
          </div>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
