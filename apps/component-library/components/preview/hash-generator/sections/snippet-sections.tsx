"use client";

import { Section } from "@/components/common/Section";
import CodeHighlight from "@/components/CodeHighlight";
import { useHash } from "@zentauri-ui/zentauri-components/hooks/useHash";
import { useState } from "react";

import { HashGeneratorPlayground } from "./components/playground";

const HOOK_EXAMPLE_SOURCE = `import { useHash } from "@zentauri-ui/zentauri-components/hooks/useHash";

function HashDemo() {
  const { hash, isHashing } = useHash(input, "sha256");
  // ...render hash result
}`;

function HookExample() {
  const [input, setInput] = useState("");
  const { hash, isHashing, error } = useHash(input, "sha256");

  return (
    <div className="mt-10 space-y-4">
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
        You can also use the <code className="text-sm">useHash</code> hook
        directly — ideal for custom UIs or server-rendered forms where you only
        need the hashing logic.
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <CodeHighlight codeString={HOOK_EXAMPLE_SOURCE} language="tsx" />
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 p-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          className="mb-3 w-full rounded-lg border border-white/15 bg-slate-900/80 p-3 text-sm text-white outline-none focus:border-cyan-500/50"
          placeholder="Enter text to hash…"
          aria-label="Input text to hash using SHA-256"
        />
        {error ? (
          <p className="text-sm text-red-400">Error: {error.message}</p>
        ) : (
          <p className="text-sm text-slate-400">
            Hash:{" "}
            {isHashing ? (
              <span className="text-slate-500">computing…</span>
            ) : (
              <span className="break-all font-mono text-cyan-200">
                {hash || "—"}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export function HashGeneratorCodeExamplesSection() {
  return (
    <>
      <Section>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Hash generator variants playground
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Pick an algorithm to preview the hash generator component live. Toggle
          Show output / Show code and the snippet updates to match the selected
          variant.
        </p>
        <HashGeneratorPlayground />
      </Section>
      <Section>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Using the useHash hook
        </h2>
        <HookExample />
      </Section>
    </>
  );
}
