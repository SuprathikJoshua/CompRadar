"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  Check,
  ChevronDown,
  CircleAlert,
  Code2,
  Filter,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ----------------------------------------------------------------------
// 1. UTILITY & DATA
// ----------------------------------------------------------------------

// Updated mock data to match the screenshot
const healEvents = [
  {
    rival: "Apify",
    time: "42 min ago",
    selector: "#pricing-grid-v2",
    target: "Apify pricing page",
    recovery: "Re-mapped to .plan-card-2026",
    confidence: "99.4% confidence",
    speed: "1.8s",
  },
  {
    rival: "Oxylabs",
    time: "3h ago",
    selector: '[data-testid="plan-card"]',
    target: "Oxylabs pricing",
    recovery: "Re-mapped to .pricing-tier-card",
    confidence: "98.2% confidence",
    speed: "2.1s",
  },
];

// ----------------------------------------------------------------------
// 2. MAIN COMPONENT
// ----------------------------------------------------------------------

export default function SelfHealPage() {
  const [rival, setRival] = useState("All rivals");

  const filteredEvents = useMemo(() => {
    return healEvents.filter(
      (event) => rival === "All rivals" || event.rival === rival,
    );
  }, [rival]);

  return (
    <>
      {/* Header Section */}
      <section className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-400">
            <span className="size-2 animate-pulse rounded-full bg-teal-400 shadow-[0_0_8px_currentColor]" />
            Live recovery stream
          </p>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Self-heal inspector
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            A transparent audit trail for every broken selector Bright Data recovered
            without a data gap.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-teal-400">
          <span className="size-2 animate-pulse rounded-full bg-teal-400" />
          Stream connected
        </div>
      </section>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-2">
        <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 p-1">
          <div className="pl-2">
            <Filter className="size-4 text-slate-400" />
          </div>
          <label className="relative flex items-center">
            <span className="sr-only">Filter self-heal events by rival</span>
            <select
              value={rival}
              onChange={(event) => setRival(event.target.value)}
              className="appearance-none bg-transparent py-1.5 pl-2 pr-8 text-sm font-medium text-white outline-none cursor-pointer"
            >
              <option>All rivals</option>
              <option>Oxylabs</option>
              <option>Apify</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 size-3.5 text-slate-400" />
          </label>
        </div>

        <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 font-mono text-[10px] text-teal-400">
          {filteredEvents.length} recoveries
        </span>
      </div>

      {/* Terminal / Recovery Stream */}
      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1118]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-800 bg-slate-900/50 px-5 py-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-teal-400 font-bold">&gt;_</span>
            <span className="font-mono text-sm text-teal-400">
              rivalscope/recovery-stream
            </span>
          </div>

          <span className="font-mono text-[10px] tracking-widest text-slate-500">
            STATUS: NOMINAL
          </span>
        </div>

        <div className="flex flex-col divide-y divide-slate-800/80">
          {filteredEvents.map((event, index) => (
            <article key={`${event.rival}-${index}`} className="p-5 md:p-6">
              
              {/* Header tags row */}
              <div className="mb-5 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center justify-center rounded-full bg-amber-500/10 p-1.5">
                    <CircleAlert className="size-4 text-amber-500" />
                  </div>
                  
                  <span className="font-mono text-xs font-semibold text-amber-500">
                    [{event.time}]
                  </span>

                  <span className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-500">
                    Broken Selector
                  </span>

                  <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                    {event.rival}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-xs text-teal-400">
                  <Check className="size-3" />
                  No data gap
                </div>
              </div>

              {/* Selector broken message */}
              <div className="mb-5 font-mono text-sm text-slate-400">
                <span className="font-bold text-white">{event.selector}</span>{" "}
                missing in DOM
              </div>

              {/* Detail cards */}
              <div className="grid gap-3 md:grid-cols-3">
                <LogCell
                  icon={<Code2 />}
                  label="Target"
                  value={event.target}
                />
                <LogCell
                  icon={<Bot />}
                  label="AI Self-Heal Action"
                  value={event.recovery}
                />
                <LogCell
                  icon={<ShieldCheck />}
                  label="Confidence"
                  value={event.confidence}
                />
              </div>

              {/* Footer status */}
              <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500">
                <Sparkles className="size-3.5 text-teal-400" />
                Bright Data AI Self-Healing trigger confirmed · remapped in {event.speed}
              </div>
            </article>
          ))}

          {filteredEvents.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-sm font-medium text-white">No recovery events found</p>
              <p className="mt-1 text-xs text-slate-400">
                Try selecting another rival.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ----------------------------------------------------------------------
// 3. SUBCOMPONENTS
// ----------------------------------------------------------------------

function LogCell({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-transparent bg-slate-800/40 p-4 transition-colors hover:bg-slate-800/60">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
        <span className="[&>svg]:size-3.5">{icon}</span>
        {label}
      </div>

      <p className="mt-3 truncate text-sm font-medium text-white">{value}</p>
    </div>
  );
}