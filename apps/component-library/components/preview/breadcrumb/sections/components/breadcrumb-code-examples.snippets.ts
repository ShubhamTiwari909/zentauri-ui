import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { BreadcrumbScenario } from "./breadcrumb-code-examples.types";
import type { BreadcrumbAppearance } from "@zentauri-ui/zentauri-components/ui/breadcrumb";

export function breadcrumbSnippet(scenario: BreadcrumbScenario): string {
  if (scenario === "dots") {
    return `${variantLeadComment("scenario · dots separators")}<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>·</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>API</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
  }
  if (scenario === "smallSeparator") {
    return `${variantLeadComment("scenario · smallSeparator (size sm)")}<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator size="sm" />
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
  }
  return `${variantLeadComment("scenario · default slash separators")}<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Library</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
}

export function breadcrumbSnippetForAppearance(appearance: BreadcrumbAppearance): string {
  return `${variantLeadComment("appearance · ${appearance}")}<Breadcrumb appearance="${appearance}">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Library</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;
}