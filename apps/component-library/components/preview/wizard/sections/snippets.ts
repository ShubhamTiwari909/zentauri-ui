export function wizardBasicSnippet(): string {
  return `import { Wizard, WizardStep, WizardHeader, WizardProgress, WizardNavigation } from "@zentauri-ui/zentauri-components/ui/wizard";

<Wizard>
  <WizardHeader />
  <WizardProgress variant="dots" />
  <WizardStep id="personal" title="Personal">
    Personal information
  </WizardStep>
  <WizardStep id="address" title="Address">
    Address details
  </WizardStep>
  <WizardStep id="payment" title="Payment">
    Payment information
  </WizardStep>
  <WizardNavigation />
</Wizard>`;
}

export function wizardSidebarSnippet(): string {
  return `import { Wizard, WizardStep, WizardHeader, WizardContent, WizardNavigation, WizardSidebar } from "@zentauri-ui/zentauri-components/ui/wizard";

<Wizard>
  <div className="flex gap-6">
    <WizardSidebar />
    <div className="flex flex-1 flex-col gap-4">
      <WizardHeader />
      <WizardContent>
        <WizardStep id="personal" title="Personal">
          Content
        </WizardStep>
        <WizardStep id="address" title="Address">
          Content
        </WizardStep>
      </WizardContent>
      <WizardNavigation />
    </div>
  </div>
</Wizard>`;
}

export function wizardCustomFooterSnippet(): string {
  return `import { Wizard, WizardStep, WizardFooter, WizardNavigation } from "@zentauri-ui/zentauri-components/ui/wizard";

<Wizard>
  <WizardStep id="one" title="Step 1">Content</WizardStep>
  <WizardStep id="two" title="Step 2">Content</WizardStep>
  <WizardFooter className="flex justify-between">
    <span className="text-xs text-slate-500">
      Need help?
    </span>
    <WizardNavigation />
  </WizardFooter>
</Wizard>`;
}
