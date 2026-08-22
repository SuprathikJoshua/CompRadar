import { cn } from '../../utils/cn';

export default function StatCard({ icon: Icon, label, value, subtext, trend, accentColor = 'cyan', className }) {
  const isAmber = accentColor === 'amber';
  
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[24px] bg-navy-900/90 border border-navy-800 p-6 shadow-dark-card transition-all duration-300 hover:border-slate-700/80 hover:shadow-cyan-subtle group",
      className
    )}>
      {/* Background glow overlay */}
      <div className={cn(
        "absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20 pointer-events-none",
        isAmber ? "bg-amber-500" : "bg-cyan-500"
      )} />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-wider uppercase text-slate-400 font-medium">
          {label}
        </span>
        {Icon && (
          <div className={cn(
            "p-2.5 rounded-xl border transition-colors duration-200",
            isAmber 
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:border-amber-500/40" 
              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/40"
          )}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-3xl lg:text-4xl font-mono font-bold tracking-tight text-slate-50">
          {value}
        </div>
        {trend && (
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}
