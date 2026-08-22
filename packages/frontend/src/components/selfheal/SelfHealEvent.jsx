import { ShieldCheck, Cpu } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function SelfHealEvent({ event }) {
  return (
    <div className="rounded-2xl bg-navy-950/80 border border-navy-800 p-4 font-mono text-xs hover:border-slate-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-navy-800/80">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-200 font-bold tracking-wide">
            {event.target}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            Confidence: {event.confidenceScore}
          </span>
          <StatusBadge value={event.verification || 'Recovered'} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-slate-300">
        <div className="p-2.5 rounded-xl bg-navy-900 border border-navy-800">
          <span className="text-[10px] uppercase text-orange-400 block mb-1 font-semibold">
            Selector Failure Detected:
          </span>
          <code className="text-slate-300 text-[11px] block truncate">
            {event.selectorBroke}
          </code>
        </div>

        <div className="p-2.5 rounded-xl bg-navy-900 border border-navy-800">
          <span className="text-[10px] uppercase text-cyan-400 block mb-1 font-semibold">
            Automated System Resolution:
          </span>
          <span className="text-slate-300 text-[11px] block truncate">
            {event.systemRecovery}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified no data gap</span>
        </span>
        <span>{event.timestamp}</span>
      </div>
    </div>
  );
}
