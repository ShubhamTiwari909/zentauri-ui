"use client";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
} from "@/components/ui/tabs";

const listUnderlineSm = tabsListVariants({
  variant: "underline",
  size: "sm",
  orientation: "horizontal",
});
const triggerUnderlineSm = tabsTriggerVariants({
  variant: "underline",
  size: "sm",
});

const listVerticalDefault = tabsListVariants({
  variant: "default",
  size: "sm",
  orientation: "vertical",
});
const triggerVerticalDefault = tabsTriggerVariants({
  variant: "default",
  size: "sm",
});

export function TabsExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Underline list styling with small density, then vertical orientation with
        slide-in panels.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`Tabs · underline list + sm triggers, TabsContent · animation · fade`)}
<Tabs defaultValue="general">
  <TabsList className={tabsListVariants({ variant: "underline", size: "sm", orientation: "horizontal" })}>
    <TabsTrigger className={tabsTriggerVariants({ variant: "underline", size: "sm" })} value="general">General</TabsTrigger>
    ...
  </TabsList>
  <TabsContent value="general" animation="fade">...</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="general">
            <TabsList className={listUnderlineSm}>
              <TabsTrigger className={triggerUnderlineSm} value="general">
                General
              </TabsTrigger>
              <TabsTrigger className={triggerUnderlineSm} value="billing">
                Billing
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="general"
              animation="fade"
              className="mt-3 text-xs text-slate-300"
            >
              Workspace name, timezone, and defaults.
            </TabsContent>
            <TabsContent
              value="billing"
              animation="fade"
              className="mt-3 text-xs text-slate-300"
            >
              Invoices and payment methods.
            </TabsContent>
          </Tabs>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment(`Tabs · orientation · vertical, TabsContent · animation · slide`)}
<Tabs defaultValue="profile" orientation="vertical" className="flex gap-6">
  <TabsList className={tabsListVariants({ variant: "default", size: "sm", orientation: "vertical" })}>
    <TabsTrigger className={tabsTriggerVariants({ variant: "default", size: "sm" })} value="profile">Profile</TabsTrigger>
    ...
  </TabsList>
  <TabsContent value="profile" animation="slide">...</TabsContent>
</Tabs>`}
        >
          <Tabs
            defaultValue="profile"
            orientation="vertical"
            className="flex flex-col gap-4 sm:flex-row sm:items-start"
          >
            <TabsList className={listVerticalDefault}>
              <TabsTrigger className={triggerVerticalDefault} value="profile">
                Profile
              </TabsTrigger>
              <TabsTrigger className={triggerVerticalDefault} value="security">
                Security
              </TabsTrigger>
            </TabsList>
            <div className="min-w-0 flex-1">
              <TabsContent
                value="profile"
                animation="slide"
                className="mt-0 text-xs text-slate-300 sm:mt-2"
              >
                Avatar, display name, and locale.
              </TabsContent>
              <TabsContent
                value="security"
                animation="slide"
                className="mt-0 text-xs text-slate-300 sm:mt-2"
              >
                Sessions, 2FA, and API keys.
              </TabsContent>
            </div>
          </Tabs>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
