import { cn } from '../../utils/cn';

export default function PageHeader({ eyebrow, heading, subtitle, actions, metrics, className }) {
  return (
    <div className={cn("mb-8 space-y-4", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <div className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-1">
              {eyebrow}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-50">
            {heading}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 font-sans max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {metrics && (
        <div className="pt-4 border-t border-navy-800/80">
          {metrics}
        </div>
      )}
    </div>
  );
}
