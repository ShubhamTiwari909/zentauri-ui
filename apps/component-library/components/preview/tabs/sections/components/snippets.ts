import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { TabsDemoProps } from "./types";

export function tabsSnippet(opts: TabsDemoProps): string {
  const { variant, size, appearance } = opts;
  return `${variantLeadComment(`Tabs · list variant · ${variant}, size · ${size}, appearance · ${appearance}`)}<Tabs defaultValue="one" orientation="horizontal" size="${size}" variant="${variant}" appearance="${appearance}">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContentAnimated value="one" animation="fade" className="text-slate-900 dark:text-slate-50">First panel content.</TabsContentAnimated>
  <TabsContentAnimated value="two" animation="fade" className="text-slate-900 dark:text-slate-50">Second panel content.</TabsContentAnimated>
</Tabs>`;
}
