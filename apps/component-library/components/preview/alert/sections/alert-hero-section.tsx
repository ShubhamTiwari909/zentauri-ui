import { Alert, AlertDefaultIcon, AlertDescription, AlertIcon, AlertTitle } from "@zentauri-ui/zentauri-components/ui/alert";

export function AlertHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Feedback
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Alerts for status and system messages.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Semantic appearances, optional dismiss controls, and motion presets
            tuned for inline page messaging.
          </p>
        </div>
      </div>

      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Alert appearance="info" animation="fade">
          <AlertIcon>
            <AlertDefaultIcon appearance="info" />
          </AlertIcon>
          <div>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              Your workspace will refresh after you save changes.
            </AlertDescription>
          </div>
        </Alert>
        <Alert appearance="success" animation="slide-down" size="sm">
          <AlertIcon>
            <AlertDefaultIcon appearance="success" />
          </AlertIcon>
          <div>
            <AlertTitle>Deployed</AlertTitle>
            <AlertDescription>Build 482 is live in production.</AlertDescription>
          </div>
        </Alert>
      </div>
    </section>
  );
}
