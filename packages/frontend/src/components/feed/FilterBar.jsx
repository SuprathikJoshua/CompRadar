import { Filter, RotateCcw } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FilterBar({ 
  selectedRival, 
  setSelectedRival, 
  selectedType, 
  setSelectedType, 
  selectedSeverity, 
  setSelectedSeverity,
  rivalsList = []
}) {

  const typesList = ['All changes', 'Price', 'Changelog', 'Copy'];
  const severitiesList = ['All severity', 'Major', 'Minor'];

  const hasActiveFilters = selectedRival !== 'All rivals' || selectedType !== 'All changes' || selectedSeverity !== 'All severity';

  const resetFilters = () => {
    setSelectedRival('All rivals');
    setSelectedType('All changes');
    setSelectedSeverity('All severity');
  };

  return (
    <div className="p-4 rounded-[20px] bg-navy-900/90 border border-navy-800 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      
      {/* Filter Options Group */}
      <div className="flex flex-wrap items-center gap-3">
        
        <div className="flex items-center gap-2 pr-2 text-xs font-mono text-slate-400 border-r border-navy-800">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="uppercase">Filters:</span>
        </div>

        {/* Rival Selector Dropdown / Pills */}
        <select
          value={selectedRival}
          onChange={(e) => setSelectedRival(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 hover:border-slate-700 transition-colors"
        >
          <option value="All rivals">All rivals</option>
          {rivalsList.map(r => (
            <option key={r.id} value={r.name}>{r.name}</option>
          ))}
        </select>

        {/* Type Filter Pills */}
        <div className="flex items-center bg-navy-950 p-1 rounded-xl border border-navy-800 overflow-x-auto">
          {typesList.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 whitespace-nowrap",
                selectedType === t 
                  ? "bg-cyan-500 text-navy-950 font-bold shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Severity Filter Pills */}
        <div className="flex items-center bg-navy-950 p-1 rounded-xl border border-navy-800">
          {severitiesList.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSeverity(s)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 whitespace-nowrap",
                selectedSeverity === s 
                  ? "bg-amber-500 text-navy-950 font-bold shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 text-xs font-mono text-cyan-400 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      )}

    </div>
  );
}
