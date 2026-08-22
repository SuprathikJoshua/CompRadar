import { Globe, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { cn } from '../../utils/cn';

export default function RivalCard({ rival, onSelect }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-navy-900 border border-navy-800 p-6 shadow-dark-card transition-all duration-300 hover:border-slate-700 hover:shadow-cyan-subtle flex flex-col justify-between">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl border flex items-center justify-center font-mono font-bold text-sm shadow-md shrink-0",
              rival.markBg || "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
            )}>
              {rival.mark}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-sans text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {rival.name}
                </h3>
                <StatusBadge value={rival.status || 'Healthy'} />
              </div>
              <a
                href={`https://${rival.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
              >
                <Globe className="w-3 h-3 text-slate-500" />
                <span>{rival.website}</span>
              </a>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Active Surfaces</span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {rival.surfaces.length} / 3
            </span>
          </div>

        </div>

        {/* Description */}
        <p className="text-xs font-sans text-slate-300 leading-relaxed mb-4">
          {rival.description}
        </p>

        {/* Monitored Surface Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {rival.surfaces.map(surface => (
            <span 
              key={surface}
              className="px-2.5 py-1 rounded-xl bg-navy-950 border border-navy-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
            >
              <Layers className="w-3 h-3 text-cyan-400" />
              {surface}
            </span>
          ))}
        </div>

        {/* Collection Health Progress Bar */}
        <div className="p-4 rounded-2xl bg-navy-950/80 border border-navy-800 mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Collection Health
            </span>
            <span className="text-cyan-400 font-bold">{rival.healthPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-navy-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${rival.healthPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
            <span>{rival.changesCount} signals detected</span>
            <span>Last scan: {rival.lastScan}</span>
          </div>
        </div>

      </div>

      {/* Card Action Button */}
      <button
        onClick={() => onSelect && onSelect(rival)}
        className="w-full py-2.5 rounded-xl bg-navy-850 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-400 border border-navy-800 hover:border-cyan-500/40 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all group/btn"
      >
        <span>Open rival details</span>
        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
