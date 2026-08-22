import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';
import FilterBar from './FilterBar';
import ChangeCard from './ChangeCard';
import RawDiffDialog from '../common/RawDiffDialog';
import EmptyState from '../common/EmptyState';

export default function ChangeFeed({ changes = [], rivals = [] }) {
  const navigate = useNavigate();
  const [selectedRival, setSelectedRival] = useState('All rivals');
  const [selectedType, setSelectedType] = useState('All changes');
  const [selectedSeverity, setSelectedSeverity] = useState('All severity');
  const [activeDiffChange, setActiveDiffChange] = useState(null);

  // Filter changes array dynamically
  const filteredChanges = changes.filter(c => {
    const matchRival = selectedRival === 'All rivals' || c.rivalName === selectedRival;
    const matchType = selectedType === 'All changes' || c.type === selectedType;
    const matchSeverity = selectedSeverity === 'All severity' || c.severity === selectedSeverity;
    return matchRival && matchType && matchSeverity;
  });

  return (
    <section className="mb-12">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  // import React from 'react';
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-cyan-subtle">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-sans text-slate-100">
                Change feed
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
                {filteredChanges.length} events
              </span>
            </div>
            <p className="text-xs font-sans text-slate-400 mt-0.5">
              Newest signals from monitored surfaces.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/rivals')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 border border-navy-800 hover:border-cyan-500/40 text-xs font-mono text-cyan-400 transition-all shrink-0 self-start sm:self-auto"
        >
          <span>Manage rivals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Control Bar */}
      <FilterBar 
        selectedRival={selectedRival}
        setSelectedRival={setSelectedRival}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        rivalsList={rivals}
      />

      {/* Feed Grid or Empty State */}
      {filteredChanges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChanges.map(change => (
            <ChangeCard 
              key={change.id}
              change={change}
              onViewDiff={(c) => setActiveDiffChange(c)}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No changes match your active filters"
          description="Try selecting a different rival, change category, or severity level."
          onReset={() => {
            setSelectedRival('All rivals');
            setSelectedType('All changes');
            setSelectedSeverity('All severity');
          }}
        />
      )}

      {/* Raw Diff Dialog Modal */}
      <RawDiffDialog 
        change={activeDiffChange}
        isOpen={Boolean(activeDiffChange)}
        onClose={() => setActiveDiffChange(null)}
      />

    </section>
  );
}
