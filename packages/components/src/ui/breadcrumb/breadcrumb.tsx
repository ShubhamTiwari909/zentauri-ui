"use client";

import type { Ref } from "react";

import { cn } from "../../lib/utils";

import type {
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./types";
import {
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbNavVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
} from "./variants";

export function Breadcrumb({
  className,
  ref,
  "aria-label": ariaLabel = "Breadcrumb",
  ...rest
}: BreadcrumbProps) {
  return (
    <nav
      ref={ref}
      data-slot="breadcrumb"
      aria-label={ariaLabel}
      className={cn(className)}
      {...rest}
    />
  );
}

Breadcrumb.displayName = "Breadcrumb";

export function BreadcrumbList({
  className,
  ref,
  ...rest
}: BreadcrumbListProps & { ref?: Ref<HTMLOListElement> }) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(breadcrumbListVariants(), className)}
      {...rest}
    />
  );
}

BreadcrumbList.displayName = "BreadcrumbList";

export function BreadcrumbItem({
  className,
  ref,
  ...rest
}: BreadcrumbItemProps & { ref?: Ref<HTMLLIElement> }) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn(breadcrumbItemVariants(), className)}
      {...rest}
    />
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

export function BreadcrumbLink({
  className,
  ref,
  appearance = "default",
  ...rest
}: BreadcrumbLinkProps) {
  return (
    <a
      ref={ref}
      data-slot="breadcrumb-link"
      className={cn(breadcrumbLinkVariants(), breadcrumbNavVariants({ appearance }), className)}
      {...rest}
    />
  );
}

BreadcrumbLink.displayName = "BreadcrumbLink";

export function BreadcrumbPage({
  className,
  ref,
  appearance = "default",
  ...rest
}: BreadcrumbPageProps) {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn(breadcrumbPageVariants(), breadcrumbNavVariants({ appearance }), className)}
      {...rest}
    />
  );
}

BreadcrumbPage.displayName = "BreadcrumbPage";

export function BreadcrumbSeparator({
  className,
  size,
  children = "/",
  ref,
  ...rest
}: BreadcrumbSeparatorProps & { ref?: Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-separator"
      aria-hidden
      role="presentation"
      className={cn(breadcrumbSeparatorVariants({ size }), className)}
      {...rest}
    >
      {children}
    </span>
  );
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
