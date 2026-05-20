"use client";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";

export function TabsExamplesSection() {
  return (
    <section className="rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Underline list styling with small density, then vertical orientation
        with slide-in panels.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`Tabs · underline list + sm triggers, TabsContent · animation · fade`)}
<Tabs defaultValue="general" appearance="sky">
  <TabsList>
    <TabsTrigger value="general">
      General
    </TabsTrigger>
    <TabsTrigger value="billing">
      Billing
    </TabsTrigger>
  </TabsList>
  <TabsContentAnimated
    value="general"
    animation="fade"
    className="mt-3 text-xs text-slate-800 dark:text-slate-300"
  >
    Workspace name, timezone, and defaults.
  </TabsContentAnimated>
  <TabsContentAnimated
    value="billing"
    animation="fade"
    className="mt-3 text-xs text-slate-800 dark:text-slate-300"
  >
    Invoices and payment methods.
  </TabsContentAnimated>
</Tabs>`}
        >
          <Tabs defaultValue="general" appearance="sky">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContentAnimated
              value="general"
              animation="fade"
              className="mt-3 text-xs text-slate-800 dark:text-slate-300"
            >
              Workspace name, timezone, and defaults.
            </TabsContentAnimated>
            <TabsContentAnimated
              value="billing"
              animation="fade"
              className="mt-3 text-xs text-slate-800 dark:text-slate-300"
            >
              Invoices and payment methods.
            </TabsContentAnimated>
          </Tabs>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment(`Tabs · orientation · vertical, TabsContent · animation · slide`)}
<Tabs
  defaultValue="profile"
  orientation="vertical"
  className="flex items-center justify-center gap-4 sm:flex-row"
  appearance="emerald"
>
  <TabsList>
    <TabsTrigger value="profile">
      Profile
    </TabsTrigger>
    <TabsTrigger value="security">
      Security
    </TabsTrigger>
  </TabsList>
  <div className="min-w-0 flex-1">
    <TabsContentAnimated
      value="profile"
      animation="slide"
      className="mt-0 text-xs text-slate-800 dark:text-slate-300 sm:mt-2"
    >
      Avatar, display name, and locale.
    </TabsContentAnimated>
    <TabsContentAnimated
      value="security"
      animation="slide"
      className="mt-0 text-xs text-slate-800 dark:text-slate-300 sm:mt-2"
    >
      Sessions, 2FA, and API keys.
    </TabsContentAnimated>
  </div>
</Tabs>`}
        >
          <Tabs
            defaultValue="profile"
            orientation="vertical"
            className="flex items-center justify-center gap-4 sm:flex-row"
            appearance="emerald"
          >
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <div className="min-w-0 flex-1">
              <TabsContentAnimated
                value="profile"
                animation="slide"
                className="mt-0 text-xs text-slate-800 dark:text-slate-300 sm:mt-2"
              >
                Avatar, display name, and locale.
              </TabsContentAnimated>
              <TabsContentAnimated
                value="security"
                animation="slide"
                className="mt-0 text-xs text-slate-800 dark:text-slate-300 sm:mt-2"
              >
                Sessions, 2FA, and API keys.
              </TabsContentAnimated>
            </div>
          </Tabs>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
