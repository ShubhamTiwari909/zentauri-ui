"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants, tabsTriggerVariants } from "@zentauri-ui/zentauri-components/ui/tabs";

import type { TabsDemoProps } from "./tabs-code-examples.types";

export function TabsDemo({ variant, size, appearance }: TabsDemoProps) {
  const listClass = tabsListVariants({
    variant,
    size,
    orientation: "horizontal",
  });
  const triggerClass = tabsTriggerVariants({ variant, size, appearance });
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        List variant: <span className="font-bold">{variant}</span> | Size:{" "}
        <span className="font-bold">{size}</span> | Appearance:{" "}
        <span className="font-bold">{appearance}</span>
      </p>
      <Tabs defaultValue="one" appearance={appearance}>
        <TabsList className={listClass}>
          <TabsTrigger className={triggerClass} value="one">
            One
          </TabsTrigger>
          <TabsTrigger className={triggerClass} value="two">
            Two
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one" animation="fade">
          First panel content.
        </TabsContent>
        <TabsContent value="two" animation="fade">
          Second panel content.
        </TabsContent>
      </Tabs>
    </div>
  );
}
