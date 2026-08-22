import { useState } from 'react';
import { Key, ShieldCheck, RefreshCw, Save } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';

export default function SettingsPage({ onTriggerToast }) {
  const [apiKey] = useState('rsk_live_99f82a17bc04e9a823');
  const [scanFrequency, setScanFrequency] = useState('15m');
  const [autoHealEnabled, setAutoHealEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (onTriggerToast) {
        onTriggerToast('Platform configuration settings updated successfully.', 'Settings Saved');
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <PageHeader
        eyebrow="SYSTEM / CONFIGURATION"
        heading="Platform Settings"
        subtitle="Manage scraper scheduling frequency, API authorization keys, and DOM self-healing policies."
      />

      <form onSubmit={handleSave} className="max-w-3xl space-y-8">
        
        {/* Scraper Scheduling */}
        <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-sans text-slate-100">
                Scraper Scan Frequency
              </h2>
              <p className="text-xs font-sans text-slate-400">
                Set automated extraction interval across all 9 target surfaces.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
              Cron Interval Schedule
            </label>
            <select
              value={scanFrequency}
              onChange={(e) => setScanFrequency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
            >
              <option value="5m">Every 5 minutes (High-frequency real-time)</option>
              <option value="15m">Every 15 minutes (Recommended balanced)</option>
              <option value="1h">Every 1 hour (Standard batch scan)</option>
              <option value="24h">Daily summary scan</option>
            </select>
          </div>
        </div>

        {/* API Access Keys */}
        <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-sans text-slate-100">
                REST API & SDK Key
              </h2>
              <p className="text-xs font-sans text-slate-400">
                Authenticate programmatically to query verified change diff payloads.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
              Active Production Key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                readOnly
                className="flex-1 px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                  if (onTriggerToast) onTriggerToast('API Key copied to clipboard', 'Copied');
                }}
                className="px-4 py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 text-xs font-mono text-cyan-400 transition-colors"
              >
                Copy Key
              </button>
            </div>
          </div>
        </div>

        {/* DOM Self-Healing Engine */}
        <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-sans text-slate-100">
                  DOM Self-Healing Engine
                </h2>
                <p className="text-xs font-sans text-slate-400">
                  Automated vector tree recovery for broken target selectors.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoHealEnabled} 
                onChange={(e) => setAutoHealEnabled(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-navy-950 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-cyan-glow flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving settings...' : 'Save configuration'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
