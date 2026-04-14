"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function TabsExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Underline appearance for dense settings layouts.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`Tabs · appearance · underline, animation · fade, size · sm (preview)`)}
<Tabs defaultValue="general" appearance="underline">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general">...</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="general" appearance="underline" animation="fade" size="sm">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-3 text-xs text-slate-300">
              Workspace name, timezone, and defaults.
            </TabsContent>
            <TabsContent value="billing" className="mt-3 text-xs text-slate-300">
              Invoices and payment methods.
            </TabsContent>
          </Tabs>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
