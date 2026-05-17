import {
  FiAlertCircle,
  FiArchive,
  FiBriefcase,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiDownload,
  FiFileText,
  FiHeart,
  FiMapPin,
  FiMessageCircle,
  FiMusic,
  FiPackage,
  FiPlay,
  FiPlus,
  FiShare2,
  FiStar,
  FiTrendingUp,
  FiUploadCloud,
  FiZap,
} from "react-icons/fi";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { cardVariantSnippets } from "./components/card-code-examples.snippets";

const baseCardClassName =
  "group h-full border-white/10 bg-slate-950/70 shadow-lg shadow-slate-950/30 transition duration-200 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-indigo-950/30";

const iconShellClassName =
  "grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-indigo-300";

const actionClassName =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const secondaryActionClassName =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

function AvatarInitials({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden="true"
      className="grid size-11 place-items-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-100 ring-1 ring-indigo-300/30"
    >
      {initials}
    </div>
  );
}

function VisualPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`min-h-36 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.34),rgba(14,165,233,0.12)),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[100%_100%,22px_22px,22px_22px] ${className}`}
    />
  );
}

// 1. Product Card
function ProductCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody>
        <VisualPlaceholder label="A compact analytics device on a dark gradient surface" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Pulse Analytics Hub</CardTitle>
            <CardDescription>
              Real-time reporting for growing SaaS teams.
            </CardDescription>
          </div>
          <p className="text-lg font-semibold text-white">$149</p>
        </div>
      </CardBody>
      <CardFooter className="flex-row items-center justify-between">
        <span className="text-xs text-emerald-300">In stock</span>
        <a href="#product-card" className={actionClassName}>
          Add to cart
        </a>
      </CardFooter>
    </Card>
  );
}

// 2. User Profile Card
function UserProfileCard() {
  const stats = [
    ["128", "Projects"],
    ["94%", "SLA"],
    ["18", "Teams"],
  ];

  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader className="items-center text-center">
        <AvatarInitials initials="MC" />
        <CardTitle>Maya Chen</CardTitle>
        <CardDescription>VP Operations at Northstar</CardDescription>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-2 text-center">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-white/5 p-3"
            >
              <p className="font-semibold text-white">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// 3. Blog Post Card
function BlogPostCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody>
        <VisualPlaceholder label="Abstract editorial image for a workflow article" />
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
            Operations
          </p>
          <CardTitle className="mt-2">
            How elite teams design decision loops
          </CardTitle>
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
    </Card>
  );
}

// 4. Pricing Card
function PricingCard() {
  const features = [
    "Unlimited workflows",
    "Advanced permissions",
    "Priority support",
  ];

  return (
    <Card
      appearance="glass"
      rounded="lg"
      className={`${baseCardClassName} border-indigo-400/50`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro</CardTitle>
          <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-200">
            Popular
          </span>
        </div>
        <p className="text-4xl font-semibold tracking-tight text-white">
          $29<span className="text-sm font-normal text-slate-400">/seat</span>
        </p>
        <CardDescription>
          For teams ready to automate recurring work.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <ul className="space-y-2" aria-label="Pro plan features">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <FiCheck aria-hidden="true" className="text-emerald-300" />
              {feature}
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <a href="#pricing-card" className={actionClassName}>
          Start trial
        </a>
      </CardFooter>
    </Card>
  );
}

// 5. Testimonial Card
function TestimonialCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody>
        <div
          className="flex text-indigo-300"
          aria-label="5 out of 5 star rating"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <FiStar key={index} aria-hidden="true" fill="currentColor" />
          ))}
        </div>
        <blockquote className="text-sm leading-6 text-slate-200">
          “The platform gave our product and support leaders one shared
          operating picture. We stopped debating status and started improving
          outcomes.”
        </blockquote>
      </CardBody>
      <CardFooter className="flex-row items-center gap-3">
        <AvatarInitials initials="AS" />
        <div>
          <p className="text-sm font-medium text-white">Amara Singh</p>
          <p className="text-xs text-slate-400">Security Lead, Helio</p>
        </div>
      </CardFooter>
    </Card>
  );
}

// 6. Stats Card
function StatsCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody>
        <div className="flex items-center justify-between">
          <span className={iconShellClassName}>
            <FiTrendingUp aria-hidden="true" />
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
            +18.4%
          </span>
        </div>
        <div>
          <p className="text-4xl font-semibold tracking-tight text-white">
            42.8k
          </p>
          <CardDescription>Qualified product events this week</CardDescription>
        </div>
      </CardBody>
    </Card>
  );
}

// 7. Dashboard Summary Card
function DashboardSummaryCard() {
  const rows = [
    ["Release readiness", "92%"],
    ["Open approvals", "14"],
    ["At-risk workflows", "3"],
  ];

  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader>
        <CardTitle>Workspace summary</CardTitle>
        <CardDescription>Updated 2 minutes ago</CardDescription>
      </CardHeader>
      <CardBody>
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
          >
            <span className="text-sm text-slate-300">{label}</span>
            <span className="text-sm font-medium text-white">{value}</span>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

// 8. Notification Card
function NotificationCard() {
  return (
    <Card
      appearance="outline"
      rounded="lg"
      className={`${baseCardClassName} border-amber-400/30 bg-amber-500/10`}
      role="status"
      aria-live="polite"
    >
      <CardBody>
        <div className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-200">
            <FiAlertCircle aria-hidden="true" />
          </span>
          <div>
            <CardTitle>Usage threshold reached</CardTitle>
            <CardDescription className="mt-1 text-amber-50/80">
              Your ingestion volume is at 82% for the current billing cycle.
            </CardDescription>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 9. Feature Card
function FeatureCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader>
        <span className={iconShellClassName}>
          <FiZap aria-hidden="true" />
        </span>
        <CardTitle>Automation rules</CardTitle>
        <CardDescription>
          Route work, assign owners, and escalate blockers without brittle
          scripts.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

// 10. E-commerce Cart Item Card
function EcommerceCartItemCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody className="flex-row gap-4">
        <div
          aria-hidden="true"
          className="grid size-20 shrink-0 place-items-center rounded-lg border border-white/10 bg-indigo-500/15 text-indigo-200"
        >
          <FiPackage />
        </div>
        <div className="min-w-0 flex-1">
          <CardTitle>Workflow Console</CardTitle>
          <CardDescription>Annual subscription, 10 seats</CardDescription>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-400">Qty 1</span>
            <span className="font-semibold text-white">$2,900</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 11. Event Card
function EventCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader className="flex-row items-start gap-4">
        <div className="rounded-lg border border-indigo-300/30 bg-indigo-500/15 px-3 py-2 text-center">
          <p className="text-xs uppercase text-indigo-200">May</p>
          <p className="text-2xl font-semibold text-white">21</p>
        </div>
        <div>
          <CardTitle>ScaleOps roundtable</CardTitle>
          <CardDescription className="mt-1 flex items-center gap-1">
            <FiMapPin aria-hidden="true" /> San Francisco, CA
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        <a href="#event-card" className={secondaryActionClassName}>
          Reserve seat
        </a>
      </CardFooter>
    </Card>
  );
}

// 12. Job Listing Card
function JobListingCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <span className={iconShellClassName}>
            <FiBriefcase aria-hidden="true" />
          </span>
          <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
            Remote
          </span>
        </div>
        <CardTitle>Senior Frontend Engineer</CardTitle>
        <CardDescription>
          Design Systems · Full-time · US/EU overlap
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-row items-center justify-between">
        <span className="text-sm text-slate-400">$155k - $190k</span>
        <a href="#job-listing-card" className={secondaryActionClassName}>
          Apply
        </a>
      </CardFooter>
    </Card>
  );
}

// 13. Course Card
function CourseCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody>
        <VisualPlaceholder
          label="Course cover for analytics fundamentals"
          className="min-h-28"
        />
        <div>
          <CardTitle>Analytics for product teams</CardTitle>
          <CardDescription>Instructor: Lena Ortiz · 18 lessons</CardDescription>
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Progress</span>
            <span>64%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-indigo-400" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 14. Music/Media Card
function MusicMediaCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody className="flex-row items-center gap-4">
        <div
          aria-hidden="true"
          className="grid size-20 shrink-0 place-items-center rounded-lg bg-linear-to-br from-indigo-500/40 to-cyan-500/20 text-2xl text-white"
        >
          <FiMusic />
        </div>
        <div className="min-w-0 flex-1">
          <CardTitle>Release notes radio</CardTitle>
          <CardDescription>Episode 42 · Platform reliability</CardDescription>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className={secondaryActionClassName}
              aria-label="Play episode"
            >
              <FiPlay aria-hidden="true" />
            </button>
            <div className="h-1.5 flex-1 rounded-full bg-white/10">
              <div className="h-full w-1/3 rounded-full bg-indigo-400" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 15. Social Post Card
function SocialPostCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader className="flex-row items-center gap-3">
        <AvatarInitials initials="RK" />
        <div>
          <CardTitle>Ravi Kumar</CardTitle>
          <CardDescription>Shared a deployment insight</CardDescription>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm leading-6 text-slate-300">
          We cut review time by pairing release ownership with automated risk
          signals. The biggest win was fewer context-switching escalations.
        </p>
      </CardBody>
      <CardFooter className="flex-row justify-between text-sm text-slate-300">
        <button
          type="button"
          className="inline-flex items-center gap-2 hover:text-white"
          aria-label="Like post"
        >
          <FiHeart aria-hidden="true" /> 248
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 hover:text-white"
          aria-label="Comment on post"
        >
          <FiMessageCircle aria-hidden="true" /> 32
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 hover:text-white"
          aria-label="Share post"
        >
          <FiShare2 aria-hidden="true" /> Share
        </button>
      </CardFooter>
    </Card>
  );
}

// 16. Analytics Card
function AnalyticsCard() {
  const bars = ["h-10", "h-16", "h-12", "h-24", "h-20", "h-28", "h-14"];

  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader>
        <CardTitle>Pipeline health</CardTitle>
        <CardDescription>Weekly conversion by stage</CardDescription>
      </CardHeader>
      <CardBody>
        <div
          className="flex h-36 items-end gap-2 rounded-lg border border-white/10 bg-white/5 p-4"
          aria-label="Bar chart placeholder"
        >
          {bars.map((height, index) => (
            <div
              key={`${height}-${index}`}
              className={`${height} flex-1 rounded-t bg-indigo-400/70`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="text-slate-400">Conversion</p>
            <p className="font-semibold text-white">31.8%</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="text-slate-400">Velocity</p>
            <p className="font-semibold text-white">4.2 days</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// 17. Team Member Card
function TeamMemberCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader className="items-center text-center">
        <AvatarInitials initials="NP" />
        <CardTitle>Noor Patel</CardTitle>
        <CardDescription>Design Systems Lead</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="text-center text-sm leading-6 text-slate-300">
          Owns component quality, accessibility reviews, and release polish for
          the product surface.
        </p>
      </CardBody>
      <CardFooter className="flex-row justify-center">
        <a href="mailto:noor@example.com" className={secondaryActionClassName}>
          Contact
        </a>
      </CardFooter>
    </Card>
  );
}

// 18. File/Document Card
function FileDocumentCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardBody className="flex-row items-center gap-4">
        <span className={iconShellClassName}>
          <FiFileText aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate">Q2 operating review.pdf</CardTitle>
          <CardDescription>8.4 MB · Updated today</CardDescription>
        </div>
        <button
          type="button"
          className={secondaryActionClassName}
          aria-label="Download Q2 operating review"
        >
          <FiDownload aria-hidden="true" />
        </button>
      </CardBody>
    </Card>
  );
}

// 19. Payment/Invoice Card
function PaymentInvoiceCard() {
  return (
    <Card appearance="glass" rounded="lg" className={baseCardClassName}>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Invoice #ZT-2048</CardTitle>
          <CardDescription>Due May 30, 2026</CardDescription>
        </div>
        <span className={iconShellClassName}>
          <FiCreditCard aria-hidden="true" />
        </span>
      </CardHeader>
      <CardBody>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-400">Amount due</p>
            <p className="text-3xl font-semibold text-white">$4,820.00</p>
          </div>
          <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs text-amber-200">
            Pending
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

// 20. Empty State Card
function EmptyStateCard() {
  return (
    <Card
      appearance="outline"
      rounded="lg"
      className={`${baseCardClassName} items-center text-center`}
    >
      <CardBody className="items-center py-8">
        <span className="grid size-12 place-items-center rounded-full border border-dashed border-indigo-300/40 text-indigo-200">
          <FiUploadCloud aria-hidden="true" />
        </span>
        <div>
          <CardTitle>No documents yet</CardTitle>
          <CardDescription className="mt-1">
            Upload contracts, invoices, or onboarding files to keep this
            workspace organized.
          </CardDescription>
        </div>
        <button type="button" className={actionClassName}>
          <FiPlus aria-hidden="true" /> Upload file
        </button>
      </CardBody>
    </Card>
  );
}

const cardVariantPreviews = [
  {
    name: "Product Card",
    Component: ProductCard,
    code: cardVariantSnippets.productCardSnippet,
  },
  {
    name: "User Profile Card",
    Component: UserProfileCard,
    code: cardVariantSnippets.userProfileCardSnippet,
  },
  {
    name: "Blog Post Card",
    Component: BlogPostCard,
    code: cardVariantSnippets.blogPostCardSnippet,
  },
  {
    name: "Pricing Card",
    Component: PricingCard,
    code: cardVariantSnippets.pricingCardSnippet,
  },
  {
    name: "Testimonial Card",
    Component: TestimonialCard,
    code: cardVariantSnippets.testimonialCardSnippet,
  },
  {
    name: "Stats Card",
    Component: StatsCard,
    code: cardVariantSnippets.statsCardSnippet,
  },
  {
    name: "Dashboard Summary Card",
    Component: DashboardSummaryCard,
    code: cardVariantSnippets.dashboardSummaryCardSnippet,
  },
  {
    name: "Notification Card",
    Component: NotificationCard,
    code: cardVariantSnippets.notificationCardSnippet,
  },
  {
    name: "Feature Card",
    Component: FeatureCard,
    code: cardVariantSnippets.featureCardSnippet,
  },
  {
    name: "E-commerce Cart Item Card",
    Component: EcommerceCartItemCard,
    code: cardVariantSnippets.ecommerceCartItemCardSnippet,
  },
  {
    name: "Event Card",
    Component: EventCard,
    code: cardVariantSnippets.eventCardSnippet,
  },
  {
    name: "Job Listing Card",
    Component: JobListingCard,
    code: cardVariantSnippets.jobListingCardSnippet,
  },
  {
    name: "Course Card",
    Component: CourseCard,
    code: cardVariantSnippets.courseCardSnippet,
  },
  {
    name: "Music/Media Card",
    Component: MusicMediaCard,
    code: cardVariantSnippets.musicMediaCardSnippet,
  },
  {
    name: "Social Post Card",
    Component: SocialPostCard,
    code: cardVariantSnippets.socialPostCardSnippet,
  },
  {
    name: "Analytics Card",
    Component: AnalyticsCard,
    code: cardVariantSnippets.analyticsCardSnippet,
  },
  {
    name: "Team Member Card",
    Component: TeamMemberCard,
    code: cardVariantSnippets.teamMemberCardSnippet,
  },
  {
    name: "File/Document Card",
    Component: FileDocumentCard,
    code: cardVariantSnippets.fileDocumentCardSnippet,
  },
  {
    name: "Payment/Invoice Card",
    Component: PaymentInvoiceCard,
    code: cardVariantSnippets.paymentInvoiceCardSnippet,
  },
  {
    name: "Empty State Card",
    Component: EmptyStateCard,
    code: cardVariantSnippets.emptyStateCardSnippet,
  },
];

export function CardExamplesSection() {
  return (
    <section className="rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-100 dark:shadow-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
            Production card patterns
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
            Twenty reusable card compositions built only from the existing Card
            primitive and its exported sections.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
          <FiArchive aria-hidden="true" /> 20 variants
        </span>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        {cardVariantPreviews.map(({ name, Component, code }) => (
          <PreviewCodeShowcase key={name} code={code}>
            <div className="max-w-70 md:max-w-md">
              <Component />
            </div>
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
