import React from "react";
import "./styles.css";

export const metadata = {
  description: "A blog powered by Payload CMS and Next.js.",
  title: "Zentauri Blogs",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
