import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CardDemoProps } from "./types";

export function cardSnippet(opts: CardDemoProps): string {
  const { appearance, size, rounded } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const roundedAttr = rounded === "md" ? "" : ` rounded="${rounded}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, rounded · ${rounded}`)}<Card${appearanceAttr}${sizeAttr}${roundedAttr}>
  <CardHeader>
    <CardTitle className="text-sm">
      Appearance:{" "}
      <span className="font-bold">${appearance.toUpperCase()}</span>, Size:{" "}
      <span className="font-bold">${size.toUpperCase()}</span>, Rounded:{" "}
      <span className="font-bold">${rounded.toUpperCase()}</span>
    </CardTitle>
  </CardHeader>
  <CardBody>
    <CardDescription>Brief supporting description.</CardDescription>
  </CardBody>
</Card>`;
}

const visualPlaceholderSnippet = `const VisualPlaceholder = ({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div
      role="img"
      aria-label={label}
      className={\`min-h-36 rounded-lg border border-slate-900/10 dark:border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.34),rgba(14,165,233,0.12)),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[100%_100%,22px_22px,22px_22px] \${className}\`}
    />
  );
}`;

const baseCardClassNameSnippet = `const baseCardClassName = 
  "group h-full border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-slate-950/70 shadow-lg shadow-slate-950/30 transition duration-200 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-indigo-950/30";`;

const secondarActionClassNameSnippet = `const secondaryActionClassName =
"inline-flex items-center justify-center gap-2 rounded-lg border border-slate-900/10 bg-slate-100 text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 px-3 py-2 text-sm font-medium transition hover:bg-slate-200 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";`;

const iconShellClassNameSnippet = `const iconShellClassName = 
  "grid size-10 shrink-0 place-items-center rounded-lg border border-slate-900/10 dark:border-white/10 dark:bg-white/5 text-indigo-700 dark:text-indigo-300";`;

const actionClassNameSnippet = `const actionClassName =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
`;

const avatarInitialsSnippet = `function AvatarInitials({ initials }: { initials: string }) {
  return (
    <Avatar appearance="indigo">
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}`;

export const cardVariantSnippets = {
  productCardSnippet: `${baseCardClassNameSnippet}

${visualPlaceholderSnippet}

${actionClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody>
    <VisualPlaceholder label="Product image" />
    <div className="flex items-start justify-between gap-4">
      <div>
        <CardTitle>Pulse Analytics Hub</CardTitle>
        <CardDescription>Real-time reporting for growing SaaS teams.</CardDescription>
      </div>
      <p className="text-lg font-semibold text-slate-900 dark:text-white">$149</p>
    </div>
  </CardBody>
  <CardFooter className="flex-row items-center justify-between">
    <span className="text-xs text-emerald-800 dark:text-emerald-300">In stock</span>
    <a href="#product-card" className={actionClassName}>Add to cart</a>
  </CardFooter>
</Card>`,
  userProfileCardSnippet: `import { Avatar, AvatarFallback } from "@zentauri-ui/zentauri-components/ui/avatar";

${baseCardClassNameSnippet}

const stats = [
  ["128", "Projects"],
  ["94%", "SLA"],
  ["18", "Teams"],
];

${avatarInitialsSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader className="items-center text-center">
    <AvatarInitials initials="MC" />
    <CardTitle>Maya Chen</CardTitle>
    <CardDescription>VP Operations at Northstar</CardDescription>
  </CardHeader>
  <CardBody>
    <div className="grid grid-cols-3 gap-2 text-center">
      {stats.map(([value, label]) => (
        <div key={label} className="rounded-lg border border-slate-900/10 dark:border-white/10 bg-white dark:bg-white/5 p-3">
          <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-800 dark:text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  </CardBody>
</Card>`,
  blogPostCardSnippet: `${baseCardClassNameSnippet}

${secondarActionClassNameSnippet}

${visualPlaceholderSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody>
    <VisualPlaceholder label="Article cover image" />
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">Operations</p>
      <CardTitle className="mt-2">How elite teams design decision loops</CardTitle>
      <CardDescription className="mt-2">
        A practical guide to reducing ambiguity without adding meeting load.
      </CardDescription>
    </div>
  </CardBody>
  <CardFooter>
    <a href="#blog-post-card" className={secondaryActionClassName}>
      Read article <FiChevronRight aria-hidden="true" />
    </a>
  </CardFooter>
</Card>`,
  pricingCardSnippet: `import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
  
${baseCardClassNameSnippet}
  
${actionClassNameSnippet}

const features = ["Unlimited workflows", "Advanced permissions", "Priority support"];

<Card appearance="glass" rounded="lg" className={\`\${baseCardClassName} border-indigo-400/50\`}>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Pro</CardTitle>
      <Badge appearance="indigo">
        Popular
      </Badge>
    </div>
    <p className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">$29<span className="text-sm font-normal text-slate-800 dark:text-slate-400">/seat</span></p>
    <CardDescription>For teams ready to automate recurring work.</CardDescription>
  </CardHeader>
  <CardBody>
    <ul className="space-y-2" aria-label="Pro plan features">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-300">
          <FiCheck aria-hidden="true" className="text-emerald-800 dark:text-emerald-300" /> {feature}
        </li>
      ))}
    </ul>
  </CardBody>
  <CardFooter><a href="#pricing-card" className={actionClassName}>Start trial</a></CardFooter>
</Card>`,
  testimonialCardSnippet: `import { Avatar, AvatarFallback } from "@zentauri-ui/zentauri-components/ui/avatar";
  
${baseCardClassNameSnippet}

${avatarInitialsSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody>
    <div className="flex text-indigo-600 dark:text-indigo-300" aria-label="5 out of 5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <FiStar key={index} aria-hidden="true" fill="currentColor" />
      ))}
    </div>
    <blockquote className="text-sm leading-6 text-slate-800 dark:text-slate-200">
      “The platform gave our product and support leaders one shared operating picture.”
    </blockquote>
  </CardBody>
  <CardFooter className="flex-row items-center gap-3">
    <AvatarInitials initials="AS" />
    <div>
      <p className="text-sm font-medium text-slate-900 dark:text-white">Amara Singh</p>
      <p className="text-xs text-slate-800 dark:text-slate-400">Security Lead, Helio</p>
    </div>
  </CardFooter>
</Card>`,
  statsCardSnippet: `import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
  
${baseCardClassNameSnippet}

${iconShellClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody>
    <div className="flex items-center justify-between">
      <span className={iconShellClassName}><FiTrendingUp aria-hidden="true" /></span>
      <Badge appearance="emerald">
        +18.4%
      </Badge>
    </div>
    <div>
      <p className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">42.8k</p>
      <CardDescription>Qualified product events this week</CardDescription>
    </div>
  </CardBody>
</Card>`,
  dashboardSummaryCardSnippet: `${baseCardClassNameSnippet}

const rows = [
  ["Release readiness", "92%"],
  ["Open approvals", "14"],
  ["At-risk workflows", "3"],
];

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader>
    <CardTitle>Workspace summary</CardTitle>
    <CardDescription>Updated 2 minutes ago</CardDescription>
  </CardHeader>
  <CardBody>
    {rows.map(([label, value]) => (
      <div key={label} className="flex items-center justify-between rounded-lg bg-slate-200 dark:bg-slate-900/5 px-3 py-2">
        <span className="text-sm text-slate-800 dark:text-slate-300">{label}</span>
        <span className="text-sm font-medium text-slate-900 dark:text-white">{value}</span>
      </div>
    ))}
  </CardBody>
</Card>`,
  notificationCardSnippet: `${baseCardClassNameSnippet}

<Card appearance="outline" rounded="lg" className={\`\${baseCardClassName} border-amber-400/30 bg-amber-500/10\`} role="status" aria-live="polite">
  <CardBody>
    <div className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-800 dark:text-amber-200">
        <FiAlertCircle aria-hidden="true" />
      </span>
      <div>
        <CardTitle>Usage threshold reached</CardTitle>
        <CardDescription className="mt-1 text-amber-800 dark:text-amber-50/80">
          Your ingestion volume is at 82% for the current billing cycle.
        </CardDescription>
      </div>
    </div>
  </CardBody>
</Card>`,
  featureCardSnippet: `${baseCardClassNameSnippet}

${iconShellClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader>
    <span className={iconShellClassName}><FiZap aria-hidden="true" /></span>
    <CardTitle>Automation rules</CardTitle>
    <CardDescription>
      Route work, assign owners, and escalate blockers without brittle scripts.
    </CardDescription>
  </CardHeader>
</Card>`,
  ecommerceCartItemCardSnippet: `${baseCardClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody className="flex-row gap-4">
    <div aria-hidden="true" className="grid size-20 shrink-0 place-items-center rounded-lg border border-slate-900/10 dark:border-white/10 bg-indigo-500/15 text-indigo-700 dark:text-indigo-200">
      <FiPackage className="text-indigo-800 dark:text-indigo-200" />
    </div>
    <div className="min-w-0 flex-1">
      <CardTitle>Workflow Console</CardTitle>
      <CardDescription>Annual subscription, 10 seats</CardDescription>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-slate-800 dark:text-slate-400">Qty 1</span>
        <span className="font-semibold text-slate-900 dark:text-white">$2,900</span>
      </div>
    </div>
  </CardBody>
</Card>`,
  eventCardSnippet: `${baseCardClassNameSnippet}

${secondarActionClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader className="flex-row items-start gap-4">
    <div className="rounded-lg border border-indigo-300/30 bg-indigo-500/15 px-3 py-2 text-center">
      <p className="text-xs uppercase text-indigo-800 dark:text-indigo-200">May</p>
      <p className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200">21</p>
    </div>
    <div>
      <CardTitle>ScaleOps roundtable</CardTitle>
      <CardDescription className="mt-1 flex items-center gap-1">
        <FiMapPin aria-hidden="true" /> San Francisco, CA
      </CardDescription>
    </div>
  </CardHeader>
  <CardFooter><a href="#event-card" className={secondaryActionClassName}>Reserve seat</a></CardFooter>
</Card>`,
  jobListingCardSnippet: `import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
  
${baseCardClassNameSnippet}
  
${secondarActionClassNameSnippet}

${iconShellClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader>
    <div className="flex items-start justify-between gap-3">
      <span className={iconShellClassName}><FiBriefcase aria-hidden="true" /></span>
      <Badge appearance="outline">Remote</Badge>
    </div>
    <CardTitle>Senior Frontend Engineer</CardTitle>
    <CardDescription>Design Systems · Full-time · US/EU overlap</CardDescription>
  </CardHeader>
  <CardFooter className="flex-row items-center justify-between">
    <span className="text-sm text-slate-800 dark:text-slate-400">$155k - $190k</span>
    <a href="#job-listing-card" className={secondaryActionClassName}>Apply</a>
  </CardFooter>
</Card>`,
  courseCardSnippet: `${baseCardClassNameSnippet}

${visualPlaceholderSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody>
    <VisualPlaceholder label="Course cover" className="min-h-28" />
    <div>
      <CardTitle>Analytics for product teams</CardTitle>
      <CardDescription>Instructor: Lena Ortiz · 18 lessons</CardDescription>
    </div>
    <div>
      <div className="flex justify-between text-xs text-slate-800 dark:text-slate-400">
        <span>Progress</span><span>64%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-900/5">
        <div className="h-full w-2/3 rounded-full bg-indigo-400" />
      </div>
    </div>
  </CardBody>
</Card>`,
  musicMediaCardSnippet: `${baseCardClassNameSnippet}

${secondarActionClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody className="flex-row items-center gap-4">
    <div aria-hidden="true" className="grid size-20 shrink-0 place-items-center rounded-lg bg-linear-to-br from-indigo-500/40 to-cyan-500/20 text-2xl text-slate-900 dark:text-white">
      <FiMusic />
    </div>
    <div className="min-w-0 flex-1">
      <CardTitle>Release notes radio</CardTitle>
      <CardDescription>Episode 42 · Platform reliability</CardDescription>
      <div className="mt-4 flex items-center gap-2">
        <button type="button" className={secondaryActionClassName} aria-label="Play episode"><FiPlay aria-hidden="true" /></button>
        <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-900/5"><div className="h-full w-1/3 rounded-full bg-indigo-400" /></div>
      </div>
    </div>
  </CardBody>
</Card>`,
  socialPostCardSnippet: `import { Avatar, AvatarFallback } from "@zentauri-ui/zentauri-components/ui/avatar";
  
${baseCardClassNameSnippet}

${avatarInitialsSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader className="flex-row items-center gap-3">
    <AvatarInitials initials="RK" />
    <div>
      <CardTitle>Ravi Kumar</CardTitle>
      <CardDescription>Shared a deployment insight</CardDescription>
    </div>
  </CardHeader>
  <CardBody>
    <p className="text-sm leading-6 text-slate-800 dark:text-slate-300">
      We cut review time by pairing release ownership with automated risk signals.
    </p>
  </CardBody>
  <CardFooter className="flex-row justify-between text-sm text-slate-800 dark:text-slate-300">
    <button type="button" className="inline-flex items-center gap-2 hover:text-slate-900 dark:text-white dark:hover:text-white" aria-label="Like post"><FiHeart aria-hidden="true" /> 248</button>
    <button type="button" className="inline-flex items-center gap-2 hover:text-slate-900 dark:text-white dark:hover:text-white" aria-label="Comment on post"><FiMessageCircle aria-hidden="true" /> 32</button>
    <button type="button" className="inline-flex items-center gap-2 hover:text-slate-900 dark:text-white dark:hover:text-white" aria-label="Share post"><FiShare2 aria-hidden="true" /> Share</button>
  </CardFooter>
</Card>`,
  analyticsCardSnippet: `${baseCardClassNameSnippet}

const bars = ["h-100", "h-80", "h-60", "h-40", "h-20"];

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader>
    <CardTitle>Pipeline health</CardTitle>
    <CardDescription>Weekly conversion by stage</CardDescription>
  </CardHeader>
  <CardBody>
    <div className="flex h-36 items-end gap-2 rounded-lg border border-slate-900/10 dark:border-white/10 bg-white dark:bg-white/5 p-4" aria-label="Bar chart placeholder">
      {bars.map((height) => (
        <div key={height} className={\`\${height} flex-1 rounded-t bg-indigo-400/70\`} />
      ))}
    </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-white dark:bg-white/5 p-3">
          <p className="text-slate-800 dark:text-slate-400">Conversion</p>
          <p className="font-semibold text-slate-900 dark:text-white">31.8%</p>
        </div>
        <div className="rounded-lg bg-white dark:bg-white/5 p-3">
          <p className="text-slate-800 dark:text-slate-400">Velocity</p>
          <p className="font-semibold text-slate-900 dark:text-white">4.2 days</p>
        </div>
      </div>
  </CardBody>
</Card>`,
  teamMemberCardSnippet: `import { Avatar, AvatarFallback } from "@zentauri-ui/zentauri-components/ui/avatar";
  
${baseCardClassNameSnippet}

${avatarInitialsSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader className="items-center text-center">
    <AvatarInitials initials="NP" />
    <CardTitle>Noor Patel</CardTitle>
    <CardDescription>Design Systems Lead</CardDescription>
  </CardHeader>
  <CardBody>
    <p className="text-center text-sm leading-6 text-slate-800 dark:text-slate-300">
      Owns component quality, accessibility reviews, and release polish.
    </p>
  </CardBody>
  <CardFooter className="flex-row justify-center">
    <a href="mailto:noor@example.com" className={secondaryActionClassName}>Contact</a>
  </CardFooter>
</Card>`,
  fileDocumentCardSnippet: `${baseCardClassNameSnippet}

${secondarActionClassNameSnippet}

${iconShellClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardBody className="flex-row items-center gap-4">
    <span className={iconShellClassName}><FiFileText aria-hidden="true" /></span>
    <div className="min-w-0 flex-1">
      <CardTitle className="truncate">Q2 operating review.pdf</CardTitle>
      <CardDescription>8.4 MB · Updated today</CardDescription>
    </div>
    <button type="button" className={secondaryActionClassName} aria-label="Download Q2 operating review">
      <FiDownload aria-hidden="true" />
    </button>
  </CardBody>
</Card>`,
  paymentInvoiceCardSnippet: `import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
  
${baseCardClassNameSnippet}

${secondarActionClassNameSnippet}

${iconShellClassNameSnippet}

<Card appearance="glass" rounded="lg" className={baseCardClassName}>
  <CardHeader className="flex-row items-center justify-between">
    <div>
      <CardTitle>Invoice #ZT-2048</CardTitle>
      <CardDescription>Due May 30, 2026</CardDescription>
    </div>
    <span className={iconShellClassName}><FiCreditCard aria-hidden="true" /></span>
  </CardHeader>
  <CardBody>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-sm text-slate-800 dark:text-slate-400">Amount due</p>
        <p className="text-3xl font-semibold text-slate-900 dark:text-white">$4,820.00</p>
      </div>
      <Badge appearance="yellow">Pending</Badge>
    </div>
  </CardBody>
</Card>`,
  emptyStateCardSnippet: `${baseCardClassNameSnippet}

${actionClassNameSnippet}

<Card appearance="outline" rounded="lg" className={\`\${baseCardClassName} items-center text-center\`}>
  <CardBody className="items-center py-8">
    <span className="grid size-12 place-items-center rounded-full border border-dashed border-indigo-300/40 text-indigo-800 dark:text-indigo-200">
      <FiUploadCloud aria-hidden="true" />
    </span>
    <div>
      <CardTitle>No documents yet</CardTitle>
      <CardDescription className="mt-1">
        Upload contracts, invoices, or onboarding files to keep this workspace organized.
      </CardDescription>
    </div>
    <button type="button" className={actionClassName}><FiPlus aria-hidden="true" /> Upload file</button>
  </CardBody>
</Card>`,
};
