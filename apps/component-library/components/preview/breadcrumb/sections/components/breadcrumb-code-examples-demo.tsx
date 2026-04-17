import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@zentauri-ui/zentauri-components/ui/breadcrumb";

import type { BreadcrumbDemoProps } from "./breadcrumb-code-examples.types";

export function BreadcrumbDemo({ scenario, appearance }: BreadcrumbDemoProps) {
  if (scenario === "dots") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" appearance={appearance}>Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>·</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage appearance={appearance}>API</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  if (scenario === "smallSeparator") {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" appearance={appearance}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator size="sm" />
          <BreadcrumbItem>
            <BreadcrumbPage appearance={appearance}>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" appearance={appearance}>Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage appearance={appearance}>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage appearance={appearance}>Code Examples</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
