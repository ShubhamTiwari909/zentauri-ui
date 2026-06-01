"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";

import type { TabsDemoProps } from "./types";

export function TabsDemo({ variant, size, appearance }: TabsDemoProps) {
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm text-slate-900 dark:text-slate-50">
        List variant: <span className="font-bold">{variant}</span> | Size:{" "}
        <span className="font-bold">{size}</span> | Appearance:{" "}
        <span className="font-bold">{appearance}</span>
      </p>
      <Tabs
        defaultValue="one"
        appearance={appearance}
        orientation="horizontal"
        size={size}
        variant={variant}
      >
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContentAnimated
          value="one"
          animation="fade"
          className="text-slate-900 dark:text-slate-50"
        >
          First panel content.
        </TabsContentAnimated>
        <TabsContentAnimated
          value="two"
          animation="fade"
          className="text-slate-900 dark:text-slate-50"
        >
          Second panel content.
        </TabsContentAnimated>
      </Tabs>
    </div>
  );
}
