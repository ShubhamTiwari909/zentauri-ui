import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import {
  FiBarChart2,
  FiBox,
  FiCpu,
  FiCreditCard,
  FiGitBranch,
  FiMessageSquare,
  FiPackage,
  FiStar,
} from "react-icons/fi";

const customerLogos = [
  ["Atlas", FiBox],
  ["Northstar", FiStar],
  ["Pulse", FiBarChart2],
  ["Kernel", FiCpu],
  ["Ledger", FiCreditCard],
  ["Courier", FiMessageSquare],
] as const;

const releaseEvents = [
  ["v1.7.8", "Marquee primitive shipped"],
  ["v1.7.7", "CountUp examples refreshed"],
  ["v1.7.6", "Charts SEO expanded"],
  ["v1.7.5", "Rating variants added"],
] as const;

const logoRailSnippet = `${variantLeadComment("customer logo rail")}import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import {
  FiBarChart2,
  FiBox,
  FiCpu,
  FiCreditCard,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";

const customerLogos = [
  ["Atlas", FiBox],
  ["Northstar", FiStar],
  ["Pulse", FiBarChart2],
  ["Kernel", FiCpu],
  ["Ledger", FiCreditCard],
  ["Courier", FiMessageSquare],
] as const;

export function CustomerLogoRail() {
  return (
    <Marquee appearance="card" gap={20} pauseOnHover speed={32}>
      {customerLogos.map(([name, Icon]) => (
        <span
          key={name}
          className="inline-flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          <Icon className="h-5 w-5 text-cyan-500" aria-hidden />
          {name}
        </span>
      ))}
    </Marquee>
  );
}`;

const releaseTickerSnippet = `${variantLeadComment("vertical release ticker")}import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import { FiGitBranch } from "react-icons/fi";

const releaseEvents = [
  ["v1.7.8", "Marquee primitive shipped"],
  ["v1.7.7", "CountUp examples refreshed"],
  ["v1.7.6", "Charts SEO expanded"],
  ["v1.7.5", "Rating variants added"],
] as const;

export function ReleaseTicker() {
  return (
    <Marquee
      appearance="emerald"
      className="h-72"
      gap={12}
      orientation="vertical"
      speed={24}
    >
      {releaseEvents.map(([version, label]) => (
        <article
          key={version}
          className="w-72 rounded-2xl bg-slate-950 p-4 text-white ring-1 ring-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/20">
              <FiGitBranch className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="font-mono text-xs font-semibold text-emerald-200">
                {version}
              </p>
              <p className="text-sm font-semibold">{label}</p>
            </div>
          </div>
        </article>
      ))}
    </Marquee>
  );
}`;

const notificationBannerSnippet = `${variantLeadComment("compact notification banner")}import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import { FiPackage } from "react-icons/fi";

const notifications = ["Usage alerts", "Billing synced", "Incidents clear"];

export function NotificationBanner() {
  return (
    <Marquee
      appearance="gradient-purple"
      direction="right"
      fade={false}
      gap="1.25rem"
      size="sm"
      speed={26}
    >
      {notifications.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20"
        >
          <FiPackage className="h-3.5 w-3.5" aria-hidden />
          {label}
        </span>
      ))}
    </Marquee>
  );
}`;

export function MarqueeExamplesSection() {
  return (
    <Section className="max-w-7xl">
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Marquee creates infinite logo rails, status tickers, release banners,
        and compact vertical feeds with CSS-only animation and duplicated
        children for seamless loops.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={logoRailSnippet}>
          <Marquee appearance="card" gap={20} pauseOnHover speed={32}>
            {customerLogos.map(([name, Icon]) => (
              <span
                key={name}
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
              >
                <Icon className="h-5 w-5 text-cyan-500" aria-hidden />
                {name}
              </span>
            ))}
          </Marquee>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={releaseTickerSnippet}>
          <Marquee
            appearance="emerald"
            className="h-72"
            gap={12}
            orientation="vertical"
            speed={24}
          >
            {releaseEvents.map(([version, label]) => (
              <article
                key={version}
                className="w-72 rounded-2xl bg-slate-950 p-4 text-white ring-1 ring-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/20">
                    <FiGitBranch className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold text-emerald-200">
                      {version}
                    </p>
                    <p className="text-sm font-semibold">{label}</p>
                  </div>
                </div>
              </article>
            ))}
          </Marquee>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={notificationBannerSnippet}>
          <Marquee
            appearance="gradient-purple"
            direction="right"
            fade={false}
            gap="1.25rem"
            size="sm"
            speed={26}
          >
            {["Usage alerts", "Billing synced", "Incidents clear"].map(
              (label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20"
                >
                  <FiPackage className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </span>
              ),
            )}
          </Marquee>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
