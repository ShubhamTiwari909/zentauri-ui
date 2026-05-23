"use client";

import { useMemo, useState } from "react";

import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { Divider } from "@zentauri-ui/zentauri-components/ui/divider";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@zentauri-ui/zentauri-components/ui/tabs";
import { Heading, Text } from "@zentauri-ui/zentauri-components/ui/typography";

import {
  demoLandingContent,
  layoutRoutes,
  themeOptions,
  type DemoLayoutRoute,
  type DemoTheme,
} from "./landing-data";

type LandingPageProps = {
  route: DemoLayoutRoute;
};

type TemplateContext = {
  activeDescription: string;
  activeHighlight: string;
  activeIndex: number;
  activePanelItem: (typeof demoLandingContent.panelItems)[number];
  activeProgress: number;
  activeTag: string;
  activeTheme: DemoTheme;
  activeThemeSlug: string;
  firstTag: string;
  firstTheme: DemoTheme;
  nextRoute: DemoLayoutRoute;
  processSteps: Array<{ label: string; title: string; copy: string }>;
  proofCards: Array<{
    tag: string;
    highlight: string;
    item: (typeof demoLandingContent.panelItems)[number];
  }>;
  route: DemoLayoutRoute;
  setActiveTag: (value: string) => void;
  setActiveThemeSlug: (value: string) => void;
};

function TagTabs({
  activeTag,
  activeTheme,
  firstTag,
  setActiveTag,
}: Pick<TemplateContext, "activeTag" | "activeTheme" | "firstTag" | "setActiveTag">) {
  return (
    <Tabs
      value={activeTag}
      defaultValue={firstTag}
      onValueChange={setActiveTag}
      appearance={activeTheme.button}
      variant="pills"
      size="sm"
      className="max-w-full overflow-x-auto"
    >
      <TabsList>
        {demoLandingContent.tags.map((tag) => (
          <TabsTrigger key={tag} value={tag} disabled={false} className="">
            {tag}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function ThemeTabs({
  activeTheme,
  activeThemeSlug,
  firstTheme,
  setActiveThemeSlug,
}: Pick<
  TemplateContext,
  "activeTheme" | "activeThemeSlug" | "firstTheme" | "setActiveThemeSlug"
>) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <Text size="sm" tone="muted">
        Theme
      </Text>
      <Tabs
        value={activeThemeSlug}
        defaultValue={firstTheme.slug}
        onValueChange={setActiveThemeSlug}
        appearance={activeTheme.button}
        variant="pills"
        size="sm"
        className="max-w-full overflow-x-auto"
      >
        <TabsList>
          {themeOptions.map((theme) => (
            <TabsTrigger
              key={theme.slug}
              value={theme.slug}
              disabled={false}
              className=""
            >
              {theme.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

function CtaRow({
  activeTheme,
  nextRoute,
  centered = false,
}: Pick<TemplateContext, "activeTheme" | "nextRoute"> & { centered?: boolean }) {
  return (
    <div
      className={
        centered
          ? "grid w-full max-w-lg gap-3 sm:flex sm:flex-wrap sm:justify-center"
          : "grid gap-3 sm:flex sm:flex-wrap"
      }
    >
      <Button
        as="link"
        href="#preview"
        appearance={activeTheme.button}
        size="lg"
        className="w-full sm:w-auto"
      >
        {demoLandingContent.primaryCta}
      </Button>
      <Button
        as="link"
        href={`/demo/${nextRoute.slug}`}
        appearance="outline"
        size="lg"
        className="w-full sm:w-auto"
      >
        {demoLandingContent.secondaryCta}
      </Button>
    </div>
  );
}

function HeroCopy({
  activeDescription,
  activeTheme,
  activeTag,
  firstTag,
  route,
  setActiveTag,
  centered = false,
  compact = false,
}: Pick<
  TemplateContext,
  | "activeDescription"
  | "activeTag"
  | "activeTheme"
  | "firstTag"
  | "route"
  | "setActiveTag"
> & {
  centered?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto flex max-w-5xl flex-col items-center gap-7 text-center" : "flex flex-col gap-7"}>
      <div
        className={
          centered
            ? "flex min-w-0 flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
            : "flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:flex-wrap"
        }
      >
        <Badge appearance={activeTheme.button} size="lg">
          {route.label}
        </Badge>
        <TagTabs
          activeTag={activeTag}
          activeTheme={activeTheme}
          firstTag={firstTag}
          setActiveTag={setActiveTag}
        />
      </div>
      <div className={centered ? "mx-auto max-w-4xl space-y-5" : "space-y-5"}>
        <Heading
          level={1}
          displayLevel={1}
          className={
            centered
              ? "mx-auto max-w-5xl text-4xl sm:text-6xl lg:text-7xl"
              : compact
                ? "max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
                : "max-w-4xl text-4xl sm:text-5xl lg:text-7xl"
          }
        >
          {demoLandingContent.title}
        </Heading>
        <Text
          size="lg"
          tone="muted"
          className={centered ? "mx-auto max-w-3xl leading-7 sm:leading-8" : "max-w-2xl leading-7 sm:leading-8"}
        >
          {activeDescription}
        </Text>
      </div>
    </div>
  );
}

function OutcomeCard({
  activePanelItem,
  activeProgress,
  activeTag,
  activeTheme,
  themed = false,
  className = "w-full max-w-2xl",
}: Pick<
  TemplateContext,
  "activePanelItem" | "activeProgress" | "activeTag" | "activeTheme"
> & {
  themed?: boolean;
  className?: string;
}) {
  return (
    <Card
      appearance={themed ? activeTheme.accent : "outline"}
      rounded="lg"
      size="lg"
      className={className}
    >
      <CardBody className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Text size="sm" tone="muted">
            Outcome
          </Text>
          <Heading level={2} displayLevel={2}>
            {activePanelItem.value}
          </Heading>
        </div>
        <div className="space-y-3">
          <Text bold>
            {activeTag} focus: {demoLandingContent.metricLabel}
          </Text>
          <Progress
            value={activeProgress}
            appearance={activeTheme.button}
            size="lg"
            shape="pill"
            label={`${activeTag} ${demoLandingContent.metricLabel}`}
          />
        </div>
      </CardBody>
    </Card>
  );
}

function ProductPanel({
  activeHighlight,
  activeTag,
  activeTheme,
  rounded = "full",
  statMode = "grid",
  className = "w-full self-center",
}: Pick<TemplateContext, "activeHighlight" | "activeTag" | "activeTheme"> & {
  rounded?: "lg" | "full";
  statMode?: "grid" | "stack";
  className?: string;
}) {
  return (
    <Card
      id="preview"
      appearance={activeTheme.accent}
      rounded={rounded}
      size="lg"
      className={className}
    >
      <CardHeader className="">
        <CardTitle as="h2" className="" ref={undefined}>
          {demoLandingContent.panelTitle}: {activeTag}
        </CardTitle>
        <CardDescription className="" ref={undefined}>
          {activeHighlight}. {demoLandingContent.proof}
        </CardDescription>
      </CardHeader>
      <CardBody className="gap-4">
        <div
          className={
            statMode === "stack" ? "grid gap-3" : "grid gap-3 sm:grid-cols-3"
          }
        >
          {demoLandingContent.panelItems.map((item) => (
            <Card key={item.label} appearance="glass" rounded="lg" size="md">
              <CardBody className="">
                <Text size="sm" tone="muted">
                  {item.label}
                </Text>
                <Heading level={3} displayLevel={3}>
                  {item.value}
                </Heading>
              </CardBody>
            </Card>
          ))}
        </div>
        <Divider />
        <div className="grid gap-3">
          {demoLandingContent.highlights.map((highlight, index) => (
            <Card key={highlight} appearance="outline" rounded="lg" size="md">
              <CardBody className="grid grid-cols-[auto_1fr] items-center gap-3">
                <Badge appearance={activeTheme.button} shape="square">
                  0{index + 1}
                </Badge>
                <Text bold>{highlight}</Text>
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
      <CardFooter className="">
        <div className="flex flex-wrap gap-2">
          <Badge appearance="glass">Live workspace</Badge>
          <Badge appearance="outline">Built with Zentauri UI</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

function SplitTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-7xl content-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
      <div className="flex flex-col justify-center gap-8">
        <HeroCopy {...ctx} />
        <ThemeTabs {...ctx} />
        <CtaRow {...ctx} />
        <OutcomeCard {...ctx} />
      </div>
      <ProductPanel {...ctx} />
    </section>
  );
}

function DashboardTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-7xl content-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
      <ProductPanel {...ctx} rounded="lg" className="w-full self-center lg:order-first" />
      <div className="flex flex-col justify-center gap-8">
        <HeroCopy {...ctx} compact />
        <ThemeTabs {...ctx} />
        <CtaRow {...ctx} />
        <OutcomeCard {...ctx} />
      </div>
    </section>
  );
}

function CenteredTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-8 text-center sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <HeroCopy {...ctx} centered />
      <ThemeTabs {...ctx} />
      <CtaRow {...ctx} centered />
      <OutcomeCard {...ctx} className="mx-auto w-full max-w-3xl" />
      <ProductPanel {...ctx} className="mx-auto w-full max-w-5xl self-center" />
    </section>
  );
}

function SidebarTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-7xl content-start gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.56fr_1.44fr] lg:px-8 lg:py-16">
      <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
        <HeroCopy {...ctx} compact />
        <ThemeTabs {...ctx} />
        <CtaRow {...ctx} />
        <OutcomeCard {...ctx} className="w-full" />
      </aside>
      <div className="grid gap-4">
        <ProductPanel {...ctx} rounded="lg" />
        <div className="grid gap-4 sm:grid-cols-3">
          {ctx.proofCards.map((card) => (
            <Card key={card.tag} appearance="outline" rounded="lg" size="lg">
              <CardBody className="gap-3">
                <Badge appearance={ctx.activeTheme.button}>{card.tag}</Badge>
                <Text bold>{card.highlight}</Text>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-7xl content-center gap-4 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-4 lg:px-8 lg:py-16">
      <Card appearance="outline" rounded="lg" size="lg" className="lg:col-span-2 lg:row-span-2">
        <CardBody className="gap-7">
          <HeroCopy {...ctx} compact />
          <ThemeTabs {...ctx} />
          <CtaRow {...ctx} />
        </CardBody>
      </Card>
      <ProductPanel {...ctx} rounded="lg" className="w-full lg:col-span-2 lg:row-span-3" />
      <OutcomeCard {...ctx} themed className="w-full lg:col-span-2" />
      {ctx.proofCards.slice(0, 2).map((card) => (
        <Card key={card.tag} appearance={ctx.activeTheme.accent} rounded="lg" size="lg">
          <CardBody className="gap-3">
            <Badge appearance="glass">{card.tag}</Badge>
            <Heading level={3} displayLevel={3}>
              {card.item.value}
            </Heading>
            <Text tone="muted">{card.highlight}</Text>
          </CardBody>
        </Card>
      ))}
    </section>
  );
}

function MinimalTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col justify-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <HeroCopy {...ctx} compact />
      <div className="grid gap-6 border-y border-white/10 py-6">
        <ThemeTabs {...ctx} />
        <TagTabs {...ctx} />
      </div>
      <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <OutcomeCard {...ctx} className="w-full" />
        <ProductPanel {...ctx} rounded="lg" statMode="stack" />
      </div>
    </section>
  );
}

function TerminalTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-7xl content-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-16">
      <ProductPanel {...ctx} rounded="lg" className="w-full self-center lg:order-first" />
      <div className="flex flex-col justify-center gap-6">
        <Card appearance="outline" rounded="lg" size="lg">
          <CardBody className="gap-6">
            <Badge appearance={ctx.activeTheme.button}>Command Center</Badge>
            <HeroCopy {...ctx} compact />
            <ThemeTabs {...ctx} />
            <CtaRow {...ctx} />
          </CardBody>
        </Card>
        <OutcomeCard {...ctx} themed />
      </div>
    </section>
  );
}

function PricingTemplate(ctx: TemplateContext) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-6xl content-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
      <div className="flex flex-col justify-center gap-7">
        <HeroCopy {...ctx} compact />
        <ThemeTabs {...ctx} />
        <CtaRow {...ctx} />
        <ProductPanel {...ctx} rounded="lg" statMode="stack" />
      </div>
      <Card appearance={ctx.activeTheme.accent} rounded="lg" size="lg" className="w-full self-center">
        <CardHeader className="">
          <Badge appearance="glass">Preview plan</Badge>
          <CardTitle as="h2" className="" ref={undefined}>
            {ctx.activePanelItem.value} outcome
          </CardTitle>
          <CardDescription className="" ref={undefined}>
            {ctx.activeTag} focused landing system with theme switching.
          </CardDescription>
        </CardHeader>
        <CardBody className="gap-5">
          <Progress
            value={ctx.activeProgress}
            appearance={ctx.activeTheme.button}
            size="lg"
            shape="pill"
            label={demoLandingContent.metricLabel}
          />
          {ctx.proofCards.map((card) => (
            <Card key={card.tag} appearance="glass" rounded="lg" size="md">
              <CardBody className="grid grid-cols-[auto_1fr] items-center gap-3">
                <Badge appearance={ctx.activeTheme.button} shape="square">
                  {card.item.value}
                </Badge>
                <Text bold>{card.highlight}</Text>
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

function FirstViewport(ctx: TemplateContext) {
  switch (ctx.route.layout) {
    case "dashboard":
      return <DashboardTemplate {...ctx} />;
    case "centered":
      return <CenteredTemplate {...ctx} />;
    case "sidebar":
      return <SidebarTemplate {...ctx} />;
    case "bento":
      return <BentoTemplate {...ctx} />;
    case "minimal":
      return <MinimalTemplate {...ctx} />;
    case "terminal":
      return <TerminalTemplate {...ctx} />;
    case "pricing":
      return <PricingTemplate {...ctx} />;
    case "split":
    default:
      return <SplitTemplate {...ctx} />;
  }
}

export function DemoLandingPage({ route }: LandingPageProps) {
  const firstTag = demoLandingContent.tags[0] ?? demoLandingContent.eyebrow;
  const firstTheme = themeOptions[0]!;
  const [activeTag, setActiveTag] = useState(firstTag);
  const [activeThemeSlug, setActiveThemeSlug] = useState(firstTheme.slug);
  const activeTheme =
    themeOptions.find((theme) => theme.slug === activeThemeSlug) ?? firstTheme;
  const nextRoute =
    layoutRoutes.find((layoutRoute) => layoutRoute.slug !== route.slug) ??
    layoutRoutes[0]!;
  const activeIndex = Math.max(
    demoLandingContent.tags.findIndex((tag) => tag === activeTag),
    0,
  );
  const activeHighlight =
    demoLandingContent.highlights[activeIndex] ??
    demoLandingContent.highlights[0]!;
  const activePanelItem =
    demoLandingContent.panelItems[activeIndex] ??
    demoLandingContent.panelItems[0]!;
  const activeProgress = Math.min(
    99,
    demoLandingContent.progress + activeIndex * 5,
  );
  const proofCards = demoLandingContent.tags.map((tag, index) => ({
    tag,
    highlight: demoLandingContent.highlights[index] ?? activeHighlight,
    item: demoLandingContent.panelItems[index] ?? activePanelItem,
  }));
  const processSteps = [
    {
      label: "Map",
      title: `Unify ${demoLandingContent.tags[0]?.toLowerCase() ?? "signals"}`,
      copy: demoLandingContent.highlights[0] ?? demoLandingContent.description,
    },
    {
      label: "Prioritize",
      title: `Focus on ${
        demoLandingContent.tags[1]?.toLowerCase() ?? "the next move"
      }`,
      copy: demoLandingContent.highlights[1] ?? demoLandingContent.proof,
    },
    {
      label: "Ship",
      title: `Prove ${
        demoLandingContent.tags[2]?.toLowerCase() ?? "the outcome"
      }`,
      copy: demoLandingContent.highlights[2] ?? demoLandingContent.metricLabel,
    },
  ];
  const activeDescription = useMemo(
    () =>
      `${demoLandingContent.description} The ${activeTag.toLowerCase()} view emphasizes ${activeHighlight.toLowerCase()}.`,
    [activeHighlight, activeTag],
  );
  const ctx = {
    activeDescription,
    activeHighlight,
    activeIndex,
    activePanelItem,
    activeProgress,
    activeTag,
    activeTheme,
    activeThemeSlug,
    firstTag,
    firstTheme,
    nextRoute,
    processSteps,
    proofCards,
    route,
    setActiveTag,
    setActiveThemeSlug,
  } satisfies TemplateContext;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FirstViewport {...ctx} />
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card appearance="outline" rounded="lg" size="lg">
            <CardHeader className="">
              <CardTitle as="h2" className="" ref={undefined}>
                Built for the moments between plan and proof.
              </CardTitle>
              <CardDescription className="" ref={undefined}>
                {demoLandingContent.proof}
              </CardDescription>
            </CardHeader>
            <CardBody className="gap-4">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <Badge appearance={activeTheme.button} size="lg">
                  {demoLandingContent.metric}
                </Badge>
                <Text bold>{demoLandingContent.metricLabel}</Text>
                <Progress
                  value={demoLandingContent.progress}
                  appearance={activeTheme.button}
                  size="md"
                  shape="pill"
                  label={demoLandingContent.metricLabel}
                />
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proofCards.map((card) => (
              <Card
                key={card.tag}
                appearance={activeTheme.accent}
                rounded="lg"
                size="lg"
              >
                <CardBody className="gap-4">
                  <Badge appearance="glass">{card.tag}</Badge>
                  <CardTitle as="h3" className="" ref={undefined}>
                    {card.item.value}
                  </CardTitle>
                  <Text tone="muted">{card.highlight}</Text>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <Badge appearance="outline" size="lg">
            Workflow
          </Badge>
          <Heading level={2} displayLevel={2} className="max-w-3xl">
            From first signal to confident action.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl leading-7 sm:leading-8">
            A simple operating rhythm keeps the page useful after the first impression.
          </Text>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Card
              key={step.label}
              appearance={index === activeIndex ? activeTheme.accent : "outline"}
              rounded="lg"
              size="lg"
            >
              <CardHeader className="">
                <Badge appearance={activeTheme.button} shape="square">
                  0{index + 1}
                </Badge>
                <CardTitle as="h3" className="" ref={undefined}>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardBody className="">
                <Text tone="muted">{step.copy}</Text>
              </CardBody>
              <CardFooter className="">
                <Badge appearance="ghost">{step.label}</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
