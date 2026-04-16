"use client";
import { cn } from "@/lib/utils";
import {
  TabsList,
  TabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
} from "@zentauri-ui/zentauri-components/ui";

const listPillsMd = tabsListVariants({
  variant: "pills",
  size: "md",
  orientation: "horizontal",
});

const triggerPillsMd = tabsTriggerVariants({
  variant: "pills",
  size: "md",
  appearance: "sky",
});
const TabsListComponent = () => {
  return (
    <TabsList
      className={cn("border-b border-white/10 bg-slate-950/80 p-3", listPillsMd)}
    >
      <TabsTrigger value="npm" className={triggerPillsMd}>
        npm
      </TabsTrigger>
      <TabsTrigger value="pnpm" className={triggerPillsMd}>
        pnpm
      </TabsTrigger>
      <TabsTrigger value="yarn" className={triggerPillsMd}>
        yarn
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsListComponent;
