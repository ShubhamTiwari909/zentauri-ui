import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import { sidebarTypographyData } from "@/components/sidebar/sidebar-data";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout sideBarContent={sidebarTypographyData}>{children}</SidebarLayout>;
}
