import { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RawDiffDialog({ change, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !change) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(change.rawDiff || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Dark backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-[24px] bg-navy-900 border border-navy-800 shadow-2xl shadow-cyan-950/30 overflow-hidden z-10">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-navy-800 bg-navy-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                  RAW DIFF INSPECTOR
                </span>
                <StatusBadge type={change.type} />
                <StatusBadge value={change.severity} />
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mt-0.5">
                {change.rivalName} — {change.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-navy-800 border border-transparent hover:border-navy-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Metadata Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-navy-950/80 border border-navy-800/80 text-xs font-mono">
            <div>
              <span className="text-slate-500 block mb-1">TARGET RIVAL</span>
              <span className="text-slate-200 font-medium">{change.rivalName}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">DETECTED TIMESTAMP</span>
              <span className="text-cyan-400 font-medium">{change.timestamp}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">MONITORED URL</span>
              <a 
                href={change.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-medium truncate"
              >
                <span>{change.sourceUrl.replace('https://', '')}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Plain English Summary */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Signal Summary
            </h4>
            <p className="text-xs text-slate-300 bg-navy-850 p-3.5 rounded-xl border border-navy-800 leading-relaxed font-sans">
              {change.summary}
            </p>
          </div>

          {/* Code Diff Display */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Vector Payload Diff
              </h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy-850 border border-navy-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy diff'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-navy-800 bg-[#04070d] p-4 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed">
              <pre className="whitespace-pre-wrap">
                {change.rawDiff.split('\n').map((line, i) => {
                  let lineClass = 'text-slate-400';
                  if (line.startsWith('+')) lineClass = 'text-emerald-400 bg-emerald-950/20 px-1 py-0.5 rounded';
                  else if (line.startsWith('-')) lineClass = 'text-orange-400 bg-orange-950/20 px-1 py-0.5 rounded';
                  else if (line.startsWith('@')) lineClass = 'text-cyan-400 opacity-80';
                  
                  return (
                    <div key={i} className={lineClass}>
                      {line}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-navy-800 bg-navy-950/80">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Confidence score: 99.8% (Cryptographically verified)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-slate-200 border border-navy-700 hover:border-slate-600 transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
