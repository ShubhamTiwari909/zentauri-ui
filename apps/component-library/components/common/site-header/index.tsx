"use client";

import {
  SiteHeader as SharedSiteHeader,
  type SiteHeaderProps as SharedSiteHeaderProps,
} from "@zentauri-ui/shared/site-header";

import { SiteSearchOpenButton } from "../site-search/site-search-open-button";

export type SiteHeaderProps = Omit<
  SharedSiteHeaderProps,
  "SearchOpenButton" | "site"
>;

export function SiteHeader(props: SiteHeaderProps) {
  return (
    <SharedSiteHeader
      site="library"
      SearchOpenButton={SiteSearchOpenButton}
      {...props}
    />
  );
}

SiteHeader.displayName = "SiteHeader";
