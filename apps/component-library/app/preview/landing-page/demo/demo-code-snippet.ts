export const demoCodeSnippet = `
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiChevronRight,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiGlobe,
  FiGrid,
  FiLayers,
  FiLinkedin,
  FiLock,
  FiMenu,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiSlack,
  FiStar,
  FiTwitter,
  FiX,
  FiZap,
} from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@zentauri-ui/zentauri-components/ui/alert";
import {
  Avatar,
  AvatarFallback,
} from "@zentauri-ui/zentauri-components/ui/avatar";
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
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@zentauri-ui/zentauri-components/ui/empty-state";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@zentauri-ui/zentauri-components/ui/modal";
import { Pagination } from "@zentauri-ui/zentauri-components/ui/pagination";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";
import { Skeleton } from "@zentauri-ui/zentauri-components/ui/skeleton";
import { Spinner } from "@zentauri-ui/zentauri-components/ui/spinner/animated";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@zentauri-ui/zentauri-components/ui/stepper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zentauri-ui/zentauri-components/ui/tabs";
import { toast } from "@zentauri-ui/zentauri-components/ui/toast";
import { Toggle } from "@zentauri-ui/zentauri-components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zentauri-ui/zentauri-components/ui/tooltip";

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const navItems = ["Home", "Features", "Pricing", "FAQ"];

const products = [
  { value: "command", label: "Command Center", icon: <FiGrid /> },
  { value: "vault", label: "Security Vault", icon: <FiShield /> },
  { value: "flows", label: "Automation Flows", icon: <FiZap /> },
];

const featureTabs = {
  Productivity: [
    [
      "AI work queues",
      "Route urgent work, summarize context, and assign ownership automatically.",
      FiCpu,
      true,
    ],
    [
      "Live dashboards",
      "Track pipeline health, SLA drift, and release readiness from one view.",
      FiBarChart2,
      false,
    ],
    [
      "Workflow templates",
      "Launch proven operating cadences for product, support, and revenue teams.",
      FiLayers,
      false,
    ],
  ],
  Security: [
    [
      "Zero-trust access",
      "Enforce least privilege, SCIM groups, and just-in-time workspace grants.",
      FiLock,
      false,
    ],
    [
      "Audit trails",
      "Search every configuration change with immutable logs and export-ready reports.",
      FiDatabase,
      true,
    ],
    [
      "Policy guardrails",
      "Block risky actions before they ship with approval rules and secure defaults.",
      FiShield,
      false,
    ],
  ],
  Integrations: [
    [
      "Developer APIs",
      "Sync events bi-directionally with typed webhooks and environment-aware tokens.",
      FiCode,
      false,
    ],
    [
      "Cloud sync",
      "Connect AWS, Vercel, GitHub, Slack, and data warehouses in minutes.",
      FiCloud,
      true,
    ],
    [
      "Global webhooks",
      "Fan out mission-critical events with retries, signatures, and replay tooling.",
      FiGlobe,
      false,
    ],
  ],
} as const;

const steps = [
  [
    "Create Account",
    "Invite your founding team, connect identity, and import core workspaces.",
  ],
  [
    "Configure Workspace",
    "Map approval paths, automation rules, and service ownership in one flow.",
  ],
  [
    "Go Live",
    "Launch with production telemetry, adoption tracking, and guided rollout checks.",
  ],
];

const metrics = [
  ["99.9%", "uptime", 99],
  ["50ms", "avg latency", 82],
  ["10M+", "requests/day", 91],
  ["150+", "countries", 76],
] as const;

const testimonials = [
  [
    "Maya Chen",
    "VP Operations",
    "Northstar",
    "Zentauri replaced four brittle dashboards and gave every stakeholder a live operating picture. Our incident reviews are shorter, calmer, and backed by actual context.",
  ],
  [
    "Jon Bell",
    "Head of Platform",
    "Orbit",
    "The onboarding felt almost too fast. We connected GitHub, Slack, and our warehouse before lunch, then had leadership using the executive view by the afternoon.",
  ],
  [
    "Amara Singh",
    "Security Lead",
    "Helio",
    "The access model is the reason we chose Zentauri. It gives engineering speed without asking security to babysit every release conversation.",
  ],
];

const pricing = [
  [
    "Free",
    0,
    0,
    "For early teams validating their operating model.",
    ["3 workspaces", "Basic dashboards", "Community support"],
  ],
  [
    "Pro",
    29,
    24,
    "For growing teams that need automation and shared accountability.",
    ["Unlimited workflows", "Advanced integrations", "Priority support"],
  ],
  [
    "Enterprise",
    99,
    82,
    "For organizations with governance, procurement, and scale requirements.",
    ["SAML and SCIM", "Dedicated success", "Custom data residency"],
  ],
] as const;

const faqs = [
  [
    "How quickly can we launch?",
    "Most teams launch a production workspace in under a week. Larger organizations usually phase rollout by department.",
  ],
  [
    "Do you support SSO?",
    "Yes. Enterprise plans include SAML, SCIM provisioning, domain capture, and granular workspace roles.",
  ],
  [
    "Can we bring historical data?",
    "Yes. Imports are available for CSV, warehouse tables, and selected partner tools through guided migration.",
  ],
  [
    "What integrations are included?",
    "GitHub, Slack, Vercel, Linear, HubSpot, Snowflake, BigQuery, Datadog, and custom webhooks are supported.",
  ],
  [
    "How is billing handled?",
    "You can bill monthly or annually. Annual plans include consolidated invoices and procurement support.",
  ],
  [
    "Is Zentauri compliant?",
    "Zentauri is designed for SOC 2-aligned controls, audit logs, encryption, and regional data policies.",
  ],
  [
    "Can product and support share one workspace?",
    "Yes. Shared workspaces are common, and permissions let teams collaborate without exposing restricted data.",
  ],
  [
    "What happens during an incident?",
    "Zentauri opens a live command view, assigns owners, captures decisions, and produces a review timeline automatically.",
  ],
];

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Card
      ref={ref}
      appearance="glass"
      rounded="lg"
      className="border-white/10 bg-white/6"
    >
      <CardBody>
        <p className="text-4xl font-semibold tracking-tight text-white">
          {metric[0]}
        </p>
        <p className="mt-1 text-sm text-slate-300">{metric[1]}</p>
        <div className="mt-5">
          <Progress
            value={inView ? metric[2] : 0}
            appearance="gradient-indigo"
            shape="pill"
            animated
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default function LandingPageDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [annual, setAnnual] = useState(true);
  const [modalTier, setModalTier] = useState<string | null>(null);
  const [modalError, setModalError] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");
  const [contactStep, setContactStep] = useState(1);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadingStats(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(([q, a]) =>
        \`\${q} \${a}\`.toLowerCase().includes(faqSearch.toLowerCase()),
      ),
    [faqSearch],
  );

  return (
    <>
      <main className="min-h-dvh overflow-hidden bg-[#020617] text-slate-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/75 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a
              href="#home"
              className="flex items-center gap-3 font-semibold"
              aria-label="Zentauri home"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-indigo-500 text-white shadow-lg shadow-indigo-500/30">
                Z
              </span>
              <span className="text-lg tracking-tight">Zentauri</span>
            </a>
            <nav
              className="hidden items-center gap-7 text-sm text-slate-300 lg:flex"
              aria-label="Primary navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={\`#\${item.toLowerCase()}\`}
                  className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {item}
                </a>
              ))}
              <Dropdown>
                <DropdownTrigger className="gap-2 border-0 bg-transparent px-0 text-slate-300 hover:text-white">
                  Products{" "}
                  <Badge
                    appearance="indigo"
                    shape="dot"
                    aria-label="New products"
                  />
                </DropdownTrigger>
                <DropdownContent className="w-56 border border-white/10 bg-slate-950/95 text-slate-100 shadow-2xl">
                  {products.map((item) => (
                    <DropdownItem
                      key={item.value}
                      value={item.value}
                      leftIcon={item.icon}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <Button appearance="ghost" as="link" href="#pricing">
                Sign in
              </Button>
              <Button appearance="indigo" as="link" href="#contact">
                Start free
              </Button>
            </div>
            <Drawer>
              <DrawerTrigger className="lg:hidden" aria-label="Open menu">
                <FiMenu />
              </DrawerTrigger>
              <DrawerContent
                side="left"
                appearance="glass"
                className="bg-slate-950"
              >
                <DrawerHeader>
                  <DrawerTitle>Zentauri</DrawerTitle>
                  <DrawerClose>
                    <FiX />
                  </DrawerClose>
                </DrawerHeader>
                <DrawerBody className="space-y-4">
                  {[...navItems, "Products"].map((item) => (
                    <a
                      key={item}
                      href={\`#\${item.toLowerCase()}\`}
                      className="block rounded-lg px-3 py-2 text-base text-slate-200 hover:bg-white/10"
                    >
                      {item}
                    </a>
                  ))}
                </DrawerBody>
                <DrawerFooter className="justify-start">
                  <Button appearance="indigo" as="link" href="#contact">
                    Start free
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </header>

        <section
          id="home"
          className="relative flex min-h-[calc(100dvh-4rem)] items-center border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-size-[42px_42px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.24),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.16),transparent_28%),linear-gradient(180deg,transparent,#020617_90%)]" />
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative mx-auto max-w-5xl text-center"
          >
            <motion.div variants={sectionReveal}>
              <Badge appearance="glass" size="lg">
                New v2.0 <FiArrowRight />
              </Badge>
            </motion.div>
            <motion.h1
              variants={sectionReveal}
              className="mt-7 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Operate every team from one intelligent control plane.
            </motion.h1>
            <motion.p
              variants={sectionReveal}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300"
            >
              Zentauri helps SaaS teams automate decisions, govern access, and
              turn scattered workflows into measurable operating systems.
            </motion.p>
            <motion.div
              variants={sectionReveal}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button appearance="indigo" size="xl" as="link" href="#pricing">
                Start free trial
              </Button>
              <Button appearance="outline" size="xl" as="link" href="#features">
                Explore platform
              </Button>
            </motion.div>
            <motion.div
              variants={sectionReveal}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              {[
                [
                  "Automation",
                  "Build resilient workflows without brittle scripts.",
                  FiZap,
                ],
                [
                  "Security",
                  "Govern access across every connected workspace.",
                  FiShield,
                ],
                [
                  "Insights",
                  "See adoption, risk, and velocity in real time.",
                  FiBarChart2,
                ],
              ].map(([label, copy, Icon]) => (
                <Tooltip key={label as string}>
                  <TooltipTrigger className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                    <Icon />
                    {label as string}
                  </TooltipTrigger>
                  <TooltipContent>{copy as string}</TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <Reveal className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Divider />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
                Trusted by 2,400+ teams
              </p>
              <div className="mt-5 overflow-hidden">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                  }}
                  className="flex w-max gap-10 text-xl font-semibold text-slate-400"
                >
                  {[
                    "Aperture",
                    "Northstar",
                    "Orbit",
                    "Helio",
                    "Pulse",
                    "Vector",
                    "Nova",
                    "Stride",
                  ]
                    .concat(["Aperture", "Northstar", "Orbit", "Helio"])
                    .map((logo, i) => (
                      <span key={\`\${logo}-\${i}\`}>{logo}</span>
                    ))}
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          id="features"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="max-w-2xl">
            <Badge appearance="indigo">Platform</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Everything your operating system needs.
            </h2>
          </div>
          <Tabs defaultValue="Productivity" className="mt-10">
            <TabsList className="w-full justify-start overflow-x-auto">
              {Object.keys(featureTabs).map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(featureTabs).map(([tab, cards]) => (
              <TabsContent key={tab} value={tab}>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-8 grid gap-5 md:grid-cols-3"
                >
                  {cards.map(([title, copy, Icon, popular]) => (
                    <motion.div
                      key={title}
                      variants={sectionReveal}
                      whileHover={{ y: -6 }}
                    >
                      <Card
                        appearance="glass"
                        rounded="lg"
                        className="h-full border-white/10"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Icon className="text-2xl text-indigo-300" />
                            {popular && (
                              <Badge appearance="indigo">Most Popular</Badge>
                            )}
                          </div>
                          <CardTitle>{title}</CardTitle>
                          <CardDescription>{copy}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Tooltip>
                            <TooltipTrigger className="inline-flex items-center gap-2 text-sm text-indigo-200">
                              Learn more <FiChevronRight />
                            </TooltipTrigger>
                            <TooltipContent>
                              Open the product brief for {title}.
                            </TooltipContent>
                          </Tooltip>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        <Reveal className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Launch in three disciplined steps.
          </h2>
          <Stepper
            className="mt-10 gap-4 max-md:flex-col"
            orientation="horizontal"
          >
            {steps.map(([title, copy], index) => (
              <StepperItem
                key={title}
                onClick={() => setActiveStep(index)}
                className="cursor-pointer max-md:border-b max-md:border-white/10 max-md:pb-4"
              >
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  className="flex gap-3 md:block"
                >
                  <StepperIndicator
                    appearance={activeStep === index ? "indigo" : "upcoming"}
                  />
                  <div>
                    <StepperTitle>{title}</StepperTitle>
                    <StepperDescription>{copy}</StepperDescription>
                  </div>
                </motion.div>
              </StepperItem>
            ))}
          </Stepper>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <Card
              appearance="glass"
              rounded="lg"
              className="mt-8 border-indigo-400/30"
            >
              <CardBody className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <Badge appearance="outline">Step {activeStep + 1}</Badge>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {steps[activeStep][0]}
                  </h3>
                  <p className="mt-3 text-slate-300">
                    {steps[activeStep][1]} Zentauri validates each dependency
                    before you invite the broader organization.
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
                  <div className="h-52 rounded-md bg-[linear-gradient(135deg,rgba(99,102,241,0.28),rgba(15,23,42,0.6)),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[100%_100%,24px_24px]" />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </Reveal>

        <Reveal className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Operational metrics that stay current.
            </h2>
            {loadingStats && <Spinner size="sm" aria-label="Loading metrics" />}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {loadingStats
              ? metrics.map((m) => (
                  <Skeleton key={m[1]} className="h-40 rounded-lg" />
                ))
              : metrics.map((m) => <MetricCard key={m[1]} metric={m} />)}
          </div>
        </Reveal>

        <Reveal className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Operators trust Zentauri when the work matters.
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map(([name, role, company, quote]) => (
              <Card key={name} appearance="glass" rounded="lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="relative">
                      <Avatar appearance="indigo">
                        <AvatarFallback>
                          {name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        appearance="emerald"
                        shape="dot"
                        className="absolute -bottom-0.5 -right-0.5"
                      />
                    </span>
                    <div>
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>{role}</CardDescription>
                    </div>
                    <Badge appearance="outline" className="ml-auto">
                      {company}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="mb-3 flex text-indigo-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} fill="currentColor" />
                    ))}
                  </div>
                  <Accordion type="single">
                    <AccordionItem value={name}>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-300">
                        {quote}
                      </p>
                      <AccordionTrigger className="mt-2">
                        Read full quote
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-300">
                        {quote}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardBody>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal
          id="pricing"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-white">
                Pricing that scales with your operating model.
              </h2>
              <p className="mt-3 text-slate-300">
                Start free, then add automation and governance when the team is
                ready.
              </p>
            </div>
            <label className="flex items-center gap-3 text-sm text-slate-300">
              Monthly
              <Toggle
                checked={annual}
                onCheckedChange={setAnnual}
                appearance="indigo"
                aria-label="Toggle annual billing"
              />
              Annual
            </label>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pricing.map(([tier, monthly, yearly, copy, features]) => (
              <Card
                key={tier}
                appearance="glass"
                rounded="lg"
                className={tier === "Pro" ? "border-indigo-400/60" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tier}</CardTitle>
                    {tier === "Pro" && (
                      <Badge appearance="indigo">Most Popular</Badge>
                    )}
                  </div>
                  <p className="mt-3 text-4xl font-semibold text-white">
                    \${annual ? yearly : monthly}
                    <span className="text-sm font-normal text-slate-400">
                      /seat
                    </span>
                  </p>
                  <CardDescription>{copy}</CardDescription>
                </CardHeader>
                <CardBody>
                  <Table
                    size="sm"
                    scrollAreaAriaLabel={\`\${tier} feature table\`}
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead>Included</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {features.map((f) => (
                        <TableRow key={f}>
                          <TableCell>{f}</TableCell>
                          <TableCell>
                            <FiCheck className="text-emerald-300" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Button
                    appearance={tier === "Pro" ? "indigo" : "outline"}
                    onClick={() =>
                      tier === "Free"
                        ? toast({
                            title: "Workspace created",
                            description:
                              "Your free Zentauri workspace is ready.",
                            appearance: "success",
                          })
                        : setModalTier(tier)
                    }
                  >
                    {tier === "Enterprise" ? "Contact sales" : "Choose plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal
          id="faq"
          className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Frequently asked questions.
          </h2>
          <div className="mt-6">
            <Input
              label={
                <span className="inline-flex items-center gap-2">
                  <FiSearch /> Search FAQ
                </span>
              }
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search security, billing, integrations..."
            />
          </div>
          {filteredFaqs.length ? (
            <Accordion type="single" className="mt-8">
              {filteredFaqs.map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <EmptyState className="mt-8" appearance="card">
              <EmptyStateIcon>
                <FiSearch className="text-3xl" />
              </EmptyStateIcon>
              <EmptyStateTitle>No matching answers</EmptyStateTitle>
              <EmptyStateDescription>
                Try a broader term like security, billing, or integrations.
              </EmptyStateDescription>
              <EmptyStateAction>
                <Button appearance="outline" onClick={() => setFaqSearch("")}>
                  Reset search
                </Button>
              </EmptyStateAction>
            </EmptyState>
          )}
          <Alert appearance="info" className="mt-8">
            <FiMessageCircle />
            <div>
              <AlertTitle>Still have questions?</AlertTitle>
              <AlertDescription>
                Chat with us and a product specialist will reply with specifics.
              </AlertDescription>
            </div>
          </Alert>
        </Reveal>

        <Reveal
          id="contact"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Badge appearance="glass">Talk to an operator</Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                Build a clearer operating rhythm before the next planning cycle.
              </h2>
              <div className="mt-8 space-y-4 text-slate-300">
                {[
                  "Map ownership across every workflow.",
                  "Reduce approval latency without losing governance.",
                  "Give leadership reliable, live execution context.",
                ].map((item) => (
                  <p key={item} className="flex gap-3">
                    <FiCheck className="mt-1 text-indigo-300" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <Card appearance="glass" rounded="lg">
              <CardHeader>
                <CardTitle>Contact Zentauri</CardTitle>
                <CardDescription>Step {contactStep} of 3</CardDescription>
              </CardHeader>
              <CardBody className="space-y-4">
                {contactStep === 1 && (
                  <>
                    <Input label="Name" placeholder="Avery Stone" />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="avery@company.com"
                    />
                  </>
                )}
                {contactStep === 2 && (
                  <>
                    <Select multiple={false}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pilot">Pilot program</SelectItem>
                        <SelectItem value="security">
                          Security review
                        </SelectItem>
                        <SelectItem value="migration">
                          Migration plan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      as="textarea"
                      label="Message"
                      placeholder="Tell us about the workflows you want to improve."
                      rows={5}
                    />
                  </>
                )}
                {contactStep === 3 && (
                  <Alert appearance="success">
                    <FiCheck />
                    <div>
                      <AlertTitle>Ready to send</AlertTitle>
                      <AlertDescription>
                        We will route your request to the right product
                        specialist and reply within one business day.
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
                <Pagination
                  pageCount={3}
                  page={contactStep}
                  onPageChange={setContactStep}
                  siblingCount={0}
                  boundaryCount={3}
                  aria-label="Contact form steps"
                />
              </CardBody>
              <CardFooter>
                <Button
                  appearance="indigo"
                  disabled={contactStep !== 3}
                  onClick={() =>
                    toast({
                      title: "Message sent!",
                      description: "We'll reply within 24h",
                      appearance: "success",
                    })
                  }
                >
                  Submit message
                </Button>
              </CardFooter>
            </Card>
          </div>
          <footer className="mt-20 border-t border-white/10 pt-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex gap-5 text-sm text-slate-400">
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <button type="button" onClick={() => setPrivacyOpen(true)}>
                  Privacy Policy
                </button>
              </div>
              <div className="flex gap-3 text-slate-300">
                <FiTwitter />
                <FiLinkedin />
                <FiGithub />
                <FiSlack />
              </div>
              <p className="text-sm text-slate-500">
                © 2026 Zentauri Labs, Inc.
              </p>
            </div>
          </footer>
        </Reveal>

        <Modal
          open={modalTier !== null}
          onOpenChange={(open) => !open && setModalTier(null)}
        >
          <ModalContent appearance="glass" size="md">
            <ModalHeader>
              <ModalTitle>{modalTier} plan</ModalTitle>
              <ModalDescription>
                Share your details and we will prepare the right next step.
              </ModalDescription>
              <ModalClose>
                <FiX />
              </ModalClose>
            </ModalHeader>
            <ModalBody className="space-y-4">
              {modalError && (
                <Alert appearance="error">
                  <AlertTitle>Missing details</AlertTitle>
                  <AlertDescription>
                    Please add a work email before continuing.
                  </AlertDescription>
                </Alert>
              )}
              <Input
                label="Work email"
                type="email"
                placeholder="team@company.com"
              />
              <Input label="Company" placeholder="Acme Software" />
            </ModalBody>
            <ModalFooter>
              <Button appearance="ghost" onClick={() => setModalTier(null)}>
                Cancel
              </Button>
              <Button appearance="indigo" onClick={() => setModalError(true)}>
                Continue
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal open={privacyOpen} onOpenChange={setPrivacyOpen}>
          <ModalContent appearance="glass" size="md">
            <ModalHeader>
              <ModalTitle>Privacy Policy</ModalTitle>
              <ModalDescription>
                Plain-language summary for demo visitors.
              </ModalDescription>
              <ModalClose>
                <FiX />
              </ModalClose>
            </ModalHeader>
            <ModalBody>
              <p>
                Zentauri collects only the information needed to respond to your
                request, secure your workspace, and improve product reliability.
                We never sell customer data, and enterprise customers can
                configure retention, residency, and audit export policies.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button appearance="indigo" onClick={() => setPrivacyOpen(false)}>
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
`;