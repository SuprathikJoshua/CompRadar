import { useState } from 'react';
import { RefreshCw, Zap, Target, Activity, ShieldCheck, Wrench } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import ChangeFeed from '../components/feed/ChangeFeed';
import SelfHealEvent from '../components/selfheal/SelfHealEvent';
import AlertTable from '../components/alerts/AlertTable';
import StatusBadge from '../components/common/StatusBadge';
import { mockRivals, mockChanges, mockSelfHealEvents, mockAlertHistory } from '../data/mockData';

export default function OverviewPage({ onTriggerToast }) {
  const [isScanning, setIsScanning] = useState(false);

  const handleRunScan = () => {
    setIsScanning(true);
    if (onTriggerToast) {
      onTriggerToast('Live surface scan initiated for 3 competitors...', 'Scan In Progress');
    }
    setTimeout(() => {
      setIsScanning(false);
      if (onTriggerToast) {
        onTriggerToast('Scan complete. 0 new changes found across 9 surfaces.', 'Scan Completed');
      }
    }, 2500);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-navy-900 via-navy-900/90 to-navy-950 border border-navy-800 p-8 sm:p-10 shadow-2xl">
        {/* Ambient Cyan Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-4 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            LIVE MONITORING
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-slate-50 leading-[1.15]">
            Know what changed before your team asks.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl">
            A calm, high-signal view of every meaningful move across Oxylabs, Apify, and Firecrawl.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed text-navy-950 font-sans font-bold text-sm shadow-cyan-glow flex items-center gap-2.5 transition-all"
            >
              <RefreshCw className={`w-4 h-4 text-navy-950 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Run scan'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-4 py-3 rounded-2xl bg-navy-950/70 border border-navy-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Trust engine: 100% uptime · zero data gaps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip (3-Column Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Target}
          label="RIVALS TRACKED"
          value="03"
          subtext="Oxylabs, Apify, Firecrawl"
          trend="Active 100%"
          accentColor="cyan"
        />

        <StatCard 
          icon={Activity}
          label="CHANGES THIS WEEK"
          value="17"
          subtext="+4 major price shifts detected"
          trend="+22% vs last week"
          accentColor="amber"
        />

        <StatCard 
          icon={Zap}
          label="SELF-HEAL EVENTS"
          value="08"
          subtext="Automated DOM selector recoveries"
          trend="00 Data Gaps"
          accentColor="cyan"
        />
      </div>

      {/* Separate Change Feed Block */}
      <ChangeFeed 
        changes={mockChanges}
        rivals={mockRivals}
      />

      {/* Self-Heal Panel (Dedicated Visible Panel) */}
      <section className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-cyan-subtle">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-sans text-slate-100">
                  Self-heal log
                </h2>
                <StatusBadge value="Recovered" />
              </div>
              <p className="text-xs font-sans text-slate-400 mt-0.5">
                Trust layer / live auto-recovery execution audit.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-cyan-400 bg-navy-950 px-3 py-1.5 rounded-xl border border-navy-800 self-start sm:self-auto">
            Avg Confidence: 99.2%
          </span>
        </div>

        {/* List of Self-Heal Events */}
        <div className="space-y-4">
          {mockSelfHealEvents.slice(0, 3).map(event => (
            <SelfHealEvent key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Alert History Section */}
      <section>
        <AlertTable alerts={mockAlertHistory} />
      </section>

    </div>
  );
}
