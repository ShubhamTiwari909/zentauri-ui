"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
} from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";

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
        <TabsContentAnimated value="one" animation="fade">
          First panel content.
        </TabsContentAnimated>
        <TabsContentAnimated value="two" animation="fade">
          Second panel content.
        </TabsContentAnimated>
      </Tabs>
    </div>
  );
}
