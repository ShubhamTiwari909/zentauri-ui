import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

describe("Breadcrumb", () => {
  it("should expose displayName on primitives", () => {
    expect(Breadcrumb.displayName).toBe("Breadcrumb");
    expect(BreadcrumbList.displayName).toBe("BreadcrumbList");
    expect(BreadcrumbItem.displayName).toBe("BreadcrumbItem");
    expect(BreadcrumbLink.displayName).toBe("BreadcrumbLink");
    expect(BreadcrumbPage.displayName).toBe("BreadcrumbPage");
    expect(BreadcrumbSeparator.displayName).toBe("BreadcrumbSeparator");
  });

  it("should stamp data-slot on breadcrumb root", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(document.querySelector('[data-slot="breadcrumb"]')).toBeTruthy();
  });

  it("should mark current page with aria-current", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByText("Settings")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should forward ref on Breadcrumb", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Breadcrumb ref={ref}>
        <BreadcrumbList />
      </Breadcrumb>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("breadcrumb");
  });
});
