"use client";
import { InputAnimated } from "@zentauri-ui/zentauri-components/ui/inputs/animated";
import { useState } from "react";

export function InputsControlledSection() {
  const [value, setValue] = useState("");

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
        Controlled
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Value driven by React state
      </h2>
      <p className="mt-3 text-sm text-slate-400">
        Current value:{" "}
        <code className="rounded bg-slate-950/80 px-2 py-0.5 text-cyan-200">
          {value || "(empty)"}
        </code>
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {
          'The same state is wired to the controlled example in "Input variants examples" below.'
        }
      </p>
      <div className="mt-4 max-w-md">
        <InputAnimated
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type to update state"
          aria-label="Controlled input demo"
          animation="press"
        />
      </div>
    </section>
  );
}
