# KPI-bot

**KPI-bot** is a lightweight internal metrics dashboard designed for SaaS teams to transparently track and share real-time business performance. It connects to platforms like **Stripe** (and soon HubSpot, Pipedrive, etc.) to automatically pull and display key metrics such as MRR, ARR, churn rate, and new subscriptions.

This project prioritizes simplicity, speed, and a clear developer experience, making it easy for SaaS companies to integrate their existing tools and get value immediately.

---

## ✨ Features

- 📊 **Real-Time SaaS Metrics**

  - Pulls MRR, ARR, churn rate, and new subscriptions from Stripe
  - Workspaces for multi-tenant support (e.g. multiple SaaS businesses)
  - Future integrations planned (HubSpot, Pipedrive)

- 🔐 **Authentication & Workspace Isolation**

  - Clerk for user authentication
  - Database-backed user and workspace relationships

- 🔌 **Stripe Integration**

  - Secure OAuth-based connection per workspace
  - Stripe data is pulled using access tokens tied to each workspace

- 🌐 **Internationalization (i18n) Ready**

  - Locale-aware routing using `next-intl`

- 💅 **Modern UI with ShadCN + Tailwind**
  - Clean, accessible, and responsive dashboard components
  - Card-based metric displays, chart support with `Recharts`

---

## 🏗 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Next.js Server Actions + Route Handlers
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Auth**: Clerk (user auth) + Role-based workspace access
- **Integration**: Stripe OAuth + Metrics API
- **Charts**: Recharts
- **Tooling**: pnpm

---

## 📦 Folder Structure

```bash
  .
  ├── README.md
  ├── app
  │   ├── [locale]
  │   │   ├── (protected)
  │   │   │   ├── dashboard
  │   │   │   ├── integrations
  │   │   │   ├── layout.tsx
  │   │   │   ├── metrics
  │   │   │   ├── profile
  │   │   │   ├── settings
  │   │   │   ├── team
  │   │   │   └── workspaces
  │   │   ├── [...rest]
  │   │   │   └── page.tsx
  │   │   ├── layout.tsx
  │   │   ├── not-found.tsx
  │   │   ├── onboarding
  │   │   │   └── page.tsx
  │   │   ├── page.tsx
  │   │   └── sync
  │   │       └── route.ts
  │   ├── api
  │   │   ├── integrations
  │   │   │   └── stripe
  │   │   ├── onboarding
  │   │   │   └── route.ts
  │   │   └── s3-presigned-url
  │   │       └── route.ts
  │   ├── favicon.ico
  │   └── styles
  │       └── globals.css
  ├── components
  │   ├── date-picker
  │   │   ├── index.ts
  │   │   ├── multi
  │   │   │   ├── MultipleDatePicker.stories.tsx
  │   │   │   └── MultipleDatePicker.tsx
  │   │   ├── natural-language
  │   │   │   ├── NaturalLanguageDatePicker.stories.tsx
  │   │   │   └── NaturalLanguageDatePicker.tsx
  │   │   ├── range
  │   │   │   ├── RangeDatePicker.stories.tsx
  │   │   │   └── RangeDatePicker.tsx
  │   │   ├── single
  │   │   │   ├── SingleDatePicker.stories.tsx
  │   │   │   └── SingleDatePicker.tsx
  │   │   └── utils.ts
  │   ├── language-switcher
  │   │   ├── LanguageSwitcher.stories.tsx
  │   │   ├── LanguageSwitcher.tsx
  │   │   └── utils.ts
  │   ├── layout
  │   │   ├── AppContainer.tsx
  │   │   └── AppSidebar.tsx
  │   ├── loader
  │   │   └── Loader.tsx
  │   ├── navigation
  │   │   ├── ExtensibleNav.tsx
  │   │   ├── MainNav.tsx
  │   │   ├── NavSecondary.tsx
  │   │   ├── NavUser.tsx
  │   │   ├── SearchForm.tsx
  │   │   ├── SiteHeader.tsx
  │   │   ├── SiteHeaderBreadcrumb.tsx
  │   │   ├── constants.ts
  │   │   ├── sidebar
  │   │   │   └── Sidebar.tsx
  │   │   └── types.ts
  │   └── ui
  │       ├── accordion
  │       │   ├── Accordion.stories.tsx
  │       │   └── Accordion.tsx
  │       ├── alert
  │       │   ├── Alert.stories.tsx
  │       │   └── Alert.tsx
  │       ├── avatar
  │       │   ├── Avatar.stories.tsx
  │       │   └── Avatar.tsx
  │       ├── badge
  │       │   ├── Badge.stories.tsx
  │       │   └── Badge.tsx
  │       ├── breadcrumb
  │       │   └── Breadcrumb.tsx
  │       ├── button
  │       │   ├── Button.stories.tsx
  │       │   └── Button.tsx
  │       ├── calendar
  │       │   ├── Calendar.stories.tsx
  │       │   └── Calendar.tsx
  │       ├── card
  │       │   ├── Card.stories.tsx
  │       │   └── Card.tsx
  │       ├── checkbox
  │       │   ├── Checkbox.stories.tsx
  │       │   └── Checkbox.tsx
  │       ├── collapsible
  │       │   └── Collapsible.tsx
  │       ├── dialog
  │       │   ├── Dialog.stories.tsx
  │       │   └── Dialog.tsx
  │       ├── drawer
  │       │   ├── Drawer.stories.tsx
  │       │   └── Drawer.tsx
  │       ├── dropdown-menu
  │       │   ├── DropdownMenu.stories.tsx
  │       │   └── DropdownMenu.tsx
  │       ├── form
  │       │   └── Form.tsx
  │       ├── icon
  │       │   ├── Icon.stories.tsx
  │       │   ├── Icon.tsx
  │       │   └── iconMapping.ts
  │       ├── input
  │       │   ├── Input.stories.tsx
  │       │   └── Input.tsx
  │       ├── label
  │       │   ├── Label.stories.tsx
  │       │   └── Label.tsx
  │       ├── popover
  │       │   ├── Popover.stories.tsx
  │       │   └── Popover.tsx
  │       ├── select
  │       │   ├── Select.stories.tsx
  │       │   └── Select.tsx
  │       ├── separator
  │       │   ├── Separator.stories.tsx
  │       │   └── Separator.tsx
  │       ├── sheet
  │       │   └── Sheet.tsx
  │       ├── skeleton
  │       │   └── Skeleton.tsx
  │       ├── switch
  │       │   ├── Switch.stories.tsx
  │       │   └── Switch.tsx
  │       └── tooltip
  │           ├── Tooltip.stories.tsx
  │           └── Tooltip.tsx
  ├── components.json
  ├── db
  │   ├── drizzle.ts
  │   └── schema.ts
  ├── drizzle.config.ts
  ├── eslint.config.mjs
  ├── features
  │   ├── auth
  │   │   ├── login
  │   │   │   └── LoginButton.tsx
  │   │   └── logout
  │   │       └── LogoutButton.tsx
  │   ├── integrations
  │   │   ├── components
  │   │   │   ├── IntegrationCard.tsx
  │   │   │   ├── IntergrationsList.tsx
  │   │   │   └── states
  │   │   ├── connectors
  │   │   │   ├── index.ts
  │   │   │   ├── jira.ts
  │   │   │   ├── slack.ts
  │   │   │   └── stripe.ts
  │   │   └── stripe
  │   │       ├── actions.ts
  │   │       └── types.ts
  │   ├── marketing
  │   │   ├── LandingPage.tsx
  │   │   └── components
  │   │       ├── CTA.tsx
  │   │       ├── Features.tsx
  │   │       ├── Hero.tsx
  │   │       ├── HowItWorks.tsx
  │   │       ├── LandingPageHeader.tsx
  │   │       └── LandingPageIntegrations.tsx
  │   ├── metrics
  │   │   ├── components
  │   │   │   ├── MetricCard.tsx
  │   │   │   ├── MetricsPageClient.tsx
  │   │   │   └── charts
  │   │   └── utils
  │   │       └── currency.ts
  │   ├── onboarding
  │   │   ├── components
  │   │   │   ├── OnboardingShell.tsx
  │   │   │   ├── OnboardingSuccessAlert.tsx
  │   │   │   └── WorkspaceCard.tsx
  │   │   └── lib
  │   │       └── createWorkspaces.ts
  │   ├── user
  │   │   ├── actions.ts
  │   │   ├── components
  │   │   │   ├── DefaultUserIcon.tsx
  │   │   │   ├── UserAvatar.tsx
  │   │   │   ├── UserProfile.tsx
  │   │   │   └── UserProfileForm.tsx
  │   │   ├── config.ts
  │   │   └── utils.ts
  │   └── workspace
  │       ├── actions.ts
  │       ├── components
  │       │   ├── WorkspaceIntegrations.tsx
  │       │   └── WorkspaceSelector.tsx
  │       └── config.ts
  ├── hooks
  │   ├── useActivePage.ts
  │   ├── useBreadcrumbs.ts
  │   ├── useMobile.ts
  │   └── useScrolled.ts
  ├── lib
  │   ├── i18n
  │   │   ├── config.ts
  │   │   ├── navigation.ts
  │   │   ├── request.ts
  │   │   └── routing.ts
  │   └── utils.ts
  ├── messages
  │   ├── de.json
  │   └── en.json
  ├── middleware.ts
  ├── migrations
  │   ├── 0000_fuzzy_skrulls.sql
  │   ├── 0001_zippy_scourge.sql
  │   ├── 0002_bent_human_cannonball.sql
  │   └── meta
  │       ├── 0000_snapshot.json
  │       ├── 0001_snapshot.json
  │       ├── 0002_snapshot.json
  │       └── _journal.json
  ├── next-env.d.ts
  ├── next.config.ts
  ├── package.json
  ├── pnpm-lock.yaml
  ├── postcss.config.mjs
  ├── public
  │   ├── file.svg
  │   ├── github.svg
  │   ├── globe.svg
  │   ├── hubspot.svg
  │   ├── jira.svg
  │   ├── lp_hero.jpg
  │   ├── next.svg
  │   ├── slack.svg
  │   ├── stripe.svg
  │   ├── vercel.svg
  │   └── window.svg
  ├── scripts
  │   ├── generateStripeTestData.ts
  │   └── seedDatabase.ts
  ├── tsconfig.json
  ├── types
  │   ├── AppUser.ts
  │   ├── StripeWorkspaceIntegrationConfig.ts
  │   └── workspace.ts
  ├── vitest.config.ts
  └── vitest.shims.d.ts
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/kpi-bot.git
cd kpi-bot
pnpm install
```

### 2. Setup Environment Variables

Create a .env file in the root with:

```bash
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  CLERK_PUBLISHABLE_KEY=...
  CLERK_SECRET_KEY=...
  DATABASE_URL=...
  STRIPE_CLIENT_ID=...
  STRIPE_CLIENT_SECRET=...
```

Use Clerk for authentication and Stripe dashboard to create your developer credentials.

### 3. Run the Dev Server

```bash
pnpm dev
```

## 🧪 Seeding Stripe Test Data

To generate realistic Stripe data for a workspace:

- Make sure you have a connected Stripe test account

- Add product + price(s) to that Stripe account

- Add the access token to your .env (e.g. PANTRY_MATE_STRIPE_ACCESS_TOKEN)

Run:

```bash
  pnpm seed:stripe
```

This script creates test customers, subscriptions, and simulates churn for testing.

## 📈 Metrics You Can Track

| Metric                          | Source | Description                                          |
| ------------------------------- | ------ | ---------------------------------------------------- |
| MRR (Monthly Recurring Revenue) | Stripe | Sum of all active subscriptions (monthly equivalent) |
| ARR (Annual Recurring Revenue)  | Stripe | MRR x 12                                             |
| New Subscriptions               | Stripe | Created in the last 30 days                          |
| Churned Customers               | Stripe | Subscriptions canceled in the last 30 days           |
| Churn Rate                      | Stripe | % of churned / (churned + active subs)               |

More metrics (HubSpot deals, Pipedrive leads, etc.) coming soon.

## 🔒 Security

All API requests are scoped to the authenticated user's workspaces

Integration tokens (e.g. Stripe access token) are stored securely in the database

Rate limiting and caching layers (optional) can be added later

## 🧠 Future Roadmap

- HubSpot integration (CRM deal tracking)

- Pipedrive integration

- Slack alerts / daily summaries

- Workspace roles (viewer, admin)

- Metric alerts and historical graphs

## 🤝 Contributing

PRs welcome! If you’re interested in contributing integrations, UI improvements, or new metrics, open an issue or fork the repo.

## 📄 License

MIT — free for personal and commercial use.

## 🧠 Inspiration

KPI-bot was born out of the need to make internal company metrics visible to small SaaS teams without having to build a full BI stack. It's opinionated, minimal, and focused on clarity.
