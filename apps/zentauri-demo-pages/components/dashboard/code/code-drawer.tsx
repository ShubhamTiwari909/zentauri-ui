"use client";

import { FiCode } from "react-icons/fi";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";
import { codeSnippets } from "@/components/dashboard/lib/code-snippets";
import { CodeHighlight } from "./code-highlight";

export function CodeDrawer() {
  return (
    <Drawer>
      <DrawerTrigger
        appearance="default"
        className="inline-flex items-center gap-2 text-white"
      >
        <FiCode aria-hidden />
        View code
      </DrawerTrigger>
      <DrawerContent
        side="right"
        size="xl"
        appearance="default"
        className="border-l border-white/10 bg-slate-950 text-slate-100"
      >
        <DrawerClose className="text-slate-200 hover:bg-white/10" />
        <DrawerHeader>
          <DrawerTitle className="text-slate-50">
            Build this dashboard
          </DrawerTitle>
          <p className="text-sm text-slate-400">
            Copy these complete files into a fresh Next.js + Tailwind v4 app to
            recreate the dashboard.
          </p>
        </DrawerHeader>
        <DrawerBody className="space-y-6 overflow-y-auto pr-1 text-slate-100">
          {codeSnippets.map((snippet) => (
            <article key={snippet.id} className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {snippet.title}
                </h3>
                <p className="text-xs text-slate-400">{snippet.description}</p>
              </div>
              <CodeHighlight
                codeString={snippet.code}
                language={snippet.lang ?? "typescript"}
              />
            </article>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
