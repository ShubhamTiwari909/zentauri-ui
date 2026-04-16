import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/common/site-footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Zentauri UI",
  description: "A component library playground for React buttons and variants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-dvh flex-col bg-slate-950 text-slate-50">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
