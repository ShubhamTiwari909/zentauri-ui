"use client"
import {
    TabsList,
    TabsTrigger,
    tabsListVariants,
    tabsTriggerVariants,
  } from "@zentauri-ui/zentauri-components/ui";

const TabsListComponent = () => {
  return (
    <TabsList
      className={tabsListVariants({
        variant: "pills",
        size: "md",
        orientation: "horizontal",
      })}
    >
      <TabsTrigger
        value="overview"
        className={tabsTriggerVariants({
          variant: "pills",
          size: "md",
          appearance: "rose",
        })}
      >
        Overview
      </TabsTrigger>
      <TabsTrigger
        value="activity"
        className={tabsTriggerVariants({
          variant: "pills",
          size: "md",
          appearance: "sky",
        })}
      >
        Activity
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsListComponent;
