import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 px-12 flex items-center justify-between">
      
      {/* Left Section */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">
          Command Center / Overview
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-white">
          Competitive intelligence
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center gap-3 h-11 w-[220px] rounded-full border border-slate-800 bg-slate-950 px-4">
          
          <Search
            size={16}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search events"
            className="
              flex-1
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-slate-500
            "
          />

          <div className="rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400">
            ⌘ K
          </div>
        </div>

        {/* Notification */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-slate-800
            hover:border-slate-700
          "
        >
          <Bell
            size={18}
            className="text-slate-400"
          />
        </button>

        {/* Avatar */}
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-cyan-400
            font-semibold
            text-slate-950
          "
        >
          JD
        </div>
      </div>
    </header>
  );
}