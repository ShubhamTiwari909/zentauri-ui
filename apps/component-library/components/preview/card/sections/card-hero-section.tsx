import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui";
import { Button } from "@zentauri-ui/zentauri-components/ui";

export function CardHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Layout
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cards for grouped content and actions.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Composable header, body, and footer slots with glass or elevated
            treatments and motion presets.
          </p>
        </div>
      </div>

      <Card appearance="glass" animation="lift" rounded="lg" className="max-w-md">
        <CardHeader>
          <CardTitle>Usage this month</CardTitle>
          <CardDescription>Resets on the first of next month.</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-2xl font-semibold text-white">72%</p>
          <p className="text-sm text-slate-400">of included API calls consumed</p>
        </CardBody>
        <CardFooter className="flex gap-2">
          <Button appearance="outline" size="sm" animation="none">
            Details
          </Button>
          <Button appearance="sky" size="sm" animation="lift">
            Upgrade
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
