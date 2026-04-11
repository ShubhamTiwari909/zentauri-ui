import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}
