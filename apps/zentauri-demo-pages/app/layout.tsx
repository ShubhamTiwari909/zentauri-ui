import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";
import { SiteSearchProvider } from "@/components/common/site-search/site-search-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zentauri Demo Pages",
  description: "Landing page demos built with Zentauri UI components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full">
        <SiteSearchProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SiteSearchProvider>
      </body>
    </html>
  );
}
