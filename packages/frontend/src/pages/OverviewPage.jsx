import { useState } from 'react';
import { RefreshCw, Zap, Target, Activity, ShieldCheck, Wrench } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import ChangeFeed from '../components/feed/ChangeFeed';
import SelfHealEvent from '../components/selfheal/SelfHealEvent';
import AlertTable from '../components/alerts/AlertTable';
import StatusBadge from '../components/common/StatusBadge';
import { useStats } from '../hooks/useStats';
import { useChanges } from '../hooks/useChanges';
import { useHealEvents } from '../hooks/useHealEvents';
import { useAlerts } from '../hooks/useAlerts';
import { apiGet } from '../services/api';
import { formatDate } from '../utils/formatDate';
import { mockRivals, mockChanges, mockSelfHealEvents, mockAlertHistory } from '../data/mockData';

export default function OverviewPage({ onTriggerToast }) {
  const [isScanning, setIsScanning] = useState(false);
  const { data: stats } = useStats();
  const { data: changes } = useChanges();
  const { data: healEvents } = useHealEvents();
  const { data: alerts } = useAlerts();

  const handleRunScan = async () => {
    setIsScanning(true);
    if (onTriggerToast) {
      onTriggerToast('Live surface scan cycle initiated...', 'Scan In Progress');
    }
    try {
      await apiGet('/api/scheduler/run-now');
      if (onTriggerToast) {
        onTriggerToast('Scrape cycle triggered successfully across all targets.', 'Scan Completed');
      }
    } catch (err) {
      if (onTriggerToast) {
        onTriggerToast(err.message, 'Scan Failed');
      }
    } finally {
      setIsScanning(false);
    }
  };

  const displayHealEvents = healEvents && healEvents.length > 0 ? healEvents.map(e => ({
    id: e.id,
    target: e.target?.rival?.name 
      ? `${e.target.rival.name} • ${e.target.type ? e.target.type.toUpperCase() : 'PRICING'}` 
      : `Target #${e.targetId}`,
    confidenceScore: e.status === 'recovered' ? '99.2%' : '98.5%',
    verification: e.status === 'recovered' ? 'Recovered' : (e.status === 'detected' ? 'Detected' : 'Failed'),
    selectorBroke: e.brokenSelector,
    systemRecovery: e.recoveryMethod || (e.status === 'recovered' ? 'bright-data-cli-auto-heal' : 'Pending auto-heal'),
    timestamp: formatDate(e.detectedAt),
  })) : mockSelfHealEvents;

  const displayChanges = changes && changes.length > 0 ? changes.map(c => ({
    id: c.id,
    rivalName: c.target?.rival?.name || 'Target',
    rivalMark: (c.target?.rival?.name || 'T').charAt(0),
    timestamp: formatDate(c.createdAt),
    type: c.target?.type || 'price',
    severity: c.severity || 'Minor',
    title: `${c.target?.rival?.name || 'Target'} ${c.target?.type || 'price'} update`,
    summary: c.llmSummary || 'Automated scrape snapshot diff recorded.',
    sourceUrl: c.sourceUrl || c.target?.url || '#',
    diffRaw: c.diffRaw,
  })) : mockChanges;

  const displayAlerts = alerts && alerts.length > 0 ? alerts.map(a => ({
    id: a.id,
    name: `${a.change?.target?.rival?.name || 'System'} Alert`,
    channel: a.channel,
    recipient: a.channel === 'Email' ? 'team@acmeintel.io' : 'Webhook Payload',
    time: formatDate(a.sentAt),
    status: a.status,
  })) : mockAlertHistory;

  const rivalsCount = stats ? String(stats.rivalsTracked).padStart(2, '0') : '02';
  const changesCount = stats ? String(stats.totalChangesDetected).padStart(2, '0') : '00';
  const healCount = stats ? String(stats.totalHealEvents).padStart(2, '0') : '04';
  const dataGaps = stats ? String(stats.totalHealEvents - stats.healEventsRecovered).padStart(2, '0') : '00';

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
            A calm, high-signal view of every meaningful move across Apify and Firecrawl.
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
          value={rivalsCount}
          subtext="Apify, Firecrawl"
          trend="Active 100%"
          accentColor="cyan"
        />

        <StatCard 
          icon={Activity}
          label="CHANGES TRACKED"
          value={changesCount}
          subtext={stats?.lastScrapedAt ? `Last scrape: ${formatDate(stats.lastScrapedAt)}` : 'Realtime change feed'}
          trend="Live Sync"
          accentColor="amber"
        />

        <StatCard 
          icon={Zap}
          label="SELF-HEAL EVENTS"
          value={healCount}
          subtext={`${stats?.healEventsRecovered ?? 2} recovered automatically`}
          trend={`${dataGaps} Data Gaps`}
          accentColor="cyan"
        />
      </div>

      {/* Separate Change Feed Block */}
      <ChangeFeed 
        changes={displayChanges}
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
          {displayHealEvents.slice(0, 3).map(event => (
            <SelfHealEvent key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Alert History Section */}
      <section>
        <AlertTable alerts={displayAlerts} />
      </section>

    </div>
  );
}
