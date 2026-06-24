import { Dashboard } from "@/components/dashboard/sub-components/dashboard";
import { ThemeProvider } from "@/components/dashboard/theme/theme-context";
import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: "Zentauri Analytics Dashboard",
    description:
      "A themeable analytics dashboard built entirely with Zentauri UI components. Switch themes live and copy the source.",
  };
  return metadata;
}

export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Dashboard />
      </ToastProvider>
    </ThemeProvider>
  );
}
