import { useMemo, useState } from "react";
import {
  ChevronDown,
  Clock3,
  ExternalLink,
  Filter,
  ArrowUpRight
} from "lucide-react";

import { feedData } from "../data/feedData";

export default function ChangeFeed() {
  const [rival, setRival] = useState("All rivals");
  const [changeType, setChangeType] = useState("All changes");
  const [severity, setSeverity] = useState("All severity");

  const filteredFeed = useMemo(() => {
    return feedData.filter((item) => {
      const rivalMatch = rival === "All rivals" || item.rival === rival;
      const changeMatch = changeType === "All changes" || item.type === changeType;
      const severityMatch = severity === "All severity" || item.severity === severity;

      return rivalMatch && changeMatch && severityMatch;
    });
  }, [rival, changeType, severity]);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">
              Change feed
            </h2>
            <span
              className="
                px-2.5 py-1
                rounded-full
                text-xs font-medium
                text-slate-400
                bg-white/5
              "
            >
              {filteredFeed.length} events
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Newest signals from monitored surfaces.
          </p>
        </div>

        <button className="text-slate-400 text-sm flex items-center gap-1.5 hover:text-white transition-colors">
          Manage rivals
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Filter Bar */}
      <div
        className="
          flex items-center gap-4
          rounded-xl
          px-4 py-3
          mb-6
          border border-white/10
          bg-[#0B1221]
        "
      >
        <div className="pr-4 border-r border-white/10 text-slate-500">
          <Filter size={16} />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={rival}
            onChange={setRival}
            options={[
              "All rivals",
              "Oxylabs",
              "Apify",
              "Firecrawl",
            ]}
          />

          <Select
            value={changeType}
            onChange={setChangeType}
            options={[
              "All changes",
              "Price",
              "Changelog",
              "Copy",
            ]}
          />

          <Select
            value={severity}
            onChange={setSeverity}
            options={[
              "All severity",
              "Major",
              "Minor",
            ]}
          />
        </div>
      </div>

      {/* Feed Cards */}
      <div className="space-y-4">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            className="
              rounded-xl
              border border-white/10
              bg-[#0B1221]
              overflow-hidden
            "
          >
            {/* Card Body */}
            <div className="p-5 flex gap-4">
              <div
                className="
                  w-10 h-10 shrink-0
                  rounded-full
                  bg-[#2B2144]
                  flex items-center justify-center
                  font-bold text-slate-300 text-sm
                "
              >
                {item.score}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-base font-bold text-white">
                    {item.rival}
                  </h3>

                  <div className="flex gap-2">
                    <span
                      className="
                        px-2 py-0.5
                        rounded text-[10px] font-mono tracking-wider
                        border border-[#E59B55]/20
                        bg-[#E59B55]/10
                        text-[#E59B55]
                      "
                    >
                      {item.type.toUpperCase()}
                    </span>

                    <span
                      className="
                        px-2 py-0.5
                        rounded text-[10px] font-mono tracking-wider
                        border border-[#E59B55]/20
                        bg-[#E59B55]/10
                        text-[#E59B55]
                      "
                    >
                      {item.severity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h4 className="text-[15px] font-semibold text-white mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 py-3 border-t border-white/5 bg-black/10 flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 uppercase font-mono tracking-widest">
                <Clock3 size={14} />
                {item.time}
              </div>

              <div className="flex items-center gap-5 text-[11px] font-mono tracking-widest font-semibold">
                <button className="text-[#35D7D7] uppercase hover:text-cyan-300 transition-colors">
                  VIEW RAW DIFF
                </button>

                <a 
                  href="#" 
                  className="text-slate-500 uppercase flex items-center gap-1.5 hover:text-slate-300 transition-colors"
                >
                  {item.source}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Select({ value, onChange, options }) {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none
          rounded-full
          pl-4 pr-9 py-1.5
          text-sm text-slate-200
          bg-transparent
          border border-white/10
          hover:border-white/20
          focus:border-[#35D7D7]/50
          outline-none
          cursor-pointer
          transition-colors
        "
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0B1221] text-white">
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="
          absolute
          right-3.5
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
          group-hover:text-slate-200
          transition-colors
        "
      />
    </div>
  );
}