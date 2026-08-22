import { Building2, Shield, Users, Plug, CheckCircle2, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { mockWorkspaceConfig } from '../data/mockData';

export default function WorkspacePage({ onTriggerToast }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="COMMAND CENTER / WORKSPACE"
        heading="Strategy & Context"
        subtitle="Manage company intelligence directives, countermeasures, team permissions, and third-party integrations."
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Company Profile Card */}
          <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-sans text-slate-100">
                  {mockWorkspaceConfig.name} Profile
                </h2>
                <span className="text-xs font-mono text-cyan-400">
                  ENTERPRISE INTELLIGENCE NODE
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Strategic Focus & Directive
                </label>
                <p className="text-xs font-sans text-slate-200 bg-navy-950 p-4 rounded-2xl border border-navy-800 leading-relaxed">
                  {mockWorkspaceConfig.strategy}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800">
                  <span className="text-slate-400 block mb-1">PRIMARY DOMAIN</span>
                  <span className="text-cyan-400 font-bold">acmeintel.io</span>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800">
                  <span className="text-slate-400 block mb-1">REGION</span>
                  <span className="text-slate-200 font-bold">US-East (N. Virginia)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Counter-measures Section */}
          <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-sans text-slate-100">
                  Automated Counter-measures
                </h2>
                <p className="text-xs font-sans text-slate-400 mt-0.5">
                  Active policy rules executed upon detecting competitor movements.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {mockWorkspaceConfig.countermeasures.map((rule, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-navy-950 border border-navy-800/80 text-xs font-sans text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Access Section */}
          <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 sm:p-8 shadow-dark-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-sans text-slate-100">
                    Team Access Controls
                  </h2>
                  <p className="text-xs font-sans text-slate-400 mt-0.5">
                    3 active operators provisioned on this node.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-navy-800">
              {mockWorkspaceConfig.teamMembers.map((member, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 font-sans">
                        {member.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {member.email}
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-navy-950 border border-navy-800 text-[11px] font-mono text-slate-300">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Integrations Section) */}
        <div className="space-y-8">
          
          <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-6 shadow-dark-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Plug className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-sans text-slate-100">
                  Integrations
                </h3>
                <p className="text-xs font-sans text-slate-400">
                  Connected data pipelines
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {mockWorkspaceConfig.integrations.map((integ, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-navy-950 border border-navy-800/80 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-semibold font-sans text-slate-200">
                      {integ.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {integ.channel}
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${integ.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                    {integ.status}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onTriggerToast && onTriggerToast('Integration manager modal opened', 'Integrations')}
              className="mt-6 w-full py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 text-xs font-mono text-cyan-400 flex items-center justify-center gap-2 transition-colors"
            >
              <span>Manage all webhooks</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
