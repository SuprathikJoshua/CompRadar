"use client";

import { useState } from "react";
import {
  Activity,
  Database,
  ExternalLink,
  Globe2,
  Plus,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const rivals = [
  {
    name: "Oxylabs",
    mark: "O",
    description: "Web scraping infrastructure and proxy intelligence.",
    website: "oxylabs.io",
    tone: "violet",
    status: "Healthy",
    lastScan: "18 min ago",
    changes: 4,
    surfaces: ["Pricing", "Changelog", "Positioning"],
    health: 99.8,
  },
  {
    name: "Apify",
    mark: "A",
    description: "Cloud platform for web automation and data extraction.",
    website: "apify.com",
    tone: "orange",
    status: "Healthy",
    lastScan: "42 min ago",
    changes: 7,
    surfaces: ["Pricing", "Changelog", "Positioning"],
    health: 100,
  },
  {
    name: "Firecrawl",
    mark: "F",
    description: "Developer-first crawling and structured web data APIs.",
    website: "firecrawl.dev",
    tone: "cyan",
    status: "Healthy",
    lastScan: "1 hr ago",
    changes: 6,
    surfaces: ["Pricing", "Changelog", "Positioning"],
    health: 100,
  },
];

export default function Rivals() {
  const [running, setRunning] = useState(false);

  function runScrapers() {
    setRunning(true);
    window.setTimeout(() => {
      setRunning(false);
    }, 1600);
  }

  return (
    <div className="w-full min-h-screen pb-12 text-slate-200">
      {/* Upper section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 px-6 py-8 md:px-10 md:py-10 shadow-lg">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-slate-900/0" />

        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-400">
              Target registry / active
            </p>

            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Monitored competitors
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Active targets tracked across pricing, changelogs, and positioning copy.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="size-4" />
              Add competitor
            </button>

            <button
              type="button"
              onClick={runScrapers}
              disabled={running}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] disabled:opacity-70 disabled:hover:shadow-none"
            >
              <RefreshCw className={cn("size-4", running && "animate-spin")} />
              {running ? "Running..." : "Run all scrapers"}
            </button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric
          icon={<Globe2 />}
          label="Total rivals"
          value="03"
          detail="All active"
        />

        <Metric
          icon={<Database />}
          label="Tracked surfaces"
          value="09"
          detail="3 per rival"
        />

        <Metric
          icon={<ShieldCheck />}
          label="Scraper health"
          value="100%"
          detail="Self-healing enabled"
          accent
        />
      </section>

      {/* Rival registry block */}
      <section className="mt-10">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white">Rival registry</h2>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-slate-300 border border-slate-700">
                3 active
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Your competitive monitoring targets and current collection state.
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            Manage targets
            <ExternalLink className="size-3.5" />
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          {rivals.map((rival) => (
            <RivalCard key={rival.name} rival={rival} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ icon, label, value, detail, accent = false }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-5 transition-colors hover:border-cyan-500/30 hover:bg-slate-800/50">
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl [&>svg]:size-5",
          accent
            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
            : "bg-slate-800 text-slate-400 border border-slate-700"
        )}
      >
        {icon}
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>

        <div className="mt-1 flex items-baseline gap-3">
          <span className="font-mono text-2xl font-bold tracking-tight text-white">
            {value}
          </span>
          <span className="text-xs font-medium text-slate-500">{detail}</span>
        </div>
      </div>
    </div>
  );
}

function RivalCard({ rival }) {
  const toneClasses = {
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-800/40 hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]">
      {/* Top subtle glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-xl border font-mono text-xl font-bold shadow-sm",
              toneClasses[rival.tone]
            )}
          >
            {rival.mark}
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">{rival.name}</h3>
            <a
              href={`https://${rival.website}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 transition-colors hover:text-cyan-400"
            >
              {rival.website}
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-400">
          <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_currentColor]" />
          {rival.status}
        </span>
      </div>

      <p className="mt-5 min-h-[48px] text-sm leading-relaxed text-slate-400">
        {rival.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {rival.surfaces.map((surface) => (
          <span
            key={surface}
            className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-300"
          >
            {surface}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Collection health
          </span>
          <span className="font-mono text-xs font-medium text-cyan-400">{rival.health}%</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            style={{ width: `${rival.health}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Changes found
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-white">
            {rival.changes}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Last scan
          </p>
          <p className="mt-1 text-sm font-medium text-slate-300 pt-1">
            {rival.lastScan}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/30 py-2.5 text-xs font-medium text-slate-300 transition-all hover:border-cyan-500/40 hover:bg-slate-800 hover:text-cyan-400"
      >
        <Activity className="size-3.5" />
        Open rival details
      </button>
    </article>
  );
}