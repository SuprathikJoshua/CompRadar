import { Mail, Webhook, Clock } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function AlertTable({ alerts = [], title = 'Alert history', subtitle = 'Recent outbound notifications' }) {
  return (
    <div className="rounded-[24px] bg-navy-900 border border-navy-800 p-6 shadow-dark-card overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold font-sans text-slate-100">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs font-sans text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <span className="px-2.5 py-1 rounded-full bg-navy-950 border border-navy-800 text-slate-400 font-mono text-xs">
          {alerts.length} logged
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-navy-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <th className="pb-3 px-3">Alert Name</th>
              <th className="pb-3 px-3">Channel</th>
              <th className="pb-3 px-3">Target Recipient</th>
              <th className="pb-3 px-3">Timestamp</th>
              <th className="pb-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800/60 font-sans text-xs">
            {alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-navy-850/60 transition-colors">
                
                {/* Alert Name */}
                <td className="py-3.5 px-3 font-semibold text-slate-200">
                  {alert.name}
                </td>

                {/* Channel Icon & Label */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 font-mono text-slate-300">
                    {alert.channel === 'Email' ? (
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    ) : (
                      <Webhook className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    )}
                    <span>{alert.channel}</span>
                  </div>
                </td>

                {/* Recipient */}
                <td className="py-3.5 px-3 font-mono text-slate-400 max-w-[200px] truncate">
                  {alert.recipient}
                </td>

                {/* Timestamp */}
                <td className="py-3.5 px-3 font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{alert.time}</span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-3 text-right">
                  <StatusBadge value={alert.status} />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
