import React from "react";
import { SiteFooter } from "./components/common/site-footer";
import { SiteHeader } from "./components/common/site-header";
import "./styles.css";

export const metadata = {
  description: "A blog powered by Payload CMS and Next.js.",
  title: "Zentauri Blogs",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" data-theme="dark">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
