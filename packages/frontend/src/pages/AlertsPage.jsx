import { useState } from 'react';
import { Send, Bell, Mail, Webhook, Sliders, Filter } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import AlertTable from '../components/alerts/AlertTable';
import EmptyState from '../components/common/EmptyState';
import { mockAlertHistory } from '../data/mockData';

export default function AlertsPage({ onTriggerToast }) {
  const [selectedChannel, setSelectedChannel] = useState('All channels');
  const [selectedSeverity, setSelectedSeverity] = useState('All severity');

  // Editable routing state
  const [emailRecipients, setEmailRecipients] = useState('team@acmeintel.io, jordan@acmeintel.io');
  const [webhookUrl, setWebhookUrl] = useState('https://api.acme.io/webhooks/intel');
  const [minSeverity, setMinSeverity] = useState('Minor');
  const [isSaving, setIsSaving] = useState(false);

  const handleSendTestAlert = () => {
    if (onTriggerToast) {
      onTriggerToast('Test alert payload dispatched to Email & Slack webhooks.', 'Test Alert Delivered');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (onTriggerToast) {
        onTriggerToast('Outbound alert routing rules updated successfully.', 'Routing Rules Saved');
      }
    }, 1000);
  };

  // Filter alerts
  const filteredAlerts = mockAlertHistory.filter(a => {
    const matchChannel = selectedChannel === 'All channels' || a.channel === selectedChannel;
    const matchSeverity = selectedSeverity === 'All severity' || a.severity === selectedSeverity;
    return matchChannel && matchSeverity;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <PageHeader
        eyebrow="DELIVERY HUB / OUTBOUND"
        heading="Alert history"
        subtitle="Route meaningful competitive movement to the people and systems that act on it."
        actions={
          <button
            onClick={handleSendTestAlert}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-navy-950 font-sans font-bold text-xs shadow-cyan-glow flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4 text-navy-950" />
            <span>Send test alert</span>
          </button>
        }
      />

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard 
          icon={Bell}
          label="DELIVERED THIS WEEK"
          value="16"
          subtext="Outbound alert notifications"
          trend="100% Delivery Rate"
          accentColor="cyan"
        />

        <StatCard 
          icon={Mail}
          label="EMAIL SUMMARIES"
          value="09"
          subtext="Daily & instant digests"
          trend="Subscribed"
        />

        <StatCard 
          icon={Webhook}
          label="IN-APP / WEBHOOK"
          value="07"
          subtext="Slack & API payload triggers"
          trend="Active"
        />
      </div>

      {/* Delivery Log Table with Filter Controls */}
      <div className="space-y-4">
        
        {/* Table Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-[20px] bg-navy-900 border border-navy-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase">Filter Log:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Channel selector */}
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All channels">All channels</option>
              <option value="Email">Email</option>
              <option value="Dashboard">Dashboard</option>
            </select>

            {/* Severity selector */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="All severity">All severity</option>
              <option value="Major">Major</option>
              <option value="Minor">Minor</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        {filteredAlerts.length > 0 ? (
          <AlertTable alerts={filteredAlerts} />
        ) : (
          <EmptyState 
            title="No alerts match current log filters"
            description="Adjust your channel or severity filters above."
            onReset={() => {
              setSelectedChannel('All channels');
              setSelectedSeverity('All severity');
            }}
          />
        )}
      </div>

      {/* Notification Settings Section */}
      <section className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans text-slate-100">
              Notification Routing Settings
            </h2>
            <p className="text-xs font-sans text-slate-400 mt-0.5">
              Configure notification targets and minimum severity triggers.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-5 max-w-2xl font-sans">
          
          {/* Email Recipients Input */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Email Recipients (Comma Separated)
            </label>
            <input
              type="text"
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>

          {/* Webhook Endpoint Input */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Dashboard Webhook Endpoint
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>

          {/* Minimum Severity Selector */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
              Minimum Alert Severity Trigger
            </label>
            <select
              value={minSeverity}
              onChange={(e) => setMinSeverity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono"
            >
              <option value="Minor">Minor (All pricing shifts, copy, and release notes)</option>
              <option value="Major">Major Only (Pricing shifts &gt;10% &amp; rebrands)</option>
            </select>
          </div>

          {/* Save Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs transition-colors shadow-cyan-glow flex items-center gap-2"
            >
              {isSaving ? 'Saving rules...' : 'Save routing rules'}
            </button>
          </div>

        </form>
      </section>

    </div>
  );
}
