import { cn } from '../../utils/cn';

export default function StatusBadge({ type, value, className }) {
  // Determine variant styling based on value or type
  let variantStyle = 'bg-slate-800/80 text-slate-300 border-slate-700/60';

  const lowerValue = String(value || type || '').toLowerCase();

  if (lowerValue === 'price') {
    variantStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]';
  } else if (lowerValue === 'changelog') {
    variantStyle = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.15)]';
  } else if (lowerValue === 'copy' || lowerValue === 'positioning') {
    variantStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]';
  } else if (lowerValue === 'major') {
    variantStyle = 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-semibold';
  } else if (lowerValue === 'minor') {
    variantStyle = 'bg-navy-800 text-slate-400 border-navy-700';
  } else if (lowerValue === 'sent' || lowerValue === 'healthy' || lowerValue === 'recovered') {
    variantStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  } else if (lowerValue === 'fail' || lowerValue === 'failed') {
    variantStyle = 'bg-orange-500/15 text-orange-400 border-orange-500/40 font-semibold';
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide border uppercase",
      variantStyle,
      className
    )}>
      {(lowerValue === 'sent' || lowerValue === 'healthy' || lowerValue === 'recovered') && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {(lowerValue === 'fail' || lowerValue === 'failed') && (
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
      )}
      {value || type}
    </span>
  );
}
