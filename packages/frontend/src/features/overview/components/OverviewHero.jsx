import { RefreshCw, Globe2, Activity, ShieldCheck } from "lucide-react";

const cyan = "#35D7D7";
const bg = "#020817";
const muted = "#8AA0B8";
const borderColor = "rgba(255,255,255,0.06)";

export default function OverviewHero() {
  return (
    <section
      className="relative w-full overflow-hidden border-b"
      style={{ background: bg, borderColor: borderColor }}
    >
      {/* 
        The background light/glow div has been removed to achieve 
        the clean, flat dark look from the target image. 
      */}

      <div className="relative px-6 sm:px-8 pt-8 pb-8 max-w-7xl mx-auto">
        {/* Live monitoring label */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-block rounded-full"
            style={{ width: 6, height: 6, background: cyan }}
          />
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: cyan }}
          >
            Live Monitoring
          </span>
        </div>

        {/* Headline left, run scan right */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <h1
              className="font-bold text-white"
              style={{
                lineHeight: 1.15,
                fontSize: "clamp(26px, 3.5vw, 44px)",
              }}
            >
              Know what changed
              <br />
              before your team asks.
            </h1>

            <p
              className="mt-3 text-sm sm:text-base"
              style={{ color: muted, maxWidth: "650px" }}
            >
              A calm, high-signal view of every meaningful move across
              Oxylabs, Apify, and Firecrawl.
            </p>
          </div>

          <div style={{ flexShrink: 0 }}>
            <button
              type="button"
              className="group flex items-center gap-3 rounded-full pl-7 pr-6 transition-transform duration-300 hover:scale-[1.03]"
              style={{ height: 38, background: cyan, color: "#021018" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(53,215,215,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <RefreshCw
                size={16}
                strokeWidth={2.25}
                className="transition-transform duration-500 group-hover:rotate-180"
              />
              <span className="text-sm font-semibold">Run scan</span>
              <span
                className="self-stretch w-px my-2"
                style={{ background: "rgba(2,16,24,0.25)" }}
              />
              <span className="text-[11px] font-mono uppercase tracking-wider opacity-80">
                Now
              </span>
            </button>
          </div>
        </div>

        {/* Stats strip - Rebuilt as a single continuous container to remove gaps */}
        <div
          className="mt-10 flex flex-col md:flex-row rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: `1px solid ${borderColor}`,
          }}
        >
          {/* Stat 1: Rivals Tracked */}
          <div
            className="flex-1 flex items-center gap-4 px-6 py-5 border-b md:border-b-0 md:border-r"
            style={{ borderColor: borderColor }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 40, height: 40, background: "rgba(255,255,255,0.03)" }}
            >
              <Globe2 size={18} style={{ color: muted }} strokeWidth={1.5} />
            </div>
            <div>
              <div
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: muted }}
              >
                Rivals Tracked
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-white">03</span>
                <span className="text-xs" style={{ color: muted }}>
                  All monitored
                </span>
              </div>
            </div>
          </div>

          {/* Stat 2: Changes This Week */}
          <div
            className="flex-1 flex items-center gap-4 px-6 py-5 border-b md:border-b-0 md:border-r"
            style={{ borderColor: borderColor }}
          >
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 40, height: 40, background: "rgba(255,255,255,0.03)" }}
            >
              <Activity size={18} style={{ color: muted }} strokeWidth={1.5} />
            </div>
            <div>
              <div
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: muted }}
              >
                Changes This Week
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-white">17</span>
                <span className="text-xs" style={{ color: muted }}>
                  +24% vs last week
                </span>
              </div>
            </div>
          </div>

          {/* Stat 3: Self-Heal Events */}
          <div className="flex-1 flex items-center gap-4 px-6 py-5">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 40, height: 40, background: "rgba(53,215,215,0.05)" }}
            >
              <ShieldCheck size={18} style={{ color: cyan }} strokeWidth={1.5} />
            </div>
            <div>
              <div
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: muted }}
              >
                Self-Heal Events
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-white">08</span>
                <span className="text-xs" style={{ color: muted }}>
                  100% recovered
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}