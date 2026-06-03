import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import { sidebarAnimationsData } from "@/components/sidebar/sidebar-data";
import { previewSeoMetadataBase } from "@/lib/preview-seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: previewSeoMetadataBase,
  title: {
    default: "Preview",
    template: "%s · Zentauri UI Preview",
  },
  description:
    "Interactive previews and documentation for Zentauri UI animations, React components, hooks, and charts.",
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

export default function PreviewAnimationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarLayout sideBarContent={sidebarAnimationsData}>
      {children}
    </SidebarLayout>
  );
}
