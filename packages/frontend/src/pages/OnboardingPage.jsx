import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, ArrowRight, ArrowLeft, Rocket } from 'lucide-react';
import { cn } from '../utils/cn';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: 'Acme Intelligence',
    companyDomain: 'acmeintel.io',
    competitorsText: 'oxylabs.io\napify.com\nfirecrawl.dev',
    trackPricing: true,
    trackChangelog: true,
    trackPositioning: true,
  });

  const steps = [
    { num: '01', title: 'Company profile', desc: 'Define your primary market domain' },
    { num: '02', title: 'Competitors', desc: 'Add target competitor domains' },
    { num: '03', title: 'Monitoring scope', desc: 'Select surface change triggers' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Onboarding Topbar */}
      <header className="h-16 border-b border-navy-800 px-6 sm:px-12 flex items-center justify-between bg-navy-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-mono font-bold tracking-wider text-base text-slate-50 uppercase">
            COMPRADAR
          </span>
        </div>

        <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
          SETUP PROTOCOL / 03 STEPS
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-12 flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* Left Introduction & Steps List */}
        <div className="lg:w-5/12 space-y-8">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              CONFIGURE YOUR INTELLIGENCE LAYER
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Start with a sharper view of the market.
            </h1>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed font-sans">
              Provisioning a dedicated CompRadar monitoring node takes less than 2 minutes.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="space-y-4 font-mono">
            {steps.map((step, idx) => {
              const stepNum = idx + 1;
              const isCurrent = currentStep === stepNum;
              const isDone = currentStep > stepNum;

              return (
                <div 
                  key={step.num}
                  className={cn(
                    "p-4 rounded-2xl border transition-all flex items-center gap-4",
                    isCurrent 
                      ? "bg-navy-900 border-cyan-500/50 shadow-cyan-subtle" 
                      : isDone 
                        ? "bg-navy-950 border-emerald-500/30 text-emerald-400" 
                        : "bg-navy-950/60 border-navy-800 opacity-60"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border",
                    isCurrent 
                      ? "bg-cyan-500 text-navy-950 border-cyan-400" 
                      : isDone 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" 
                        : "bg-navy-850 text-slate-500 border-navy-700"
                  )}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200 uppercase">
                      {step.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Form Wizard Card */}
        <div className="lg:w-7/12 w-full max-w-lg">
          <div className="rounded-[28px] bg-navy-900 border border-navy-800 p-8 shadow-2xl shadow-black/80 space-y-6">
            
            {/* Step 1: Company Profile */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold font-sans text-slate-100">
                  Step 01 — Company Profile
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your company details to set baseline market comparison logic.
                </p>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-sans text-slate-100 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Primary Domain
                    </label>
                    <input
                      type="text"
                      value={formData.companyDomain}
                      onChange={(e) => setFormData({ ...formData, companyDomain: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Competitors */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold font-sans text-slate-100">
                  Step 02 — Target Competitors
                </h3>
                <p className="text-xs text-slate-400">
                  Enter competitor domain names (one per line) to immediately start monitoring.
                </p>

                <div className="pt-2">
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Target Domains
                  </label>
                  <textarea
                    rows={5}
                    value={formData.competitorsText}
                    onChange={(e) => setFormData({ ...formData, competitorsText: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500/50 leading-relaxed"
                  />
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    3 targets pre-loaded: Oxylabs, Apify, Firecrawl
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Monitoring Scope */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold font-sans text-slate-100">
                  Step 03 — Monitoring Scope
                </h3>
                <p className="text-xs text-slate-400">
                  Select which competitive surfaces CompRadar scrapers should extract.
                </p>

                <div className="space-y-3 pt-2 font-sans text-xs">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-950 border border-navy-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.trackPricing}
                      onChange={(e) => setFormData({ ...formData, trackPricing: e.target.checked })}
                      className="rounded border-navy-700 text-cyan-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-semibold text-slate-200">Pricing & Tier Shifts</div>
                      <div className="text-[11px] text-slate-400">Track price drops, commitments, and new SKUs</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-950 border border-navy-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.trackChangelog}
                      onChange={(e) => setFormData({ ...formData, trackChangelog: e.target.checked })}
                      className="rounded border-navy-700 text-cyan-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-semibold text-slate-200">Changelogs & API Releases</div>
                      <div className="text-[11px] text-slate-400">Extract new features, SDK versions, and deprecations</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-950 border border-navy-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.trackPositioning}
                      onChange={(e) => setFormData({ ...formData, trackPositioning: e.target.checked })}
                      className="rounded border-navy-700 text-cyan-500 focus:ring-0"
                    />
                    <div>
                      <div className="font-semibold text-slate-200">Positioning & Homepage Copy</div>
                      <div className="text-[11px] text-slate-400">Detect messaging rebrands and hero title edits</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-navy-800">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-850 border border-navy-800 text-xs font-mono text-slate-300 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold text-xs shadow-cyan-glow flex items-center gap-2 transition-all"
              >
                {currentStep === 3 ? (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>Launch workspace</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
