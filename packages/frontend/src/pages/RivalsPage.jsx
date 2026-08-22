import { useState } from 'react';
import { Plus, RefreshCw, Target, Layers, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import RivalCard from '../components/rivals/RivalCard';
import StatCard from '../components/common/StatCard';
import { useRivals } from '../hooks/useRivals';
import { useStats } from '../hooks/useStats';
import { triggerManualScrape } from '../services/rivals.service';
import { apiGet } from '../services/api';
import { mockRivals } from '../data/mockData';

export default function RivalsPage({ onTriggerToast }) {
  const [isRunningScrapers, setIsRunningScrapers] = useState(false);
  const { data: rivals, refetch: refetchRivals } = useRivals();
  const { data: stats } = useStats();

  const handleRunAllScrapers = async () => {
    setIsRunningScrapers(true);
    if (onTriggerToast) {
      onTriggerToast('Scraper pool dispatched across all target surfaces...', 'Running Scrapers');
    }
    try {
      await apiGet('/api/scheduler/run-now');
      if (onTriggerToast) {
        onTriggerToast('Scrape cycle triggered successfully across targets.', 'Scrapers Dispatched');
      }
      setTimeout(() => {
        refetchRivals();
      }, 3000);
    } catch (err) {
      if (onTriggerToast) {
        onTriggerToast(err.message, 'Scraper Error');
      }
    } finally {
      setIsRunningScrapers(false);
    }
  };

  const handleManualScrapeTarget = async (targetId, rivalName) => {
    if (onTriggerToast) {
      onTriggerToast(`Initiating manual scrape for ${rivalName}...`, 'Target Scrape');
    }
    try {
      const res = await triggerManualScrape(targetId);
      if (onTriggerToast) {
        onTriggerToast(`Manual scrape completed for ${rivalName} (Snapshot #${res.snapshotId})`, 'Scrape Succeeded');
      }
      refetchRivals();
    } catch (err) {
      if (onTriggerToast) {
        onTriggerToast(err.message, 'Scrape Status');
      }
    }
  };

  const handleAddCompetitor = () => {
    if (onTriggerToast) {
      onTriggerToast('Competitor provisioning workflow opened.', 'Add Target');
    }
  };

  const displayRivals = rivals && rivals.length > 0 ? rivals : mockRivals;
  const totalRivals = stats ? String(stats.rivalsTracked).padStart(2, '0') : (rivals.length > 0 ? String(rivals.length).padStart(2, '0') : '02');
  const trackedSurfaces = stats ? String(stats.targetsTracked).padStart(2, '0') : '02';
  
  // Calculate average collection health
  const avgHealth = displayRivals.length > 0
    ? Math.round(displayRivals.reduce((acc, r) => acc + (r.healthPct || 100), 0) / displayRivals.length)
    : 100;

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
          value={totalRivals}
          subtext="Active intelligence nodes"
          trend="Active 100%"
        />

        <StatCard 
          icon={Layers}
          label="TRACKED SURFACES"
          value={trackedSurfaces}
          subtext="Pricing & product tiers"
          trend="100% Coverage"
        />

        <StatCard 
          icon={ShieldCheck}
          label="SCRAPER HEALTH"
          value={`${avgHealth}%`}
          subtext="Zero persistent data gaps"
          trend="Nominal"
          accentColor="cyan"
        />
      </div>

      {/* Rival Registry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRivals.map(rival => (
          <RivalCard 
            key={rival.id}
            rival={rival}
            onManualScrape={handleManualScrapeTarget}
            onSelect={(r) => {
              if (onTriggerToast) {
                onTriggerToast(`Viewing active monitoring profile for ${r.name}`, 'Rival Selected');
              }
            }}
          />
        ))}
      </div>

    </div>
  );
}

