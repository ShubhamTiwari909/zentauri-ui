"use client";
import {
  TabsList,
  TabsTrigger,
} from "@zentauri-ui/zentauri-components/ui/tabs";

const TabsListComponent = () => {
  return (
    <TabsList className="border-b border-white/10 bg-slate-950/80 p-3">
      <TabsTrigger value="npm">npm</TabsTrigger>
      <TabsTrigger value="pnpm">pnpm</TabsTrigger>
      <TabsTrigger value="yarn">yarn</TabsTrigger>
    </TabsList>
  );
};

export default TabsListComponent;
