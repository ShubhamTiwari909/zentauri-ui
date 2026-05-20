import { Section } from "@/components/common/Section";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

export function InputsStatesSection() {
  return (
    <Section>
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
        States
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Disabled and read-only
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <span className="text-xs text-slate-800 dark:text-slate-400">
            Disabled
          </span>
          <Input
            disabled
            defaultValue="Cannot edit"
            aria-label="Disabled example"
          />
        </div>
        <div className="grid gap-2">
          <span className="text-xs text-slate-800 dark:text-slate-400">
            Read only
          </span>
          <Input
            readOnly
            defaultValue="account@corp.com"
            aria-label="Read only example"
          />
        </div>
      </div>
    </Section>
  );
}
