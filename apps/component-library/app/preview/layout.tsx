import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview - Zentauri UI",
  description: "Preview components from Zentauri UI",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
