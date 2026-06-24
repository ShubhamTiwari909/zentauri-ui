// Local mock data for the dashboard. No backend — this is a presentation/template
// project, so everything is static and deterministic.

export type SparkPoint = { i: number; v: number };

export type Kpi = {
  id: string;
  label: string;
  /** Integer fed to the animated counter. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Percentage change vs the previous period. */
  delta: number;
  trend: "up" | "down";
  sparkline: SparkPoint[];
};

export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: 482,
    prefix: "$",
    suffix: "K",
    delta: 12.4,
    trend: "up",
    sparkline: [
      { i: 0, v: 38 },
      { i: 1, v: 41 },
      { i: 2, v: 39 },
      { i: 3, v: 44 },
      { i: 4, v: 46 },
      { i: 5, v: 48 },
      { i: 6, v: 52 },
      { i: 7, v: 55 },
      { i: 8, v: 58 },
      { i: 9, v: 61 },
      { i: 10, v: 64 },
      { i: 11, v: 68 },
    ],
  },
  {
    id: "users",
    label: "Active Users",
    value: 38,
    suffix: "K",
    delta: 8.1,
    trend: "up",
    sparkline: [
      { i: 0, v: 28 },
      { i: 1, v: 29 },
      { i: 2, v: 30 },
      { i: 3, v: 31 },
      { i: 4, v: 32 },
      { i: 5, v: 33 },
      { i: 6, v: 34 },
      { i: 7, v: 35 },
      { i: 8, v: 36 },
      { i: 9, v: 36 },
      { i: 10, v: 37 },
      { i: 11, v: 38 },
    ],
  },
  {
    id: "aov",
    label: "Avg. Order Value",
    value: 86,
    prefix: "$",
    delta: 3.2,
    trend: "up",
    sparkline: [
      { i: 0, v: 78 },
      { i: 1, v: 79 },
      { i: 2, v: 80 },
      { i: 3, v: 81 },
      { i: 4, v: 82 },
      { i: 5, v: 83 },
      { i: 6, v: 84 },
      { i: 7, v: 84 },
      { i: 8, v: 85 },
      { i: 9, v: 85 },
      { i: 10, v: 86 },
      { i: 11, v: 86 },
    ],
  },
  {
    id: "refunds",
    label: "Refunds",
    value: 1240,
    prefix: "$",
    delta: 5.6,
    trend: "down",
    sparkline: [
      { i: 0, v: 18 },
      { i: 1, v: 17 },
      { i: 2, v: 19 },
      { i: 3, v: 16 },
      { i: 4, v: 15 },
      { i: 5, v: 14 },
      { i: 6, v: 13 },
      { i: 7, v: 12 },
      { i: 8, v: 11 },
      { i: 9, v: 10 },
      { i: 10, v: 9 },
      { i: 11, v: 8 },
    ],
  },
];

export type RevenuePoint = {
  month: string;
  revenue: number;
  expenses: number;
};

export const revenueSeries: RevenuePoint[] = [
  { month: "Jan", revenue: 32, expenses: 21 },
  { month: "Feb", revenue: 41, expenses: 24 },
  { month: "Mar", revenue: 38, expenses: 22 },
  { month: "Apr", revenue: 52, expenses: 28 },
  { month: "May", revenue: 49, expenses: 27 },
  { month: "Jun", revenue: 63, expenses: 31 },
  { month: "Jul", revenue: 71, expenses: 34 },
  { month: "Aug", revenue: 68, expenses: 33 },
  { month: "Sep", revenue: 79, expenses: 36 },
];

export type ChannelPoint = {
  channel: string;
  organic: number;
  paid: number;
  referral: number;
};

export const channelSeries: ChannelPoint[] = [
  { channel: "Q1", organic: 24, paid: 14, referral: 8 },
  { channel: "Q2", organic: 31, paid: 18, referral: 10 },
  { channel: "Q3", organic: 28, paid: 22, referral: 13 },
  { channel: "Q4", organic: 37, paid: 26, referral: 16 },
];

export type TrafficSlice = {
  source: string;
  visitors: number;
};

export const trafficSplit: TrafficSlice[] = [
  { source: "Direct", visitors: 4200 },
  { source: "Search", visitors: 3100 },
  { source: "Social", visitors: 2400 },
  { source: "Referral", visitors: 1500 },
];

export type SessionPoint = {
  day: string;
  sessions: number;
};

export const sessionsTrend: SessionPoint[] = [
  { day: "Mon", sessions: 1240 },
  { day: "Tue", sessions: 1580 },
  { day: "Wed", sessions: 1390 },
  { day: "Thu", sessions: 1720 },
  { day: "Fri", sessions: 1980 },
  { day: "Sat", sessions: 1460 },
  { day: "Sun", sessions: 1120 },
];

export type CategoryPoint = {
  category: string;
  score: number;
  benchmark: number;
};

export const categoryPerformance: CategoryPoint[] = [
  { category: "Electronics", score: 88, benchmark: 72 },
  { category: "Apparel", score: 74, benchmark: 68 },
  { category: "Home", score: 62, benchmark: 70 },
  { category: "Sports", score: 91, benchmark: 75 },
  { category: "Books", score: 55, benchmark: 60 },
  { category: "Beauty", score: 78, benchmark: 71 },
];

export type Order = {
  id: string;
  customer: string;
  plan: "Starter" | "Growth" | "Scale";
  status: "Paid" | "Pending" | "Refunded";
  amount: number;
  date: string;
};

export const orders: Order[] = [
  {
    id: "ord-1042",
    customer: "Ada Lovelace",
    plan: "Scale",
    status: "Paid",
    amount: 480,
    date: "2026-06-21",
  },
  {
    id: "ord-1041",
    customer: "Grace Hopper",
    plan: "Growth",
    status: "Paid",
    amount: 220,
    date: "2026-06-21",
  },
  {
    id: "ord-1040",
    customer: "Alan Turing",
    plan: "Starter",
    status: "Pending",
    amount: 49,
    date: "2026-06-20",
  },
  {
    id: "ord-1039",
    customer: "Katherine Johnson",
    plan: "Scale",
    status: "Paid",
    amount: 480,
    date: "2026-06-20",
  },
  {
    id: "ord-1038",
    customer: "Linus Torvalds",
    plan: "Growth",
    status: "Refunded",
    amount: 220,
    date: "2026-06-19",
  },
  {
    id: "ord-1037",
    customer: "Margaret Hamilton",
    plan: "Growth",
    status: "Paid",
    amount: 220,
    date: "2026-06-19",
  },
  {
    id: "ord-1036",
    customer: "Dennis Ritchie",
    plan: "Starter",
    status: "Paid",
    amount: 49,
    date: "2026-06-18",
  },
  {
    id: "ord-1035",
    customer: "Barbara Liskov",
    plan: "Scale",
    status: "Pending",
    amount: 480,
    date: "2026-06-18",
  },
  {
    id: "ord-1034",
    customer: "Tim Berners-Lee",
    plan: "Growth",
    status: "Paid",
    amount: 220,
    date: "2026-06-17",
  },
  {
    id: "ord-1033",
    customer: "Donald Knuth",
    plan: "Scale",
    status: "Paid",
    amount: 480,
    date: "2026-06-17",
  },
  {
    id: "ord-1032",
    customer: "Edsger Dijkstra",
    plan: "Starter",
    status: "Refunded",
    amount: 49,
    date: "2026-06-16",
  },
  {
    id: "ord-1031",
    customer: "John von Neumann",
    plan: "Growth",
    status: "Paid",
    amount: 220,
    date: "2026-06-16",
  },
];

export type Goal = {
  id: string;
  label: string;
  /** Completion percentage (0–100). */
  value: number;
  hint: string;
};

export const goals: Goal[] = [
  { id: "mrr", label: "MRR target", value: 78, hint: "$482K / $620K" },
  { id: "signups", label: "New signups", value: 64, hint: "6.4K / 10K" },
  { id: "retention", label: "Net retention", value: 92, hint: "92% / 95%" },
  { id: "nps", label: "NPS goal", value: 48, hint: "48 / 60" },
];

export type Activity = {
  id: string;
  title: string;
  description: string;
  when: string;
};

export const activities: Activity[] = [
  {
    id: "a1",
    title: "New enterprise deal",
    description: "Acme Corp upgraded to Scale",
    when: "2h ago",
  },
  {
    id: "a2",
    title: "Churn risk flagged",
    description: "3 accounts inactive for 14 days",
    when: "5h ago",
  },
  {
    id: "a3",
    title: "Revenue milestone",
    description: "Crossed $480K MRR",
    when: "1d ago",
  },
  {
    id: "a4",
    title: "New integration",
    description: "Slack connector shipped",
    when: "2d ago",
  },
];
