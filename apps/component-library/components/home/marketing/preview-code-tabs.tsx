"use client";

import { useState } from "react";

import { Tabs } from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";
import { TabsList, TabsTrigger } from "@zentauri-ui/zentauri-components/ui/tabs";
import type { ReactNode } from "react";
import CodeHighlight from "@/components/CodeHighlight";

const listClass =
  "inline-flex gap-1 rounded-xl border border-white/10 bg-slate-950/80 p-1";
const triggerClass =
  "rounded-lg px-3 py-1.5 text-xs font-medium text-slate-100 transition data-[state=active]:bg-white/10 data-[state=active]:text-white";

type PreviewCodeTabsProps = {
  preview: ReactNode;
  code: string;
};

export function PreviewCodeTabs({ preview, code }: PreviewCodeTabsProps) {
  const [tab, setTab] = useState("preview");

  return (
    <Tabs
      value={tab}
      defaultValue="preview"
      onValueChange={setTab}
      className="w-full"
      variant="pills"
      size="md"
      appearance="sky"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <TabsList className={listClass}>
          <TabsTrigger
            value="preview"
            className={triggerClass}
            disabled={false}
          >
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className={triggerClass} disabled={false}>
            Code
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContentAnimated value="preview" animation="fade" className="m-0">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          {preview}
        </div>
      </TabsContentAnimated>
      <TabsContentAnimated value="code" animation="fade" className="m-0">
        <div className="relative rounded-2xl border border-white/10 bg-slate-950/80">
          <CodeHighlight codeString={code} language="typescript" />
        </div>
      </TabsContentAnimated>
    </Tabs>
  );
}
