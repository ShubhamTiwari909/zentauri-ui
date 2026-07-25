"use client";

import {
  Wizard,
  WizardStep,
  WizardHeader,
  WizardProgress,
  WizardNavigation,
  WizardFooter,
  WizardSidebar,
  WizardContent,
} from "@zentauri-ui/zentauri-components/ui/wizard";

export function WizardBasicDemo() {
  return (
    <Wizard>
      <WizardHeader />
      <WizardProgress variant="dots" />
      <WizardStep id="one" title="Personal">
        Personal info
      </WizardStep>
      <WizardStep id="two" title="Address">
        Address info
      </WizardStep>
      <WizardStep id="three" title="Payment">
        Payment info
      </WizardStep>
      <WizardNavigation />
    </Wizard>
  );
}

export function WizardSidebarDemo() {
  return (
    <div className="flex gap-6">
      <Wizard>
        <div className="flex gap-6">
          <WizardSidebar />
          <div className="flex flex-1 flex-col gap-4">
            <WizardHeader />
            <WizardContent>
              <WizardStep id="personal" title="Personal">
                Personal information content
              </WizardStep>
              <WizardStep id="address" title="Address">
                Address content
              </WizardStep>
              <WizardStep id="payment" title="Payment">
                Payment content
              </WizardStep>
            </WizardContent>
            <WizardNavigation />
          </div>
        </div>
      </Wizard>
    </div>
  );
}

export function WizardCustomFooterDemo() {
  return (
    <Wizard>
      <WizardStep id="one" title="Step 1">
        Custom footer below
      </WizardStep>
      <WizardStep id="two" title="Step 2">
        Step 2 content
      </WizardStep>
      <WizardFooter className="flex justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Need help?
        </span>
        <WizardNavigation />
      </WizardFooter>
    </Wizard>
  );
}
