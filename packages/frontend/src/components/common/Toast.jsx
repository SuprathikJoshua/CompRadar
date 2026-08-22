import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Toast({ message, title = 'Notification', type = 'info', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md">
      <div className={cn(
        "flex items-start gap-3 p-4 rounded-[20px] bg-navy-900/95 border backdrop-blur-md shadow-2xl shadow-black/80",
        type === 'error' ? "border-orange-500/50 text-orange-200" : "border-cyan-500/50 text-slate-100"
      )}>
        <div className={cn(
          "p-2 rounded-xl border mt-0.5 shrink-0",
          type === 'error' ? "bg-orange-500/10 text-orange-400 border-orange-500/30" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
        )}>
          {type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-mono font-semibold tracking-wide uppercase text-cyan-400">
              {title}
            </span>
          </div>
          <p className="text-xs font-sans text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-navy-800 transition-colors shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
