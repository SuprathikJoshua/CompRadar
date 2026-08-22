import { ExternalLink, Code2, Clock, Globe } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { cn } from '../../utils/cn';

export default function ChangeCard({ change, onViewDiff }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-navy-900 border border-navy-800 p-6 shadow-dark-card transition-all duration-300 hover:border-slate-700 hover:shadow-cyan-subtle flex flex-col justify-between">
      
      {/* Card Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Rival Mark & Name */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-9 h-9 rounded-xl border flex items-center justify-center font-mono font-bold text-xs shrink-0",
              change.rivalMarkBg || "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
            )}>
              {change.rivalMark}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wide text-slate-200 uppercase">
                  {change.rivalName}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  • Verified Payload
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-slate-500" />
                {change.timestamp}
              </span>
            </div>
          </div>

          {/* Badges: Type & Severity */}
          <div className="flex items-center gap-2">
            <StatusBadge type={change.type} />
            <StatusBadge value={change.severity} />
          </div>

        </div>

        {/* Change Title */}
        <h3 className="text-base font-semibold font-sans text-slate-100 mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
          {change.title}
        </h3>

        {/* Plain-English Summary */}
        <p className="text-xs font-sans text-slate-300 leading-relaxed bg-navy-950/60 p-3.5 rounded-xl border border-navy-800/80 mb-5">
          {change.summary}
        </p>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between gap-2 mt-auto">
        <a
          href={change.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>View live source</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={() => onViewDiff(change)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-850 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-navy-800 hover:border-cyan-500/40 text-xs font-mono transition-all group/btn"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:rotate-12 transition-transform" />
          <span>View raw diff</span>
        </button>
      </div>

    </div>
  );
}
