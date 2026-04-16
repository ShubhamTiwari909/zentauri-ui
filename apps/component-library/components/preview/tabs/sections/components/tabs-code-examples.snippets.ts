import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { TabsDemoProps } from "./tabs-code-examples.types";

export function tabsSnippet(opts: TabsDemoProps): string {
  const { variant, size, appearance } = opts;
  const sizeAttr = size === "md" ? "" : `, size: "${size}"`;
  const listClass = `tabsListVariants({ variant: "${variant}"${sizeAttr}, orientation: "horizontal" })`;
  const triggerClass = `tabsTriggerVariants({ variant: "${variant}"${sizeAttr} })`;
  return `${variantLeadComment(`Tabs · list variant · ${variant}, size · ${size}, appearance · ${appearance}`)}<Tabs defaultValue="one">
  <TabsList className={${listClass}}>
    <TabsTrigger className={${triggerClass}} value="one">One</TabsTrigger>
    <TabsTrigger className={${triggerClass}} value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one" animation="fade">First panel content.</TabsContent>
  <TabsContent value="two" animation="fade">Second panel content.</TabsContent>
</Tabs>`;
}
