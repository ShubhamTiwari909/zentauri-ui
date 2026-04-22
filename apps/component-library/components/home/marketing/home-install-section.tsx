"use client";

import { useState } from "react";

import CodeHighlight from "@/components/CodeHighlight";
import TabsListComponent from "@/components/preview/installation/tabs-list";
import {
  CLI_INIT_COMMANDS,
  INSTALL_COMMANDS,
  type PackageManager,
} from "@/lib/home-install-commands";
import { Tabs } from "@zentauri-ui/zentauri-components/ui/tabs";
import { TabsContentAnimated } from "@zentauri-ui/zentauri-components/ui/tabs/animated";

import { MotionReveal } from "./motion-reveal";
import { SectionShell } from "./section-shell";

export function HomeInstallSection() {
  const [installPm, setInstallPm] = useState<PackageManager>("npm");
  const [cliPm, setCliPm] = useState<PackageManager>("npm");

  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Install"
        title="Add the package in one minute"
        lead="Pick your package manager, copy the command, then follow the full Tailwind v4 setup on the installation page."
      >
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Tabs
              value={installPm}
              defaultValue="npm"
              onValueChange={(v: string) => setInstallPm(v as PackageManager)}
              className="w-full"
              variant="pills"
              size="md"
              appearance="sky"
            >
              <TabsListComponent />
              <TabsContentAnimated value="npm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.npm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="pnpm" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.pnpm}
                  language="bash"
                />
              </TabsContentAnimated>
              <TabsContentAnimated value="yarn" animation="fade" className="m-0">
                <CodeHighlight
                  codeString={INSTALL_COMMANDS.yarn}
                  language="bash"
                />
              </TabsContentAnimated>
            </Tabs>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">CLI (optional)</h3>
            <p className="mt-1 text-sm text-slate-400">
              Scaffold or add components into your repo with the published CLI.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <Tabs
                value={cliPm}
                defaultValue="npm"
                onValueChange={(v: string) => setCliPm(v as PackageManager)}
                className="w-full"
                variant="pills"
                size="md"
                appearance="sky"
              >
                <TabsListComponent />
                <TabsContentAnimated value="npm" animation="fade" className="m-0">
                  <CodeHighlight
                    codeString={CLI_INIT_COMMANDS.npm}
                    language="bash"
                  />
                </TabsContentAnimated>
                <TabsContentAnimated
                  value="pnpm"
                  animation="fade"
                  className="m-0"
                >
                  <CodeHighlight
                    codeString={CLI_INIT_COMMANDS.pnpm}
                    language="bash"
                  />
                </TabsContentAnimated>
                <TabsContentAnimated
                  value="yarn"
                  animation="fade"
                  className="m-0"
                >
                  <CodeHighlight
                    codeString={CLI_INIT_COMMANDS.yarn}
                    language="bash"
                  />
                </TabsContentAnimated>
              </Tabs>
            </div>
          </div>
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
