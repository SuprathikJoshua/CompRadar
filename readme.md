# CompRadar

Automated competitive intelligence. CompRadar watches a rival's pricing pages, changelogs, and product copy, detects what changed, and turns the diff into a plain-English summary — with self-healing scrapers that keep working even when a rival redesigns their site.

Built for **Into the Scrape-Verse** (WeMakeDevs × Bright Data hackathon).

## How it works

```
Rival → Target (price / changelog / copy) → Snapshot → Change → Alert
                                                 ↓
                                            HealEvent (when a scraper breaks)
```

1. A **Target** (a specific page on a rival's site) is scraped on a schedule.
2. Each scrape produces a **Snapshot** with a content hash, plus structured data (price details, changelog entries, or copy blocks).
3. Consecutive snapshots are diffed into a **Change**, summarized in plain English.
4. Changes fan out to **Alerts** on configured channels.
5. If a scraper's selector breaks (site redesign), a **HealEvent** is logged and Bright Data's self-heal flow repairs the collector automatically.

## Architecture

Monorepo with two packages:

| Package             | Stack                                           | Role                                                    |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `packages/backend`  | Bun, Express 5, Prisma 7, PostgreSQL (Supabase) | REST API, scraping, diffing, scheduling, self-heal      |
| `packages/frontend` | React 19, Vite, Tailwind, Zustand, React Router | Dashboard for rivals, changes, alerts, self-heal status |

### Scraping

Two independent scraper providers via Bright Data, run in the same daily cycle so one provider's failure doesn't block the other:

- **Apify** collector (`scrapeApifyPrice`)
- **Firecrawl** collector (`scrapeFirecrawlPrice`)

Both go through `lib/brightData.ts` (trigger + poll) and `lib/brightDataHeal.ts`, which shells out to the Bright Data CLI to auto-heal a collector when its selector breaks.

### Scheduling

`lib/scheduler.ts` runs a daily cron job (`node-cron`, `0 0 * * *`) that fires both scrapers. A manual trigger endpoint exists for on-demand scrapes, rate-limited per target to a 24-hour cooldown and a 3-per-week cap (checked and recorded before the scrape runs, since every attempt burns a Bright Data credit regardless of outcome).

## API

All routes are mounted under `/api`.

| Method | Route                | Description                                           |
| ------ | -------------------- | ----------------------------------------------------- |
| `GET`  | `/changes`           | List detected changes                                 |
| `GET`  | `/changes/:id`       | Get a single change                                   |
| `GET`  | `/alerts`            | List sent alerts                                      |
| `GET`  | `/heal-events`       | List self-heal events                                 |
| `GET`  | `/stats`             | Dashboard summary stats                               |
| `POST` | `/scrapeManual`      | Manually trigger a scrape for a target (rate-limited) |
| `GET`  | `/scheduler/run-now` | Fire the full daily scrape cycle immediately          |

## Getting started

### Prerequisites

- [Bun](https://bun.com) (backend)
- Node.js (frontend, via Vite)
- A PostgreSQL database (project targets Supabase)
- Bright Data account with an Apify and a Firecrawl price collector configured

### Backend

```bash
cd packages/backend
bun install
```

Create a `.env` in `packages/backend`:

```bash
DATABASE_URL=postgresql://...
BRIGHT_DATA_API_TOKEN=...
BD_APIFY_PRICE_COLLECTOR_ID=...
BD_FIRECRAWL_PRICE_COLLECTOR_ID=...
PORT=4000
```

Push the Prisma schema and start the dev server:

```bash
bunx prisma migrate deploy   # or `bunx prisma db push` for a first-time setup
bun run dev
```

> **Bright Data Studio gotcha:** the "Save to production" dropdown defaults to "Save to development." CLI/API-triggered runs only hit production — a development save will look like it did nothing.

### Frontend

```bash
cd packages/frontend
npm install
npm run dev
```

## Data model

Core Prisma models: `Rival`, `Target`, `Snapshot` (with `PriceDetail` / `ChangelogEntry` / `CopyBlock`), `Change`, `HealEvent`, `AlertSent`, `ManualTrigger`. Full schema in `packages/backend/prisma/schema.prisma`.

## Project structure

```
CompRadar/
├── docs/
├── packages/
│   ├── backend/
│   │   ├── prisma/schema.prisma
│   │   └── src/
│   │       ├── controllers/
│   │       ├── routes/
│   │       ├── services/        # scrapeApifyPrice, scrapeFirecrawlPrice
│   │       ├── lib/              # brightData, brightDataHeal, scheduler, prisma
│   │       └── middleware/
│   └── frontend/
│       └── src/
│           ├── pages/            # Overview, Workspace, Rivals, Alerts, SelfHeal, Settings
│           ├── components/
│           ├── hooks/
│           ├── services/
│           └── store/
```

## License

No license file yet — all rights reserved by default until one is added.
