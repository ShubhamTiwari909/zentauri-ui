import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import { sidebarComponentsData } from "@/components/sidebar/sidebar-data";
import { previewSeoMetadataBase } from "@/lib/preview-seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: previewSeoMetadataBase,
  title: {
    default: "Preview",
    template: "%s · Zentauri UI Preview",
  },
  description:
    "Interactive previews and documentation for Zentauri UI—React components with Tailwind CSS.",
  applicationName: "Zentauri UI",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Zentauri UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout sideBarContent={sidebarComponentsData}>{children}</SidebarLayout>;
}
