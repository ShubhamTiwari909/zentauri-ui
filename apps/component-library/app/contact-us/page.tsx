import type { Metadata } from "next";

import { ContactForm } from "./contact-form";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SiteHeader } from "@/components/common/site-header";

export const metadata: Metadata = {
  title: "Contact Us | Zentauri UI",
  description: "Contact the Zentauri UI team.",
};

export default function ContactUsPage() {
  return (
    <PreviewPageShell className="p-0">
      <SiteHeader />
      <main className="min-h-dvh bg-slate-950 text-slate-50">
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:px-8 lg:py-24">
          <div className="flex flex-col justify-center gap-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
              Contact us
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-white md:text-5xl">
              Tell us what you are building with Zentauri.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              Send product questions, integration requests, or feedback.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
    </PreviewPageShell>
  );
}
