import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ title = 'No results found', description = 'Try adjusting your filters or search term to see monitored signals.', onReset }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-[24px] bg-navy-900/60 border border-navy-800 my-4">
      <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 shadow-cyan-subtle">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-200 mb-1 font-sans">
        {title}
      </h3>
      <p className="text-xs text-slate-400 max-w-sm font-sans mb-5 leading-relaxed">
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset filters
        </button>
      )}
    </div>
  );
}
