"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import { FiExternalLink } from "react-icons/fi";

import { MotionReveal } from "./motion-reveal";
import { SectionShell } from "./section-shell";
import { FiSun, FiMoon } from "react-icons/fi";


function AuthPatternDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [ok, setOk] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setOk(false);
    if (!email.includes("@")) {
      setError("Use a valid email for this demo.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError(undefined);
    setOk(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Sign-in demo"
    >
      <Input
        className=""
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@team.dev"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        appearance="info"
        size="md"
        errorMessage={error && !email.includes("@") ? error : undefined}
      />
      <Input
        className=""
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        appearance="info"
        size="md"
        errorMessage={
          error && email.includes("@") && password.length < 8 ? error : undefined
        }
      />
      {ok ? (
        <p className="text-xs text-emerald-300" role="status">
          Demo passed validation.
        </p>
      ) : null}
      <Button className="" appearance="sky" size="sm" type="submit">
        Submit demo
      </Button>
    </form>
  );
}

const patternCardClass =
  "flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5 sm:p-6";

export function HomePatternDemos() {
  const [surface, setSurface] = useState<"dark" | "light">("dark");

  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Composition"
        title="Patterns that ship together"
        lead="Inputs, overlays, and feedback primitives combine without custom glue code."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className={patternCardClass}>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Auth-style form</h3>
              <p className="text-sm text-slate-400">
                Controlled fields with inline validation messaging.
              </p>
            </div>
            <AuthPatternDemo />
            <Link
              href="/preview/components/inputs"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
            >
              Input docs
              <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className={patternCardClass}>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">Dashboard strip</h3>
              <p className="text-sm text-slate-400">
                Badge + progress readout for health or rollout metrics.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-200">
                  API success rate
                </span>
                <Badge appearance="emerald" size="sm">
                  Live
                </Badge>
              </div>
              <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
                99.2%
              </p>
              <Progress
                className="mt-3"
                value={92}
                appearance="sky"
                size="sm"
                aria-label="Rollout progress"
              />
            </div>
            <Link
              href="/preview/components/progress"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
            >
              Progress docs
              <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className={patternCardClass}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Scoped surface
              </p>
              <div className="inline-flex rounded-lg border border-white/10 p-0.5">
                <button
                  type="button"
                  onClick={() => setSurface("light")}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    surface === "light"
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  aria-pressed={surface === "light"}
                >
                  <FiSun className="h-3.5 w-3.5" aria-hidden />
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setSurface("dark")}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    surface === "dark"
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  aria-pressed={surface === "dark"}
                >
                  <FiMoon className="h-3.5 w-3.5" aria-hidden />
                  Dark
                </button>
              </div>
            </div>
            <div
              className={`rounded-2xl border p-5 transition-colors ${
                surface === "light"
                  ? "border-slate-200 bg-slate-100 text-slate-900 shadow-inner"
                  : "border-white/10 bg-slate-950 text-slate-100 shadow-lg shadow-slate-950/40"
              }`}
            >
              <p className="text-sm font-medium">Preview panel</p>
              <p className="mt-2 text-sm opacity-80">
                This toggle only affects this box—your app controls global theme
                via Tailwind <code className="rounded bg-black/10 px-1 text-xs">dark:</code>{" "}
                variants or layout-level classes.
              </p>
              <div className="mt-4">
                <Button
                  className={
                    surface === "light" ? "shadow-md shadow-slate-900/10" : ""
                  }
                  appearance="sky"
                  size="sm"
                  type="button"
                >
                  Primary in context
                </Button>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              See{" "}
              <Link
                href="/preview/installation"
                className="font-medium text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
              >
                Installation
              </Link>{" "}
              for globals, <code className="rounded bg-white/10 px-1 text-xs">@source</code>{" "}
              scanning, and theme overrides.
            </p>
          </div>
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
