Build a professional SaaS landing page using the Zentauri UI component library (@zentauri-ui/zentauri-components). The page should be built with React and Tailwind CSS and include the following 10 sections, each leveraging specific Zentauri UI components as described:

---

TECH STACK

- React (Next.js App Router preferred)
- Tailwind CSS
- Zentauri UI: @zentauri-ui/zentauri-components
- Framer Motion for scroll-triggered animations
- TypeScript

---

DESIGN DIRECTION

- Theme: Dark navy + electric indigo accent (#6366f1), with off-white body text
- Typography: Display font (e.g. Sora or Clash Display) for headings, clean sans-serif for body
- Motion: Staggered reveal on scroll, subtle hover lifts on Cards, spring animations on Stepper
- Style: Premium SaaS — think Linear, Vercel, or Stripe quality

---

SECTION 01 — NAVBAR

- Sticky header with blur backdrop
- Logo left, nav links center (Home, Features, Pricing, FAQ), CTAs right
- Use: Buttons (primary + ghost), Dropdown (for "Products" submenu), Badge (notification dot)
- On mobile: collapse into a Drawer that slides from the left

SECTION 02 — HERO

- Full-viewport hero with bold H1 headline, supporting subheadline, two CTA Buttons (primary + outline)
- Announcement strip above headline using Badge ("New v2.0 →")
- Feature callout icons with Tooltip on hover showing brief descriptions
- Background: dark gradient mesh or subtle grid pattern

SECTION 03 — SOCIAL PROOF

- "Trusted by 2,400+ teams" with horizontally scrolling logo ticker
- Avatar group (5–6 overlapping user avatars with status indicators) showing "Active users"
- Badge showing total user count
- Divider separating from hero section

SECTION 04 — FEATURES

- Tabs to switch between feature categories: "Productivity", "Security", "Integrations"
- Under each Tab: 3-column grid of Cards (glass style with border, icon, title, short description)
- Badge on "Most Popular" feature card
- Tooltip on any "Learn more" icon links

SECTION 05 — HOW IT WORKS

- Stepper component with 3 steps: "Create Account", "Configure Workspace", "Go Live"
- Each step, when active, reveals an expanded Card below with details and a screenshot/illustration
- Divider between steps on mobile layout

SECTION 06 — METRICS / STATS

- 4 large KPI counters (e.g. "99.9% uptime", "50ms avg latency", "10M+ requests/day", "150+ countries")
- Each KPI paired with an animated Progress bar that fills on scroll enter
- Show Skeleton placeholder before data loads
- Spinner visible during async data fetch

SECTION 07 — TESTIMONIALS

- 3-column Card grid with customer testimonials
- Each Card: Avatar (with online status Badge), customer name, role, company Badge, star rating, quote
- Long quotes collapse into an Accordion (show first 2 lines, expand on click)

SECTION 08 — PRICING

- 3 pricing tier Cards: Free, Pro, Enterprise
- Toggle (monthly/annual billing switch) at top — toggling updates all prices
- Feature comparison Table inside each Card or below
- Badge on Pro card: "Most Popular"
- CTA Button per card; clicking Pro/Enterprise opens a Modal with a payment/contact form
- Alert inside Modal if form validation fails

SECTION 09 — FAQ

- Search input at top to filter questions in real-time
- 8 FAQ items rendered as Accordion panels with animated open/close
- If Search returns no results, show an Empty State component with icon + message + retry Button
- Alert (info tone) at bottom: "Still have questions? Chat with us →"

SECTION 10 — CONTACT / FOOTER CTA

- Split layout: left side has headline + value props; right side has a contact form
- Form fields: name (Input), email (Input), topic (Select with options), message (Textarea Input)
- Multi-step form controlled by Pagination (Step 1: contact info, Step 2: message, Step 3: confirm)
- Submit triggers a Toast notification ("Message sent! We'll reply within 24h")
- "Privacy Policy" link opens a Modal with policy content
- Footer below with nav links, social icons, copyright

---

GLOBAL REQUIREMENTS

- Fully responsive: mobile-first, breakpoints at sm/md/lg/xl
- Accessible: ARIA labels, keyboard navigation, focus management (especially Drawer, Modal, Dropdown)
- All interactive states: hover, focus, active, disabled
- Toast provider wrapping the entire app
- Import all components from @zentauri-ui/zentauri-components
- Use Framer Motion for staggered card reveals and scroll-triggered Progress bars
- No placeholder lorem ipsum — write realistic SaaS copy throughout
