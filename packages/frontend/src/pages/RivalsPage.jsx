import { useState } from 'react';
import { Plus, RefreshCw, Target, Layers, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import RivalCard from '../components/rivals/RivalCard';
import StatCard from '../components/common/StatCard';
import { mockRivals } from '../data/mockData';

export default function RivalsPage({ onTriggerToast }) {
  const [isRunningScrapers, setIsRunningScrapers] = useState(false);

  const handleRunAllScrapers = () => {
    setIsRunningScrapers(true);
    if (onTriggerToast) {
      onTriggerToast('Scraper pool dispatched across 9 target surfaces...', 'Running All Scrapers');
    }
    setTimeout(() => {
      setIsRunningScrapers(false);
      if (onTriggerToast) {
        onTriggerToast('All scrapers completed execution cleanly.', 'Scrapers Done');
      }
    }, 3000);
  };

  const handleAddCompetitor = () => {
    if (onTriggerToast) {
      onTriggerToast('Competitor provisioning workflow opened.', 'Add Target');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="TARGET REGISTRY / ACTIVE"
        heading="Monitored competitors"
        subtitle="Active targets tracked across pricing, changelogs, and positioning copy."
        actions={
          <>
            <button
              onClick={handleAddCompetitor}
              className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 border border-navy-800 hover:border-slate-700 text-xs font-mono font-semibold text-slate-200 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Add competitor</span>
            </button>

            <button
              onClick={handleRunAllScrapers}
              disabled={isRunningScrapers}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-navy-950 font-sans font-bold text-xs shadow-cyan-glow flex items-center gap-2 transition-all disabled:opacity-70"
            >
              <RefreshCw className={`w-4 h-4 ${isRunningScrapers ? 'animate-spin' : ''}`} />
              <span>{isRunningScrapers ? 'Scraping...' : 'Run all scrapers'}</span>
            </button>
          </>
        }
      />

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard 
          icon={Target}
          label="TOTAL RIVALS"
          value="03"
          subtext="Active intelligence targets"
          trend="Active"
        />

        <StatCard 
          icon={Layers}
          label="TRACKED SURFACES"
          value="09"
          subtext="Pricing, changelog & copy"
          trend="100% Coverage"
        />

        <StatCard 
          icon={ShieldCheck}
          label="SCRAPER HEALTH"
          value="100%"
          subtext="Zero blocked requests"
          trend="Nominal"
          accentColor="cyan"
        />
      </div>

      {/* Rival Registry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockRivals.map(rival => (
          <RivalCard 
            key={rival.id}
            rival={rival}
            onSelect={(r) => {
              if (onTriggerToast) {
                onTriggerToast(`Opened details for ${r.name}`, 'Rival Selected');
              }
            }}
          />
        ))}
      </div>

    </div>
  );
}
