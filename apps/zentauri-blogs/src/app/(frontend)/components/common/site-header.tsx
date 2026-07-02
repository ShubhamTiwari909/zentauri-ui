import {
  SiteHeader as SharedSiteHeader,
  type SiteHeaderProps as SharedSiteHeaderProps,
} from "@zentauri-ui/shared/site-header";

export type SiteHeaderProps = Omit<SharedSiteHeaderProps, "site">;

export function SiteHeader(props: SiteHeaderProps) {
  return <SharedSiteHeader site="blogs" {...props} />;
}

SiteHeader.displayName = "SiteHeader";
